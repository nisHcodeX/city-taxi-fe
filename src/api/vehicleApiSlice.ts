import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './interceptorsSlice';
import { TCreateDriver, TCreateDriverRes, TDriverNearBy, TVehicle } from '../types/driver';
import { TCreateVehicle } from '../types/vehicle';

export const vehicleApiSlice = createApi({
  reducerPath: 'vehicleApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    addVehicle: builder.mutation<any, TCreateVehicle[]>({
      query: (data) => ({
        url: '/vehicle',
        method: 'POST',
        body: data,
      }),
    }),
    updateVehicle: builder.mutation<any, TCreateVehicle>({
      query: (data) => ({
        url: '/vehicle',
        method: 'PATCH',
        body: [data],
      }),
    }),
    getVehicleByid: builder.query<any, number>({
      query: (id) => ({
        url: '/vehicle',
        params: { id },
      }),
    }),
  }),
});

export const { useAddVehicleMutation, useLazyGetVehicleByidQuery, useUpdateVehicleMutation } = vehicleApiSlice