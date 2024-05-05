import { Box,  List,  Stack,  Typography } from "@mui/material";
import Image from "next/image";
import assert from '@/assets';
import Link from "next/link";
import { drawerItem } from "@/utils/DrawerItems";
import { UserRole } from "@/types/common";
import SideBarItem from "./SideBarItem";
import { getUserInfo } from "@/services/AuthService/auth.services";
import { useEffect, useState } from "react";
const SideBar = () => {


    const [userrole,setUserRole]=useState("");
    useEffect(()=>{
        const {role}=getUserInfo();
        setUserRole(role)

    },[])
 
   
    return (
       <Box>
        <Stack sx={{py:1,mt:1}} direction="row" justifyContent="center" alignItems="center" gap={1} component={Link} href="/">
            <Image src={assert.svgs.logo} alt="logo" width={40} height={40}/>
            <Typography variant="h6" component="h1" sx={{cursor:"pointer"}}>PH HealthCare</Typography>
        </Stack>
        <List>
            {drawerItem(userrole as UserRole).map((item, index) => (
             <SideBarItem key={index}  item={item}/>
            ))}
          </List>
       </Box>
    );
};

export default SideBar;