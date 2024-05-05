import { Box, Container, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import facebookIcon from "@/assets/landing_page/facebook.png"
const Footer = () => {
    return (
        <Box bgcolor="rgb(17 26 34)" py={5}>
           <Container>
           <Stack direction="row" gap={4} justifyContent="center">
         
         <Typography color="#fff" component={Link} href="/consultation">Consultation</Typography>
         <Typography  color="#fff" >Health Plant</Typography>
         <Typography  color="#fff" >Medicine</Typography>
         <Typography  color="#fff" >Diagnostrict</Typography>
         <Typography  color="#fff" >NGOs</Typography>

         
         </Stack>

         <Stack direction="row" gap={2} justifyContent="center" py={3}>
         <Image src={facebookIcon} alt='facebook' width={30} height={30}/>
         <Image src={facebookIcon} alt='facebook' width={30} height={30}/>
         <Image src={facebookIcon} alt='facebook' width={30} height={30}/>
         <Image src={facebookIcon} alt='facebook' width={30} height={30}/>

         
         </Stack>
         {/* <div className='border-b-[1px] border-dashed'>

         </div> */}

         <Box sx={{border:"1px dashed lightgray"}}>

         </Box>

         <Stack direction="row" gap={2} justifyContent="space-between" alignItems="center" py={3}>
         <Typography component="p" color="#fff" >@Copy;2024 PH-Health Care. All Right Reserved</Typography>

         <Typography variant="h4" component={Link} href="/" fontWeight={600} color="white">P <Box component="span" color="primary.main">H</Box> Health Care</Typography>
         <Typography component="p" color="#fff" >Privicy Policy @ Trams And Condition</Typography>
         
         </Stack>
           </Container>
        </Box>
    );
};

export default Footer;