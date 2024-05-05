import { getUserInfo, isLoggedIn, removeUser } from "@/services/AuthService/auth.services";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";



const AuthButton = () => {

    const userInfo=  getUserInfo();
    console.log("isLoggedIn",isLoggedIn());
    console.log(userInfo);
    const router=useRouter();
    
    
    const handelLogOut=()=>{
  
      removeUser();
      router.refresh();
      
    }
    return (
        <>
             {
            userInfo?.email ? <Button  onClick={handelLogOut}  color="error">LogOut</Button>:<Button component={Link} href="/login">Login</Button>
        }
        </>
    );
};

export default AuthButton;