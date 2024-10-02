import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './interceptorsSlice';
import { TLoginData } from '../types/login';

export const loginApiSlice = createApi({
  reducerPath: 'loginApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation<any, TLoginData>({
      query: (data) => ({
        url: '/public/login',
        method: 'POST',
        body: data,
      }),
    }),
    internalLogin: builder.mutation<any, TLoginData>({
      query: (data) => ({
        url: '/internal/login',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation, useInternalLoginMutation } = loginApiSlice