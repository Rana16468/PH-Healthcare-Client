"use server"
import { cookies } from "next/headers"


export const deleteCookis=(keys:string[])=>{

    console.log(keys);

    keys.forEach((key)=>{
        console.log(key);
        cookies().delete(key);
    });
}