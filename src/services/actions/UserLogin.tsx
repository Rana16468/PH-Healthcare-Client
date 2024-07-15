
import setAccessToken from "./setAccessToken";


export const UserLogin = async(payload:any) => {

    const res=await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(payload),
        // refresh token setting process
        //cache:"no-cache",
        credentials:"include"
       
    });
    const loginInfo=await res.json();
    
         if(loginInfo?.data?.accessToken)
        {
           setAccessToken(loginInfo?.data?.accessToken,{redirect:"/dashboard"})
        }
    return loginInfo
   
};

