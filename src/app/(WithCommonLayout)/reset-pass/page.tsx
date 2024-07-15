'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { FieldValues } from 'react-hook-form';
import { z } from 'zod';
import KeyIcon from '@mui/icons-material/Key';
import PHInput from '@/components/Forms/PHInput';

import { useSearchParams } from 'next/navigation';

import { useEffect } from 'react';

import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import PHForms from '@/components/Forms/PHForms';
import { useResetPasswordMutation } from '@/redux/api/authApi';
import { authKey } from '@/contant/authkey';
import { deleteCookis } from '@/services/actions/deleteCookis';

const validationSchema = z.object({
   newPassword: z.string().min(6, 'Must be at least 6 characters long'),
});
const ResetPassword = () => {
   const searchParams = useSearchParams();
   const id = searchParams.get('id');
   const token = searchParams.get('token');
   const router = useRouter();

   const [resetPassword] = useResetPasswordMutation();
   
   useEffect(() => {
    if (!token) return;
    localStorage.setItem(authKey, token);
 }, [token]);


 
   const onSubmit = async (values: FieldValues) => {
    

      const updatedData={
       password:values.newPassword,id
      }
      try{
         const res=await resetPassword(updatedData).unwrap();
    
         if(res){
            toast.success('Successfully Password Updated');
            localStorage.removeItem(authKey);
            deleteCookis([authKey, 'refreshToken']);
            router.push('/login');
         }
         else{
            toast.error("Some issues are there");
         }
      }
      catch(error:any){
        toast.error(error?.message);
      }
      

    
   }
   return (
      <Box
         sx={{
            px: 4,
            py: 2,
            maxWidth: 600,
            width: '100%',
            boxShadow: 1,
            borderRadius: 1,
            mx: 'auto',
            mt: { xs: 2, md: 10 },
         }}
      >
         <Stack alignItems='center' justifyContent='center'>
            <Box
               sx={{
                  '& svg': {
                     width: 100,
                     height: 100,
                  },
               }}
            >
               <KeyIcon sx={{ color: 'primary.main' }} />
            </Box>
            <Typography variant='h5' fontWeight={600} sx={{ mb: 2 }}>
               Reset password
            </Typography>
         </Stack>
         <PHForms
            onSubmit={onSubmit}
            defaultValues={{ newPassword: '' }}
            resolver={zodResolver(validationSchema)}
         >
            <Grid>
               <Grid item xs={12} sm={12} md={6}>
                  <PHInput
                     name='newPassword'
                     type='password'
                     label='New Password'
                     sx={{ mb: 2 }}
                     fullWidth
                  />
               </Grid>
            </Grid>

            <Button type='submit' sx={{ width: '100%', my: 2 }}>
               Reset Password
            </Button>
         </PHForms>
      </Box>
   );
};

export default ResetPassword;