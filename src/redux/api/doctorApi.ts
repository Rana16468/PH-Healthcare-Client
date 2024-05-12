//https://redux-toolkit.js.org/rtk-query/usage/code-splitting
import { IMeta } from '@/types/common';
import { tagTypes } from '../tag-types'
import { baseApi } from './baseApi'
import { IDoctor } from '@/types/doctor';


const doctorApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createDoctor: build.mutation({
      query: (data) => {
       return {
         url:"/user/create-doctor/",
         method:"POST",
         contentType:"multipart/form-data",
         data:data
       }
      },
      invalidatesTags:[tagTypes.doctor]
    }),
    // get All Doctors
    getAllDoctors: build.query({
        query: (arg: Record<string, any>) => {
           
            return {
                url: "/doctor",
          method: "GET",
          params: arg,
            }
        },
        transformResponse: (response: IDoctor[], meta: IMeta) => {
          return {
            doctors: response,
            meta:meta,
          };
        },
        providesTags: [tagTypes.doctor],
      }),
      // delete Doctors
      deleteDoctor: build.mutation({
        query: (id) => ({
          url: `/doctor/soft/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: [tagTypes.doctor],
      }),

      // single Doctor

      getDoctor:build.query({
        query:(id:string | undefined)=>({
          url:`/doctor/${id}`,
          method:"GET"
        }),
        providesTags:[tagTypes.doctor]
      }),
      // update a doctor
    updateDoctor: build.mutation({
      query: (data) => {
       
        return {
          url: `/doctor/${data.id}`,
          method: "PATCH",
          data: data.data,
        }
      },
      invalidatesTags: [tagTypes.doctor],
    }),

    
  

  }),

})

export const {useCreateDoctorMutation,useGetAllDoctorsQuery,
  useDeleteDoctorMutation,useGetDoctorQuery,useUpdateDoctorMutation} = doctorApi;