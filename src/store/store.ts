import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import appReducer from '../appSlice';
import {apiSlice as todoApiSlice} from '../api/todoApiSlice';
import { customerApiSlice } from '../api/customerApiSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    app: appReducer,
    [todoApiSlice.reducerPath] : todoApiSlice.reducer,
    [customerApiSlice.reducerPath] : customerApiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
      getDefaultMiddleware()
        .concat(todoApiSlice.middleware)
        .concat(customerApiSlice.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
