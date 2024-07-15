import { authKey } from "@/contant/authkey";
import { deleteCookis } from "./deleteCookis";
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

const logoutUser=(router:AppRouterInstance)=>{
  
  console.log([authKey,'refreshToken'])
   
    localStorage.removeItem(authKey);
    deleteCookis([authKey,'refreshToken']);
   
    router.push("/");
     router.refresh();
     
   }
   export default logoutUser;