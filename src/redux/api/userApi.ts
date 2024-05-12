import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSingleUser: build.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    // update profile information 
    updateProfile: build.mutation({
      query: (data) => {
       return {
         url:"/user/update-my-profile",
         method:"PATCH",
         contentType:"multipart/form-data",
         data:data
       }
      },
      invalidatesTags:[tagTypes.user]
    })
  }),
});

export const { useGetSingleUserQuery ,useUpdateProfileMutation} = userApi;