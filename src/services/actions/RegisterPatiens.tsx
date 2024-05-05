
"use server"


export const RegisterPatiens = async(payload:FormData) => {

    const res=await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/create-patient`,{
        method:"POST",
        body:payload,
        cache:"no-store"
    });
    const patientInfo=await res.json();
   

    return patientInfo


   
};

