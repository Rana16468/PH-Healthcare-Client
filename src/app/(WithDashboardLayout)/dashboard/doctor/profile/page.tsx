"use client"

import { useGetMYProfileQuery, useUpdateMYProfileMutation } from "@/redux/api/myProfile";
import { Box, Button, Container } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import Image from "next/image";
import DoctorInformation from "./components/DoctorInformation";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AutoFileUploader from "@/components/Forms/AutoFileUploader";
import ProfileUpdateModal from "./components/ProfileUpdateModal";
import { useState } from "react";
import ModeEditIcon from '@mui/icons-material/ModeEdit';

const DoctorProfile= () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const {data, isLoading}=useGetMYProfileQuery({},{refetchOnMountOrArgChange:true});
    const [ updateMYProfile,{isLoading:updating}]=useUpdateMYProfileMutation ()
    // console.log(data);
    // console.log(isLoading);

    const fileUploadHandler=(file: File)=>{
        const formData = new FormData();
        formData.append('file', file);
        formData.append('data', JSON.stringify({}));
        updateMYProfile(formData);

    }

    return (
      <>
       <ProfileUpdateModal
            open={isModalOpen}
            setOpen={setIsModalOpen}
            id={data?.id}
         />
     <Container  sx={{ mt: 4 }}>
            {isLoading && <p>loading ....</p>}
            <Box sx={{ flexGrow: 1 }}>
                 <Grid container spacing={4}>
                      <Grid xs={12} md={4}>
                          <Box
                            sx={{
                            height: 300,
                                width: '100%',
                              overflow: 'hidden',
                             borderRadius: 1,
                              }}
                         >
                     <Image
                        height={300}
                        width={400}
                        src={data?.profilePhoto}
                        alt='User Photo'
                     />
                  </Box>

                  <Box my={3}>
                  {updating ? (
                        <p>Uploading...</p>
                     ) : (
                        <AutoFileUploader
                           name='file'
                           label='Choose Your Profile Photo'
                           icon={<CloudUploadIcon />}
                           onFileUpload={fileUploadHandler}
                           variant='text'
                        />
                     )}
                  </Box>

                  <Button
                     fullWidth
                     endIcon={<ModeEditIcon />}
                     onClick={() => setIsModalOpen(true)}
                  >
                     Edit Profile
                  </Button>


        </Grid>
        <Grid xs={8}>
        <DoctorInformation data={data} />
        </Grid>
        
      </Grid>
    </Box>
        </Container>
      </>
    );
};

export default DoctorProfile;