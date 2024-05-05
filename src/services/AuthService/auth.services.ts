import { authKey } from "@/contant/authkey"
import { getFromLocalStorage, removeFromLocalStorage, setLocalStorage } from "@/utils/LocalStores/LocalStore"
import { decodedToken } from "@/utils/jwt"

export const storeUserInfo=({accessToken}:{accessToken:string})=>{

   return setLocalStorage(authKey,accessToken)
}

export const getUserInfo=()=>{

  const authToken=getFromLocalStorage(authKey);
   if(authToken)
    {
        const decodedData:any=decodedToken(authToken);
        return {
            ...decodedData,
            role:decodedData?.role?.toLowerCase()
        }

    }
   
}

export const  isLoggedIn=()=>{

    const authToken=getFromLocalStorage(authKey);
    if(authToken)
        {
            return !!authToken
        }
      return false
}

export const removeUser=()=>{

    return removeFromLocalStorage(authKey)
}