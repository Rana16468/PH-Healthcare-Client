"use client"

import { Box, Button, IconButton, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';
import DoctorModal from './components/DoctorModal';
import { useDeleteDoctorMutation, useGetAllDoctorsQuery } from '@/redux/api/doctorApi';
import { DataGrid, GridColDef, GridDeleteIcon } from '@mui/x-data-grid';
import DeleteIcon from "@mui/icons-material/Delete";
import { useDebounced } from '@/redux/hooks';
import { toast } from 'sonner';
const DoctorsPage = () => {

    const [isModalOpen,setIsModalOpen]=useState<boolean>(false);
   
  const query:Record<string,any>={};
  const [searchTerm,setSearchTerm]=useState("");

  const debounced=useDebounced({
    searchQuery:searchTerm,
    delay:600
  });
    if(!!debounced)
    {
        query['searchTerm']=searchTerm;
       ;
    }

  

   const {data,isLoading}=useGetAllDoctorsQuery({...query},{refetchOnMountOrArgChange:true});
   const [deleteDoctor]=useDeleteDoctorMutation();
   const doctors=data?.doctors;
   const meta=data?.meta;
 

  const handleDelete=async(id:string)=>{
        
    try{
        const res=await deleteDoctor(id).unwrap();
        console.log(res);
          if(res?.id)
            {
                toast.success("Successfully Deleted");
            }

    }
    catch(error:any)
    {
        console.log(error?.message);
    }
  }
 
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "contractNumber", headerName: "Contact Number", flex: 1 },
    { field: "gender", headerName: "Gender", flex: 1 },
    { field: "appointmentFee", headerName: "Appointment Fee", flex: 1 },
    {
        field: "action",
        headerName: "Action",
        flex: 1,
        headerAlign: "center",
        align: "center",
        renderCell: ({ row }) => {
          return (
            <IconButton onClick={() => handleDelete(row.id)} aria-label="delete">
              <DeleteIcon />
            </IconButton>
          );
        },
      },
  
    
  ];
    return (
        <Box>
               <Stack direction="row" justifyContent="space-between" alignItems="center">
               
               <Button onClick={()=>setIsModalOpen(true)}>Create New Doctor</Button>
               <TextField onChange={(e)=>setSearchTerm(e.target.value)} size="small" placeholder="search doctors"/>
               <DoctorModal open={isModalOpen} setOpen={setIsModalOpen}/>
                </Stack>

                {
                isLoading && <Box>Loaging</Box>
            }

           {
            !isLoading && <Box my={2}>
            <DataGrid rows={doctors} columns={columns} hideFooter={true} />
        </Box>
           }
     
    </Box>
    );
};

export default DoctorsPage ;