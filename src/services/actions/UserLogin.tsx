

export const UserLogin = async(payload:any) => {

    const res=await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(payload),
        cache:"no-store"
    });
    const loginInfo=await res.json();
    return loginInfo
   
};
