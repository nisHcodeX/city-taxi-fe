import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './interceptorsSlice';
import { TCreateCustomer, TCreateCustomerRes } from '../types/customer';

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
    getCustomer: builder.query<any, number>({
        query: (id) => ({
            url : `/customer`,
            params: { id }
        }),
    }),
  }),
});

export const { useRegisterMutation, useLazyGetCustomerQuery } = customerApiSlice