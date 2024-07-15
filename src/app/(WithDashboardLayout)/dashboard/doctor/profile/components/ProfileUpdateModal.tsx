"use client"

import PHForms from "@/components/Forms/PHForms";
import PHInput from "@/components/Forms/PHInput";
import PHSelectField from "@/components/Forms/PHSelectField";
import PHFullScreenModal from "@/components/Shared/PHModal/PHFullScreenModal";
import { useGetDoctorQuery, useUpdateDoctorMutation } from "@/redux/api/doctorApi";
import { Gender } from "@/types/common";
import {  Button, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";

import { useGetAllSpecialtiesQuery } from "@/redux/api/specialtiesApi";
import { useEffect, useState } from "react";
import MultipleSelectChip from "./MultipleSelectChip";
import { toast } from "sonner";
import { modifyPayload } from "@/utils/modifyPayload/modifyPayload";


type TProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    id: string;
 };

const ProfileUpdateModal = ({ open, setOpen, id }: TProps) => {

    const {data:doctorData,isLoading,refetch, isSuccess}=useGetDoctorQuery(id,{refetchOnMountOrArgChange:true});
    const { data: allSpecialties } = useGetAllSpecialtiesQuery({},{refetchOnMountOrArgChange:true});
    const [selectedSpecialtiesIds, setSelectedSpecialtiesIds] = useState([]);
    const [updateDoctor,{isLoading:updating}]=useUpdateDoctorMutation();

   
   
    

    useEffect(() => {
        if (!isSuccess) return;
      

        setSelectedSpecialtiesIds(
           doctorData?.doctorSpecialties?.map((sp: any) => {
              return sp?.specialitiesId;  
           })

       
        );
     }, [isSuccess,doctorData?.doctorSpecialties]);

    // console.log(doctorData);
    // console.log(isLoading);
    const submitHandler=async(values:FieldValues)=>{

        
        const specialties = selectedSpecialtiesIds.map(
            (specialitiesId: string) => ({
                specialitiesId,
                isDeleted: false,
            })
         );
         values.experience=Number(values.experience);
         values.appointmentFee=Number(values.appointmentFee);

        const excludedFields: Array<keyof typeof values> = [
            'email',
            'id',
            'role',
            'needPasswordChange',
            'status',
            'createdAt',
            'updatedAt',
            'isDeleted',
            'averageRating',
            'review',
            'profilePhoto',
            'registrationNumber',
            'schedules',
            'doctorSpecialties',
         ];
         const updatedValues = Object.fromEntries(
            Object.entries(values).filter(([key]) => {
               return !excludedFields.includes(key);
            })
         );
         updatedValues.specialties=specialties;
         const data=modifyPayload("data", updatedValues)
    
         const res=await updateDoctor({data,id}).unwrap();
         console.log(res)
          if(res?.id)
            {
                 toast.success("Update Successfull");
                 refetch();
                 setOpen(false);
                
            }
    }

   
    return (
        <PHFullScreenModal open={open} setOpen={setOpen} title="Update Profile">
          
          <PHForms  onSubmit={submitHandler}
            defaultValues={doctorData} >
              
              <Grid container spacing={2} sx={{ my: 5 }}>
                 <Grid item xs={12} sm={12} md={4}>
                  <PHInput name='name' label='Name' sx={{ mb: 2 }} fullWidth />
               </Grid>
               <Grid item xs={12} sm={12} md={4}>
                  <PHInput
                     name='email'
                     type='email'
                     label='Email'
                     sx={{ mb: 2 }}
                     fullWidth
                  />
              </Grid>

              <Grid item xs={12} sm={12} md={4}>
                  <PHInput
                     name='contractNumber'
                     label='Contract Number'
                     sx={{ mb: 2 }}
                     fullWidth
                  />
               </Grid>

               <Grid item xs={12} sm={12} md={4}>
                  <PHInput
                     name='address'
                     label='Address'
                     sx={{ mb: 2 }}
                     fullWidth
                  />
               </Grid>

               <Grid item xs={12} sm={12} md={4}>
                  <PHInput
                     name='registrationNumber'
                     label='Registration Number'
                     sx={{ mb: 2 }}
                     fullWidth
                  />
               </Grid>

               <Grid item xs={12} sm={12} md={4}>
                  <PHInput
                     name='experience'
                     type='number'
                     label='Experience'
                     sx={{ mb: 2 }}
                     fullWidth
                  />
               </Grid>

               <Grid item xs={12} sm={12} md={4}>
                  <PHSelectField
                     items={Gender}
                     name='gender'
                     label='Gender'
                     sx={{ mb: 2 }}
                     fullWidth
                  />
               </Grid>

               <Grid item xs={12} sm={12} md={4}>
                  <PHInput
                     name='appointmentFee'
                     type='number'
                     label='ApointmentFee'
                     sx={{ mb: 2 }}
                     fullWidth
                  />
               </Grid>
               <Grid item xs={12} sm={12} md={4}>
                  <PHInput
                     name='qualification'
                     label='Qualification'
                     sx={{ mb: 2 }}
                     fullWidth
                  />
               </Grid>

               <Grid item xs={12} sm={12} md={4}>
                  <PHInput
                     name='currentWorkingPlease'
                     label='Current Working Place'
                     sx={{ mb: 2 }}
                     fullWidth
                  />
               </Grid>
               <Grid item xs={12} sm={12} md={4}>
                  <PHInput
                     name='designation'
                     label='Designation'
                     sx={{ mb: 2 }}
                     fullWidth
                  />
               </Grid>
             <  Grid item xs={12} sm={12} md={4}>
                   <MultipleSelectChip
                     allSpecialties={allSpecialties}
                     selectedIds={selectedSpecialtiesIds}
                     setSelectedIds={setSelectedSpecialtiesIds}
                  /> 
               </Grid>
            </Grid>

            <Button type='submit'>
               Save
            </Button>

             
          </PHForms>
        </PHFullScreenModal>
    );
};

export default ProfileUpdateModal;