"use client"

import PHForms from "@/components/Forms/PHForms";
import PHInput from "@/components/Forms/PHInput";
import PHSelectField from "@/components/Forms/PHSelectField";
import { useGetDoctorQuery, useUpdateDoctorMutation } from "@/redux/api/doctorApi";
import { Gender } from "@/types/common";
import { modifyPayload } from "@/utils/modifyPayload/modifyPayload";

import { Box, Button, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TParams = {
    params: {
      doctorId: string;
    };
  };
  
const DoctorUpdatePage  = ({params}:TParams) => {

    const {data, isLoading}=useGetDoctorQuery(params.doctorId,{refetchOnMountOrArgChange:true});
   const [ updateDoctor]=useUpdateDoctorMutation();
   const router=useRouter();
    
    const defaultValues = {
   
        email: data?.email || "",
        name: data?.name || "",
        contractNumber: data?.contractNumber || "",
        address: data?.address || "",
        registrationNumber:data?.registrationNumber || "" ,
        gender: data?. gender || "",
        experience: data?. experience || 0,
        appointmentFee: data?.appointmentFee ||  0,
        qualification: data?. qualification || "",
        currentWorkingPlease: data?.currentWorkingPlease || "",
        designation: data?.designation || "",
        averageRating:data?.averageRating || 0
      
    
    };

    

   

    const handleFormSubmit= async(values:FieldValues)=>{
        values.experience=Number(values.experience);
        values.appointmentFee=Number(values.appointmentFee);
        values.averageRating=Number(values.averageRating);
       
        const data=modifyPayload('data',values);

        

        try{

            const res=await updateDoctor({id:params.doctorId,data}).unwrap();
              if(res?.id)
                {
                    toast.success("Update Successfully");
                    router.push("/dashboard/admin/doctors")
                   
                }

        }
        catch(error:any)
        {
            console.log(error?.message);
        }

    
       
    }
    return (
        <Box>
            <Typography component="h5" variant="h5">
        Update Doctor Info
      </Typography>

           {
            isLoading? ("Loading"): <PHForms onSubmit={handleFormSubmit} defaultValues={defaultValues}>
            <Grid container spacing={2} sx={{ my: 5 }}>
              <Grid item xs={12} sm={12} md={4}>
                <PHInput
                  name="name"
                  label="Name"
                  fullWidth={true}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <PHInput
                  name="email"
                  type="email"
                  label="Email"
                  fullWidth={true}
                  sx={{ mb: 2 }}
                />
              </Grid>
    
    
              <Grid item xs={12} sm={12} md={4}>
                <PHInput
                  name="contractNumber"
                  label="contractNumber"
                  fullWidth={true}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <PHInput
                  name="address"
                  label="Address"
                  fullWidth={true}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <PHInput
                  name="registrationNumber"
                  label="Registration Number"
                  fullWidth={true}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <PHInput
                  name="experience"
                  type="number"
                  label="Experience"
                  fullWidth={true}
                  sx={{ mb: 2 }}
                />
              </Grid>
               <Grid item xs={12} sm={12} md={4}>
                <PHSelectField
                  items={Gender}
                  name="gender"
                  label="Gender"
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <PHInput
                  name="appointmentFee"
                  type="number"
                  label="ApointmentFee"
                  fullWidth={true}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <PHInput
                  name="qualification"
                  label="Qualification"
                  fullWidth={true}
                  sx={{ mb: 2 }}
                />
              </Grid>
    
              <Grid item xs={12} sm={12} md={4}>
                <PHInput
                  name="currentWorkingPlease"
                  label="Current Working Place"
                  fullWidth={true}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <PHInput
                  name="designation"
                  label="Designation"
                  fullWidth={true}
                  sx={{ mb: 2 }}
                />
              </Grid>
            </Grid>
  
            <Grid item xs={12} sm={12} md={4}>
                <PHInput
                  name="averageRating"
                  type="number"
                  label="AverageRating"
                  fullWidth={true}
                  sx={{ mb: 2 }}
                />
              </Grid>
    
            <Button type="submit">Create</Button>
          </PHForms>
           }
        </Box>
    );
};

export default DoctorUpdatePage ;