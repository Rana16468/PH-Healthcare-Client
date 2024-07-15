"use client";



import useUserInfo from "@/hooks/useUserInfo";
import { getUserInfo } from "@/services/AuthService/auth.services";
import logoutUser from "@/services/actions/logoutUser";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";




//https://mui.com/material-ui/react-stack/
const Navbar = () => {
//https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading
    //const AuthButton= dynamic(() => import('@/components/UI/AuthButton/AuthButton'), { ssr: false })
   
    const userInfo=  useUserInfo();
    // console.log("isLoggedIn",isLoggedIn());
     
    const router=useRouter();
    const handelLogOut = () => {
      
        logoutUser(router);
     };

    return (
        <Container>
           <Stack py={2} direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h4" component={Link} href="/" fontWeight={600}>P <Box component="span" color="primary.main">H</Box> Health Care</Typography>
            <Stack direction="row" gap={4} justifyContent="space-between">
         
         <Typography component={Link} href="/consultation">Consultation</Typography>
         <Typography>Health Plant</Typography>
         <Typography>Medicine</Typography>
         <Typography>Diagnostrict</Typography>
         <Typography>NGOs</Typography>

         {
            userInfo?.email &&   <Typography component={Link} href="/dashboard">Dashboard</Typography>
         }
       

         
         </Stack>
            {/* <AuthButton/> */}

            {
            userInfo?.email ? <Button  onClick={handelLogOut}  color="error">LogOut</Button>:<Button component={Link} href="/login">Login</Button>
           }
           
           </Stack>

           
        </Container>
    );
};

export default Navbar;