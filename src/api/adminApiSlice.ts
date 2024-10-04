import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './interceptorsSlice';
import { TCreateDriver, TCreateDriverRes, TDriverNearBy } from '../types/driver';
import { TCreateVehicle } from '../types/vehicle';
import { TDashboardStats } from '../types/admin';

export const adminApiSlice = createApi({
  reducerPath: 'adminApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getDashboardDetail: builder.query<TDashboardStats, void>({
      query: () => ({
          url : `/admin/dashboard`,
          method: 'GET'
      }),
  }),
  }),
});

export const { useLazyGetDashboardDetailQuery } = adminApiSlice