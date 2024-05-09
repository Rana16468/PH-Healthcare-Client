import PHForms from '@/components/Forms/PHForms';
import PHInput from '@/components/Forms/PHInput';
import PHSelectField from '@/components/Forms/PHSelectField';
import PHFullScreenModal from '@/components/Shared/PHModal/PHFullScreenModal';
import { useCreateDoctorMutation } from '@/redux/api/doctorApi';
import { Gender } from '@/types/common';
import { modifyPayload } from '@/utils/modifyPayload/modifyPayload';
import { Button, Grid } from '@mui/material';
import React from 'react';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';

type TProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  };

  const defaultValues = {
    doctor: {
      email: "",
      name: "",
      contractNumber: "",
      address: "",
      registrationNumber: "",
      gender: "",
      experience: 0,
      appointmentFee: 0,
      qualification: "",
      currentWorkingPlease: "",
      designation: "",
      averageRating:0
    },
    password: "",
  };

const DoctorModal = ({ open, setOpen }: TProps) => {
    const [createDoctor]=useCreateDoctorMutation();
    const handleFormSubmit = async (values: FieldValues)=>{
    values.doctor.experience=Number(values.doctor.experience);
    values.doctor.appointmentFee=Number(values.doctor.appointmentFee);
    values.doctor.averageRating=Number(values.doctor.averageRating);

    
      const data=modifyPayload('doctor',values);
      try{
        const res=await createDoctor(data).unwrap();
        console.log(res);
         if(res?.id)
        {
            toast.success("Successfully Doctor Created");
            setOpen(false);
        }
      }
      catch(error:any){
        toast.error(error?.message);
      }
    }
    return (
        <PHFullScreenModal open={open} setOpen={setOpen} title="Create New Doctor">
        <PHForms onSubmit={handleFormSubmit} defaultValues={defaultValues}>
          <Grid container spacing={2} sx={{ my: 5 }}>
            <Grid item xs={12} sm={12} md={4}>
              <PHInput
                name="doctor.name"
                label="Name"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <PHInput
                name="doctor.email"
                type="email"
                label="Email"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
  
            <Grid item xs={12} sm={12} md={4}>
              <PHInput
                name="password"
                type="password"
                label="Password"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
  
            <Grid item xs={12} sm={12} md={4}>
              <PHInput
                name="doctor.contractNumber"
                label="contractNumber"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <PHInput
                name="doctor.address"
                label="Address"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <PHInput
                name="doctor.registrationNumber"
                label="Registration Number"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <PHInput
                name="doctor.experience"
                type="number"
                label="Experience"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
             <Grid item xs={12} sm={12} md={4}>
              <PHSelectField
                items={Gender}
                name="doctor.gender"
                label="Gender"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <PHInput
                name="doctor.appointmentFee"
                type="number"
                label="ApointmentFee"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <PHInput
                name="doctor.qualification"
                label="Qualification"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
  
            <Grid item xs={12} sm={12} md={4}>
              <PHInput
                name="doctor.currentWorkingPlease"
                label="Current Working Place"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <PHInput
                name="doctor.designation"
                label="Designation"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
              <PHInput
                name="doctor.averageRating"
                type="number"
                label="AverageRating"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
  
          <Button type="submit">Create</Button>
        </PHForms>
      </PHFullScreenModal>
    );
};

export default DoctorModal;