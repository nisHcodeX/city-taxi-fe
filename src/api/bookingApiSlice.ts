import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './interceptorsSlice';
import { TBookingRide, TBookingStatusCreate, TCreateBooking, TGetBookingById } from '../types/booking';

export const bookingApiSlice = createApi({
  reducerPath: 'bookingApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    bookRide: builder.mutation<any, TCreateBooking>({
      query: (data) => ({
        url: '/bookings',
        method: 'POST',
        body: [data],
      }),
    }),
    getBookingByid: builder.query<any[], TGetBookingById>({
      query: ({ id, customerId, driverId }) => ({
        url: `/bookings`,
        params: { id, customerId, driverId }
      }),
    }),
    getBookings: builder.query<TBookingRide[], void>({
      query: () => ({
        url: `/bookings`,
        method: 'GET'
      }),
    }),
    updateBookingStatus: builder.mutation<any, TBookingStatusCreate>({
      query: (data) => ({
        url: '/bookings/status',
        method: 'PATCH',
        body: [data],
      }),
    }),
    markAsCompletd: builder.mutation<any, number>({
      query: (id) => ({
        url: '/bookings/mark/as/completed',
        method: 'PATCH',
        body: [{ ids: id }],
      }),
    }),
  }),
});

export const {
  useBookRideMutation,
  useLazyGetBookingsQuery,
  useLazyGetBookingByidQuery,
  useMarkAsCompletdMutation
} = bookingApiSlice