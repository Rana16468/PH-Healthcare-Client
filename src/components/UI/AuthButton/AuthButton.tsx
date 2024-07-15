
import { getUserInfo } from "@/services/AuthService/auth.services";
import logoutUser from "@/services/actions/logoutUser";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";



const AuthButton = () => {

    const userInfo=  getUserInfo();
    // console.log("isLoggedIn",isLoggedIn());
    // console.log(userInfo);
    const router=useRouter();
    const handelLogOut=()=>{
       

        logoutUser(router);
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