import { axiosBaseQuery } from '@/helpers/axios/axiosBaseQuery '
import { createApi } from '@reduxjs/toolkit/query/react'
import { tagTypesList } from '../tag-types';

//https://redux-toolkit.js.org/rtk-query/overview

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({ baseUrl: 'http://localhost:3014/api/v1' }),
  endpoints: () => ({
   
    
  }),
  tagTypes: tagTypesList
});



