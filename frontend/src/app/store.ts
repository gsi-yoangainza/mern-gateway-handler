import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import authReducer from '../modules/users/store/authSlice';
import gatewayReducer from '../modules/gateways/store/gatewaySlice';
import peripheralReducer from '../modules/peripherals/store/peripheralSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    gateway: gatewayReducer,
    peripheral: peripheralReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
