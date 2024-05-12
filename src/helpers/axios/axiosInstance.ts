import { authKey } from "@/contant/authkey";
import { getNewAccessToken } from "@/services/AuthService/auth.services";
import { IGenericErrorResponse, ResponseSuccessType } from "@/types/common";
import { getFromLocalStorage, setLocalStorage } from "@/utils/LocalStores/LocalStore";
import axios from "axios";


const instance=  axios.create();
instance.defaults.headers.post["Content-Type"]="application/json";
instance.defaults.headers["Accept"]="application/json";
instance.defaults.timeout=60000;
//https://axios-http.com/docs/interceptors

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent

    const accessToken=getFromLocalStorage(authKey);
      if(accessToken)
        {
            config.headers.Authorization=accessToken
        }
         return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
instance.interceptors.response.use(
    //@ts-ignore
    function (response) {
    
    const responeObject:ResponseSuccessType={
        data:response?.data?.data,
        meta:response?.data?.meta


    }
    return responeObject;
  },async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
  
    const config=error?.config;

   if(error?.response?.status===500 && !config?.sent)
    {
      config.sent=true
      const response= await getNewAccessToken();
      const accessToken=response?.data?.accessToken;
      config.headers["Authorization"]=accessToken;
      setLocalStorage(authKey,accessToken);
      return instance(config);
    }
     else{
      const  responeObject:IGenericErrorResponse={
        statusCode:error?.response?.data?.statusCode || 500,
        message:error?.response?.data?.message || "something went wrong !!",
        errorMessages: error?.response?.data?.message
    }
    //return Promise.reject(error);
    return responeObject
     }
  });


export  {instance}