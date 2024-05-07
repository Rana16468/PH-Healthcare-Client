"use client"
import { Box, Button, IconButton, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';
import SpecialtiesModal from './components/SpecialtiesModal';
import { useDeleteSpecialtiesMutation, useGetAllSpecialtiesQuery } from '@/redux/api/specialtiesApi';
import { DataGrid, GridColDef} from "@mui/x-data-grid";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from 'sonner';

const SpecialtiesPage = () => {
    //https://mui.com/material-ui/react-dialog/
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const {data,isLoading}=useGetAllSpecialtiesQuery(null,{refetchOnMountOrArgChange:true});

    const [  deleteSpecialties]=useDeleteSpecialtiesMutation();
       

        const handleDelete = async (id: string) => 
        {

            const res=await  deleteSpecialties(id).unwrap();
            if(res?.id)
            {
                toast.success("Successfully Deleted Specilities");
            }
            else{
                toast.error("Server Respone Issues");
            }

        }
    const columns: GridColDef[] = [
        { field: "title", headerName: "Title", width: 400 },
        {
          field: "icon",
          headerName: "Icon",
          flex: 1,
          renderCell: ({ row }) => {
            return (
              <Box>
                <Image src={row.icon} width={30} height={30} alt="icon" />
              </Box>
            );
          },
        },
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
        <Box >
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Button onClick={()=>setIsModalOpen(true)}>Create Spciality</Button>

                <SpecialtiesModal open={isModalOpen} setOpen={setIsModalOpen}/>
               
                <TextField placeholder=' Search Specialist' size='small'/>
            </Stack>
            {/*Display All Specilish Data */}

            {
                isLoading && <Box>Loaging</Box>
            }

            <Box my={2}>
                <DataGrid rows={data} columns={columns} hideFooter={true} />
            </Box>
        </Box>
    );
};

export default SpecialtiesPage;