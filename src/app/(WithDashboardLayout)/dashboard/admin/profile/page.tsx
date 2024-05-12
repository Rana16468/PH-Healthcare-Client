"use client"

import PHFileUploder from "@/components/Forms/PHFileUploder";
import PHForms from "@/components/Forms/PHForms";
import PHInput from "@/components/Forms/PHInput";
import { useGetSingleUserQuery, useUpdateProfileMutation } from "@/redux/api/userApi";
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';

import { modifyPayload } from "@/utils/modifyPayload/modifyPayload";
import { Avatar, Box, Button,  CardHeader, Container, Grid, Typography } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";


const Profile = () => {

    const [updateProfile]=useUpdateProfileMutation();

    const handleFormSubmit= async(values:FieldValues)=>{

           const data=modifyPayload('data',values);

       
        
       try{
        const res=await updateProfile(data).unwrap();
       
        if(res?.id)
        {
            toast.success("Update Profile Successfuly")
        }

       }
       catch(error:any)
       {
        console.log(error?.message);
       }

    }

    const {data, isLoading}=useGetSingleUserQuery({},{refetchOnMountOrArgChange:true});
    const defaultValues = {
        // email: data?.email || "",
        // role: data?.role || "",
        // status: data?.status || " ",
        name: data?.name || "",
         profilePhoto: data?.profilePhoto || "",
        // contractNumber: data?. contractNumber || "",
      };
    return (
        <Container>
             {
                isLoading? ("....Loading"):<PHForms onSubmit={handleFormSubmit} defaultValues={defaultValues}>
                <Grid container spacing={2} sx={{ my: 5 }}>
    
                  <Grid  item xs={12} sm={12} md={4}>
                   <CardHeader
                    avatar={<Avatar alt={data?.name} src={data?.profilePhoto || ""} />}
                    title={data?.name}
                    subheader={data?.email}
            
                     />
                  <PHFileUploder  name="file" label="Uplode File"/>
              </Grid> 
                 
                 
                   <Grid item xs={12} sm={12} md={4}>
                    <PHInput
                      name="name"
                      label="Name"
                      fullWidth={true}
                      sx={{ mb: 2 }}
                    />
                  </Grid> 
                  
      
                </Grid>
                <Button type="submit"> <SystemUpdateAltIcon sx={{mr:2}} fontSize="medium"/>   Update</Button>
              </PHForms>
             }


     <Grid container spacing={2} sx={{ mt:2}}>
          <Grid item xs={6}>
            <Typography variant="body2">Role:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2">{data?.role || " "}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2">Status:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2">{data?.status || " "}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2">Contract Number:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2">{data?.contractNumber || " "}</Typography>
          </Grid>
          {/* Hide deleted flag information */}
        </Grid>
        </Container>
    );
};

export default Profile;