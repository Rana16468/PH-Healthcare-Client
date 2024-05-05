import { axiosBaseQuery } from '@/helpers/axios/axiosBaseQuery '
import { createApi } from '@reduxjs/toolkit/query/react'

//https://redux-toolkit.js.org/rtk-query/overview

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({ baseUrl: 'http://localhost:3014/api/v1' }),
  endpoints: () => ({
   
    
  }),
})

