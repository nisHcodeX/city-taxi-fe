import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './interceptorsSlice';
import { TCreateCustomer, TCreateCustomerRes } from '../types/customer';
import { VoidExpression } from 'typescript';

export const customerApiSlice = createApi({
  reducerPath: 'bookingApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    register: builder.mutation<TCreateCustomerRes, TCreateCustomer>({
      query: (data) => ({
        url: '/bookings',
        method: 'POST',
        body: data,
      }),
    }),
    getBookingByid: builder.query<TCreateCustomerRes[], number>({
        query: (id) => ({
            url : `/bookings`,
            params: { id }
        }),
    }),
    getBookings: builder.query<TCreateCustomerRes[], void>({
        query: () => ({
            url : `/bookings`,
            method: 'GET'
        }),
    }),
    updateBooking: builder.mutation<any, any>({
      query: (data) => ({
        url: '/bookings/status',
        method: 'PATCH',
        body: data,
      }),
    }),
  }),
});

export const { 
  } = customerApiSlice