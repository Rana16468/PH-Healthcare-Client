'use client';
import { useGetAllSpecialtiesQuery } from "@/redux/api/specialtiesApi";
import { Box, Tab, Tabs } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";


const ScrollCategory = ({ specialties }: { specialties: string }) => {
  
    const {data,isLoading}=useGetAllSpecialtiesQuery({},{refetchOnMountOrArgChange:true});
   // console.log(data)
    const [value, setValue] = React.useState(specialties || "");
    const router = useRouter();

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
         router.push(`/doctors?specialties=${newValue}`);
     };
    return (
        <>
            <Box sx={{ maxWidth: '100%', bgcolor: 'background.paper', mx: 'auto' }}>
         <Tabs
             value={value}
             onChange={handleChange}
            variant='scrollable'
            scrollButtons='auto'
            aria-label='scrollable auto tabs example'
         >
            {isLoading?<p>Loading...</p>:data?.map((specialty: any) => (
               <Tab
                  key={specialty.id}
                  label={specialty.title}
                  value={specialty.title}
                  sx={{ fontWeight: 600 }}
               />
            ))}
         </Tabs>
      </Box>
        </>
    );
};

export default ScrollCategory;