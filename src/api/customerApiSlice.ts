import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './interceptorsSlice';
import { TCreateCustomer, TCreateCustomerRes } from '../types/customer';
import { VoidExpression } from 'typescript';

export const customerApiSlice = createApi({
  reducerPath: 'customerApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    register: builder.mutation<TCreateCustomerRes, TCreateCustomer>({
      query: (data) => ({
        url: '/customer/register',
        method: 'POST',
        body: data,
      }),
    }),
    getCustomer: builder.query<TCreateCustomerRes[], number>({
        query: (id) => ({
            url : `/customer`,
            params: { id }
        }),
    }),
    getCustomers: builder.query<TCreateCustomerRes[], void>({
        query: (id) => ({
            url : `/customer`,
            method: 'GET'
        }),
    }),
  }),
});

export const { useRegisterMutation, useLazyGetCustomerQuery, useGetCustomersQuery } = customerApiSlice