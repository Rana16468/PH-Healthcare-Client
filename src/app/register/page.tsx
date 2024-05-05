"use client"

import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import logo from '@/assets'
import Link from 'next/link';
import { SubmitHandler, useForm } from "react-hook-form";
import { modifyPayload } from '@/utils/modifyPayload/modifyPayload';
import { RegisterPatiens } from '@/services/actions/RegisterPatiens';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { UserLogin } from '@/services/actions/UserLogin';
import { storeUserInfo } from '@/services/AuthService/auth.services';


type IPatientRegisterData={
    password:string,
    patient:patientData
}
  interface  patientData {

         name:string
         email: string
        contractNumber:string
        address:string
        gender:string
  }
const RegisterPage = () => {
  const router=useRouter();
   
    const { register, handleSubmit, watch, formState: { errors } } = useForm<IPatientRegisterData>();
    const onSubmit: SubmitHandler<IPatientRegisterData> =async(values)=>{

        const data=modifyPayload(values);
       try{
        const res=await RegisterPatiens(data);
        if(res?.data?.id)
            {
                toast.success(res?.message);
                const userInfo=await UserLogin({email:values.patient.email,password:values.password});
          
                if(userInfo?.success)
                {
                    toast.success(userInfo?.message);
                    storeUserInfo({accessToken:userInfo?.data?.accessToken});
                    router.push("/dashboard");     
                 }
                
            }

       }
       catch(error:any)
       {
        console.log(error?.message);
       }


    }
    return (
        <Container >
            <Stack sx={{justifyContent:"center",alignItems:"center", height:"100vh"}}>
                <Box sx={{maxHeight:600,width:"100%", boxShadow:1,borderRadius:1,p:4,textAlign:"center"}}>

                    <Stack sx={{justifyContent:"center",alignItems:"center"}}>

                         <Box>
                            <Image src={logo.svgs.logo} width={50} height={50} alt='logo'/>
                         </Box>
                         <Box>
                            <Typography variant='h6' fontWeight={600}>Patient Register</Typography>
                         </Box>

                    </Stack>

                    <Box>
                         <form onSubmit={handleSubmit(onSubmit)}>
                         <Grid container spacing={2} my={1}>
                            <Grid item md={12}>
                            <TextField id="outlined-basic"  size='small' fullWidth={true} {...register("patient.name")} label="Name" variant="outlined" />
                            </Grid>

                            <Grid item md={6}>
                            <TextField id="outlined-basic" size='small' type='email' fullWidth={true} {...register("patient.email")} label="Email" variant="outlined" />
                            </Grid>

                            <Grid item md={6}>
                            <TextField id="outlined-basic" size='small' type='password' fullWidth={true} {...register("password")}  label="Password" variant="outlined" />
                            </Grid>

                            <Grid item md={6}>
                            <TextField id="outlined-basic" size='small' type='tel' fullWidth={true} label="Contruct Number" {...register("patient.contractNumber")} variant="outlined" />
                            </Grid>

                            

                            <Grid item md={6}>
                            <TextField id="outlined-basic" size='small' type='text' fullWidth={true} label="Address" {...register("patient.address")} variant="outlined" />
                            </Grid>

                            <Grid item md={12}> 
                                 <FormControl fullWidth={true}>
                                  <InputLabel size='small' id="demo-simple-select-label">Gender</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                         id="demo-simple-select"
                                         size='small'
                                         {...register("patient.gender")} 
                                         label="Gender">
                                            <MenuItem value="MALE">Male</MenuItem>
                                             <MenuItem value="FEMALE">Female</MenuItem>
                                              
                                                 </Select>
                                          </FormControl>
                            </Grid>


                         </Grid>
                         <Button type='submit' sx={{margin:"10px 0px" }} fullWidth={true}>Register</Button>
                         <Typography component='p' fontWeight={600}>Do You Already Have An Account? <Link href="/login">Login</Link></Typography>
                         </form>
                    </Box>

                </Box>

            </Stack>
        </Container>
    );
};

export default RegisterPage;