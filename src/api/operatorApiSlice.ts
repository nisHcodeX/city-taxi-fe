import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './interceptorsSlice';
import { OperatorCreate, OperatorCreateRes } from '../types/operator';

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
    getOperatorById: builder.query<OperatorCreateRes[], number>({
        query: (id) => ({
            url : `/telephone/operator`,
            params: { id }
        }),
    }),
    getOperators: builder.query<OperatorCreateRes[], void>({
        query: () => ({
            url : `/telephone/operator`,
            method: 'GET'
        }),
    }),
  }),
});

export const { useGetOperatorByIdQuery, useGetOperatorsQuery, useOperatorRegisterMutation  } = operatorApiSlice