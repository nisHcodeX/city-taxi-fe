import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './interceptorsSlice';
import { OperatorCreate, OperatorCreateRes, OperatorUpdateRes } from '../types/operator';

export const operatorApiSlice = createApi({
  reducerPath: 'operatorApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    operatorRegister: builder.mutation<any, OperatorCreate>({
      query: (data) => ({
        url: '/telephone/operator/register',
        method: 'POST',
        body: data,
      }),
    }),
    operatorUpdate: builder.mutation<any, OperatorUpdateRes>({
      query: (data) => ({
        url: '/telephone/operator',
        method: 'PATCH',
        body: data,
      }),
    }),
    getOperatorById: builder.query<OperatorCreateRes[], number>({
      query: (id) => ({
        url: `/telephone/operator`,
        params: { id }
      }),
    }),
    getOperators: builder.query<OperatorCreateRes[], void>({
      query: () => ({
        url: `/telephone/operator`,
        method: 'GET'
      }),
    }),
    deleteOperator: builder.query<any, number>({
      query: (ids) => ({
        url: `/telephone/operator`,
        params: { ids },
        method: 'DELETE'
      }),
    }),
  }),
});

export const { useGetOperatorByIdQuery, useLazyGetOperatorByIdQuery,useLazyGetOperatorsQuery, useOperatorRegisterMutation, useLazyDeleteOperatorQuery, useOperatorUpdateMutation } = operatorApiSlice