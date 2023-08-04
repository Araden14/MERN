import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5001/' }),
  reducerPath: 'adminApi',
  tagTypes: ['User'],
  endpoints: (build) => ({

    getUser: build.query({
      query: (id) => `dashboard/user/${id}`,
      providesTags: ['User']
    }),
    getUsers: build.query({
      query: () => `dashboard/user/all`,
      providesTags: ['User']
    }),
    getUserbyCountry: build.query({
      query: (country) => `dashboard/country/${country}`,
      providesTags: ['User']
    }),
    getUnits: build.query({
      query: () => `units/get`,
      providesTags: ['User']
    }),
    verifyUser: build.mutation({
      query: (token) => ({
        url: 'auth',
        method: 'POST',
        body: token
    })
    })})
});

export const { useGetUserQuery, useGetUsersQuery, useGetUserbyCountryQuery, useGetUnitsQuery, useVerifyUserMutation } = api;

