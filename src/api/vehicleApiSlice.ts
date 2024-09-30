import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './interceptorsSlice';
import { TCreateDriver, TCreateDriverRes, TDriverNearBy } from '../types/driver';
import { TCreateVehicle } from '../types/vehicle';

export const driverApiSlice = createApi({
  reducerPath: 'vehicleApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    addVehicle: builder.mutation<any, TCreateVehicle>({
      query: (data) => ({
        url: '/vehicle',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useAddVehicleMutation } = driverApiSlice