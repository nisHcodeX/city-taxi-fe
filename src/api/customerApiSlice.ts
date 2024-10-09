import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './interceptorsSlice';
import { TCreateCustomer, TCreateCustomerRes, TCreateUnRegCustomer, TCreateUnRegCustomerRes, TUpdateCustomer } from '../types/customer';
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
    unregCustomer: builder.mutation<TCreateUnRegCustomerRes[], TCreateUnRegCustomer>({
      query: (data) => ({
        url: '/customer',
        method: 'POST',
        body: data,
      }),
    }),
    getCustomer: builder.query<TCreateCustomerRes[], number>({
      query: (id) => ({
        url: `/customer`,
        params: { id }
      }),
    }),
    getCustomers: builder.query<TCreateCustomerRes[], void>({
      query: () => ({
        url: `/customer`,
        method: 'GET'
      }),
    }),
    customerUpdate: builder.mutation<any, TUpdateCustomer>({
      query: (data) => ({
        url: '/customer',
        method: 'PATCH',
        body: [data],
      }),
    }),
    deleteCustomer: builder.query<any, number>({
      query: (ids) => ({
        url: `/customer`,
        method: 'DELETE',
        params: { ids }
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useUnregCustomerMutation,
  useLazyGetCustomerQuery,
  useLazyGetCustomersQuery,
  useCustomerUpdateMutation,
  useLazyDeleteCustomerQuery,
  useGetCustomersQuery } = customerApiSlice