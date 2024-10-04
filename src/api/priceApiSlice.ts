import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './interceptorsSlice';
import { TAdVehicle } from '../types/price';

export const priceApiSlice = createApi({
  reducerPath: 'priceApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({

    getMeterPrice: builder.query<TAdVehicle[], void>({
      query: () => ({
        url: `/vehicle/type`,
        method: 'GET'
      }),
    }),
    meterPriceUpdate: builder.mutation<any, any>({
      query: (data) => ({
        url: '/vehicle/type',
        method: 'PATCH',
        body: [data],
      }),
    }),
  }),
});

export const {
  useLazyGetMeterPriceQuery,
  useMeterPriceUpdateMutation
} = priceApiSlice