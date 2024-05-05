import { Box, Button, Container, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import assets from "@/assets";
const HeroSection = () => {
    return (
        <Container sx={{
            display:"flex",
            direction:"row",
            my:16
        }}>
           <Box sx={{flex:1,position:"relative"}}>
               <Box sx={{
                position:"absolute",
                width:"700px",
                top:"-90px",
                left:"-120px"
               }}>
                  <Image src={assets.svgs.grid} alt='grid'/>
               </Box>
               <Typography variant='h3' component="h1" fontWeight={600}> Healthire Hearts</Typography>
               <Typography variant='h3'  component="h1" fontWeight={600}> Come Form</Typography>
               <Typography variant='h3' color="primary.main"  fontWeight={600}  component="h1"> Prevent Care</Typography>

               <Typography variant='h6' component="p" fontWeight={400} sx={{my:4}}> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste quo cum nobis voluptatem corrupti. Reprehenderit at consequuntur quos aperiam explicabo voluptates impedit dicta modi autem iusto odit, praesentium facilis. Velit.</Typography>
              <Box sx={{display:"flex",gap:4}}>
                  <Button >  Make Appointments</Button>
               <Button  variant='outlined' sx={{marginLeft:"5px"}}>  Contruct Us</Button>
              </Box>
               
           </Box>
           <Box sx={{
            p:1,
            flex:1,
            position:"relative",
            display:"flex",
            justifyContent:"center",
            mt:0
           }}>
           <Box sx={{position:"absolute",left:"200px", top:"-30px"}}>
              <Image src={assets.svgs.arrow} alt='arrow' width={100} height={100}/>
           </Box>

           <Box sx={{
              display:"flex",
              gap:2
           }}>

            <Box sx={{mt:4}}>
                <Image src={assets.images.doctor1} alt='doctor1' width={240} height={380}/>
            </Box>
            <Box>
                <Image src={assets.images.doctor2} alt='doctor2' width={240} height={350}/>
            </Box>

           </Box>

           <Box sx={{position:"absolute", top:"240px", left:"150px"}}>
                <Image src={assets.images.doctor3} width={250} height={250} alt='doctor3'/>
           </Box>

           <Box sx={{position:"absolute", bottom:"-50px", right:0,zIndex:-1}}>
                <Image src={assets.images.stethoscope} alt='doctor1' width={180} height={180}/>
            </Box>

           </Box>
        </Container>
    );
};

export default HeroSection;