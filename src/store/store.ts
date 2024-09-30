import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import appReducer from '../appSlice';
import {apiSlice as todoApiSlice} from '../api/todoApiSlice';
import { customerApiSlice } from '../api/customerApiSlice';
import { loginApiSlice } from '../api/loginApiSlice';
import { driverApiSlice } from '../api/driverApiSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    app: appReducer,
    [todoApiSlice.reducerPath] : todoApiSlice.reducer,
    [customerApiSlice.reducerPath] : customerApiSlice.reducer,
    [loginApiSlice.reducerPath] : loginApiSlice.reducer,
    [driverApiSlice.reducerPath] : driverApiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
      getDefaultMiddleware()
        .concat(todoApiSlice.middleware)
        .concat(customerApiSlice.middleware)
        .concat(loginApiSlice.middleware)
        .concat(driverApiSlice.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
