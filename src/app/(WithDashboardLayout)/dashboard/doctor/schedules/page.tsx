"use client"

import { Box, Button, IconButton, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import DoctorScheduleModal from "./components/DoctorScheduleModal";
import { useGetAllDoctorSchedulesQuery } from "@/redux/api/doctorScheduleApi";
import { ISchedule } from "@/types/schedule";
import { DateFormatter } from "@/utils/DateTimeFormatter/DateFormatter";
import dayjs from "dayjs";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const DoctorSchedulePage = () => {
   const query:Record<string,any>={};
   const [page,setPage]=useState(1);
   const [limit,setLimit]=useState(5);
    query['page']=page;
    query['limit']=limit;

    const [isModalOpen,setIsModalOpen]=useState(false);
    const [allSchedule, setAllSchedule] = useState<any>([]);
    const {data, isLoading}= useGetAllDoctorSchedulesQuery({...query},{refetchOnMountOrArgChange:true});
     const schedule = data?.doctorSchedules;
    

     //console.log(schedule);
      const  meta=data?.meta;
      let pageCount:number;
       if(meta?.total)
         {
           pageCount=Math.ceil(meta?.total/limit);
         }


    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
    };
     useEffect(() => {
        const updateData = schedule?.map(
           (scheduleData: ISchedule, index: number) => {

              return {
                 sl: index + 1,
                 id: scheduleData?.schedule?.id,
                 startDate: DateFormatter(scheduleData?.schedule?.startDateTime),
                 startTime: dayjs(scheduleData?.schedule?.startDateTime).format('hh:mm a'),
                 endTime: dayjs(scheduleData?.schedule?.endDateTime).format('hh:mm a'),
              };
           }
        );
        setAllSchedule(updateData);
     }, [schedule]);

    

     const columns: GridColDef[] = [
      { field: "sl", headerName: "SL", flex: 1 },
      { field: "startDate", headerName: "Start Date", flex: 1 },
      { field: "startTime", headerName: "Start Time", flex: 1 },
      { field: "endTime", headerName: "End Time", flex: 1 },
      {
        field: "action",
        headerName: "Action",
        flex: 1,
        headerAlign: "center",
        align: "center",
        renderCell: ({ row }) => {
          return (
            <IconButton aria-label="delete">
              <DeleteIcon sx={{ color: "red" }} />
            </IconButton>
          );
        },
      },
    ];
     
    return (
        <Box>
            <Button onClick={()=>setIsModalOpen(true)}>Create Doctor Schedule</Button>
            <DoctorScheduleModal open={isModalOpen} setOpen={setIsModalOpen}/>
            <Box sx={{mb:5}}></Box>
            <Box>
            {!isLoading ? (
               <Box my={2}>
                  <DataGrid  rows={allSchedule ?? []} columns={columns} hideFooterPagination slots={{
                     footer:()=>{
                        return <Box sx={{mb:2,display:"flex",justifyContent:"center"}}>
                             <Pagination color="primary" count={pageCount} page={page} onChange={handleChange} />
                        </Box>
                     }
                  }} />
               </Box>
            ) : (
               <h1>Loading.....</h1>
            )}
         </Box>
        </Box>
    );
};

export default DoctorSchedulePage;