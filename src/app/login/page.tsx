"use client"

import { Box, Button, Container, Grid, Stack, TextField, Typography } from "@mui/material";
import assets from '@/assets';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { FieldValues} from "react-hook-form";
import { UserLogin } from "@/services/actions/UserLogin";
import { toast } from "sonner";
import { storeUserInfo } from "@/services/AuthService/auth.services";
import PHForms from "@/components/Forms/PHForms";
import PHInput from "@/components/Forms/PHInput";
import {z} from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

export const ValidationSchema=z.object({
  //https://react-hook-form.com/get-started#SchemaValidation
  //npm install @hookform/resolvers zod
  email:z.string({required_error:"Email is Required"}).email({message:"Inter Valide Email Address"}),
  password:z.string({required_error:"Password is Required"}).min(6,{message:"must be at list 6 charcter"})
});

const LoginPage = () => {

  

    const router=useRouter();
    const [error,setError]=useState();
   
   
    const handelLogin =async(values:FieldValues)=>{
      //console.log(values);

        try{
            const res=await UserLogin(values);
          
            if(res?.success)
            {
                toast.success(res?.message);
                storeUserInfo({accessToken:res?.data?.accessToken});
                   router.push("/dashboard");
                   
                   
             }
             else{
              
                setError(res.message);
             }

        }
        catch(error:any)
        {
            console.log(error?.message);
        }
      


    }
    return (
        <>
          <Container>
      <Stack
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 800,
            width: "100%",
            boxShadow: 1,
            borderRadius: 1,
            p: 4,
            textAlign: "center",
          }}
        >
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <Image src={assets.svgs.logo} width={50} height={50} alt="logo" />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                Login PH HealthCare
              </Typography>
            </Box>
          </Stack>

         {
          error && <Box>
          <Typography sx={{backgroundColor:"red",padding:"1px",borderRadius:"2px", color:"white",marginTop:"5px"}}>User Not Exist {error}</Typography>
         </Box>
         }
          <Box>
            <PHForms onSubmit={handelLogin} resolver={zodResolver(ValidationSchema)} defaultValues={{email:"",password:""}}>
              <Grid container spacing={2} my={1}>
                <Grid item md={6}>
                  <PHInput
                    label="Email"
                    type="email"
                    name="email"
                    fullWidth={true}
                   
                   
                  />
                </Grid>
                <Grid item md={6}>
                  <PHInput
                    label="Password"
                    type="password"
                    name="password"
                    fullWidth={true}
                  
                   
                  />
                </Grid>
              </Grid>

              <Typography mb={1} textAlign="end" component="p" fontWeight={300}>
                Forgot Password?
              </Typography>

              <Button
                sx={{
                  margin: "10px 0px",
                }}
                fullWidth={true}
                type="submit"
              >
                Login
              </Button>
              <Typography component="p" fontWeight={300}>
                Don&apos;t have an account?{" "}
                <Link href="/register">Create an account</Link>
              </Typography>
            </PHForms >
          </Box>
        </Box>
      </Stack>
    </Container>
        </>
    );
};

export default LoginPage;