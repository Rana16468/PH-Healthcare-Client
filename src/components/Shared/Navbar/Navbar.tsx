"use client";



import { Box, Container, Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import Link from "next/link";



//https://mui.com/material-ui/react-stack/
const Navbar = () => {
//https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading
    const AuthButton= dynamic(() => import('@/components/UI/AuthButton/AuthButton'), { ssr: false })
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

         
         </Stack>
            <AuthButton/>
           
           </Stack>

           
        </Container>
    );
};

export default Navbar;