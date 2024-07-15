import PHModal from "@/components/Shared/PHModal/PHModal";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Stack } from "@mui/material";
import { useGetAllSchedulesQuery } from "@/redux/api/scheduleApi";
import MultipleSelectFieldChip from "./MultipleSelectFieldChip";
import LoadingButton from '@mui/lab/LoadingButton';
import { useCreateDoctorScheduleMutation } from "@/redux/api/doctorScheduleApi";
import { toast } from "sonner";


type TProps ={
    open:boolean,
    setOpen:React.Dispatch<React.SetStateAction<boolean>>
}
const DoctorScheduleModal = ({open,setOpen}:TProps) => {

    const [selectedDate, setSelectedDate] = useState(
        dayjs(new Date()).toISOString()
     );

     const [selectedScheduleIds, setSelectedScheduleIds] = useState<string[]>([]);

     const [  createDoctorSchedule,{isLoading}]=useCreateDoctorScheduleMutation();

     

     const onSubmit= async()=>{

     
        
        try{
          

         const res= await   createDoctorSchedule({scheduleIds:selectedScheduleIds}).unwrap();
         console.log(res);
         if(res?.count)
         {
            toast.success("Successfully Sleledted Schedule");
            setOpen(false);
         }


        }
        catch(error:any)
        {
            console.log(error?.message)
        }


     }

     const query:Record<string,any>={};
     if(!!selectedDate)
        {
            query["startDate"]=dayjs(selectedDate).hour(0).minute(0).millisecond(0).toISOString();
            query["endDate"]=dayjs(selectedDate).hour(23).minute(59).millisecond(999).toISOString();
        }

        const {data}= useGetAllSchedulesQuery(query,{refetchOnMountOrArgChange:true});
        const schedules=data?.schedules;
       
    return (
        <PHModal open={open} setOpen={setOpen} title="Doctor Schedule">
             
             <Stack direction={'column'} gap={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
               <DatePicker
                  label='Controlled picker'
                  value={dayjs(selectedDate)}
                  onChange={(newValue) =>
                     setSelectedDate(dayjs(newValue).toISOString())
                  }
                  sx={{ width: '100%' }}
               />
            </LocalizationProvider>
            <MultipleSelectFieldChip schedules={schedules} setSelectedScheduleIds={setSelectedScheduleIds}  selectedScheduleIds={selectedScheduleIds}/>
            {/* https://mui.com/material-ui/react-button/#loading-button */}

            <LoadingButton
               size='small'
               onClick={onSubmit}
               loading={isLoading}
               loadingIndicator='Submitting...'
               variant='contained'
            >
               <span>Submit</span>
            </LoadingButton>
           
         </Stack>
         
        </PHModal>
    );
};

export default DoctorScheduleModal;