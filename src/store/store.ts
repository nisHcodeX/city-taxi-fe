import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import appReducer from '../appSlice';
import { customerApiSlice } from '../api/customerApiSlice';
import { loginApiSlice } from '../api/loginApiSlice';
import { driverApiSlice } from '../api/driverApiSlice';
import { operatorApiSlice } from '../api/operatorApiSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    app: appReducer,
    [customerApiSlice.reducerPath] : customerApiSlice.reducer,
    [loginApiSlice.reducerPath] : loginApiSlice.reducer,
    [driverApiSlice.reducerPath] : driverApiSlice.reducer,
    [operatorApiSlice.reducerPath] : operatorApiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
      getDefaultMiddleware()
        .concat(customerApiSlice.middleware)
        .concat(loginApiSlice.middleware)
        .concat(driverApiSlice.middleware)
        .concat(operatorApiSlice.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
