import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import LocationOnIcon from "@mui/icons-material/LocationOn";
const TopRatedDoctors = async() => {

    const res=await fetch(" http://localhost:3014/api/v1/doctor?page=1&limit=3",{
        next:{
            revalidate:30
        }
    });

    const {data:doctors}=await res.json();
    
   
   
    return (
        <Box sx={{my:10,py:30,backgroundColor:"rgba(20,20,20,0.1)",clipPath:"polygon(0 0,100% 25%,100% 100%, 0 75%)"}}>
            <Box sx={{textAlign:"center"}}>
            <Typography variant='h4' component="h1" fontWeight={700}>Our Top Rated Doctors</Typography>
            <Typography  component="p" fontSize={18} sx={{mt:2}} fontWeight={400}>Axcess To Expert physicians and Surges Advance Techonology</Typography>
            <Typography  component="p" fontSize={18} fontWeight={400}>And To Quality Surgery Facilties right here</Typography>
            
        </Box>
        <Container sx={{ margin: "30px auto" }}>
        <Grid container spacing={2}>
          {doctors?.map((doctor: any) => (
            <Grid item key={doctor?.id} md={4}>
             <Card sx={{ maxWidth: 345 }}>
   <Box >
    <Image src={doctor?.profilePhoto?doctor?.profilePhoto :"https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg"} alt='doctor' width={500}  height={200}/>
   </Box>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {doctor?.name}
        </Typography>
                 <Typography variant="body2" color="text.secondary">
                    {doctor?.qualification}, {doctor?.designation}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                  <LocationOnIcon /> {doctor.address} 
                  </Typography>

                 
      </CardContent>
      <CardActions sx={{
        justifyContent:"space-between"
      }}>
        <Button size="small">Book Now</Button>
        <Button variant='outlined'>View Profile</Button>
      </CardActions>
    </Card>
            </Grid>
          ))}
        </Grid>
        <Box
          sx={{
            textAlign: "center",
            px:2,
            paddingBottom:"20px"

          }}
        >
          <Button
            variant="outlined"
            sx={{
              marginTop: "20px",
            }}
          >
            View ALL
          </Button>
        </Box>
      </Container>
       
        </Box>
    );
};

export default TopRatedDoctors;