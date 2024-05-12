//https://redux-toolkit.js.org/rtk-query/usage/code-splitting
import { tagTypes } from '../tag-types'
import { baseApi } from './baseApi'


const specialtiesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createSpecialties: build.mutation({
      query: (data) => {
       return {
         url:"/specialties/",
         method:"POST",
         contentType:"multipart/form-data",
         data:data
       }
      },
      invalidatesTags:[tagTypes.specialties]
    }),

    // get all specialties
    getAllSpecialties: build.query({
        query: () => {
         return {
           url:"/specialties/",
           method:"GET",
         }
        },
        providesTags:[tagTypes.specialties]
      }),
      //delete Specililist
      deleteSpecialties: build.mutation({
        query: (id:string) => {
         return {
           url:`/specialties/${id}`,
           method:"DELETE",
          
         }
        },
        invalidatesTags:[tagTypes.specialties]
      }),

  }),

})

export const { useCreateSpecialtiesMutation,useGetAllSpecialtiesQuery ,useDeleteSpecialtiesMutation} = specialtiesApi