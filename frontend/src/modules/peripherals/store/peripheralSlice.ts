import { RootState } from '../../../app/store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { IInitialState, IPeripheral, IPeripheralResponse } from '../types/peripherals';
import peripheralService from '../services/peripheralService';

const initialState: IInitialState = {
  peripherals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  isFormLoading: false,
  message: '',
  isOpen: false,
};

// Register user
export const getAll = createAsyncThunk<
  IPeripheralResponse[],
  undefined,
  {
    state: RootState;
  }
>('peripheral/getAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await peripheralService.getAll(token);
  } catch (error: any) {
    const message: string =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const createPeripheral = createAsyncThunk<any, IPeripheral, { state: RootState }>(
  'peripheral/create',
  async (peripheralData: IPeripheral, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await peripheralService.createPeripheral(peripheralData, token);
    } catch (error: any) {
      const message: string =
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const peripheralSlice = createSlice({
  name: 'peripheral',
  initialState,
  reducers: {
    reset: (state) => {
      initialState;
    },
    setOpen: (state, action) => {
      state.isOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAll.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.peripherals = action.payload;
      })
      .addCase(getAll.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.peripherals = [];
      })
      .addCase(createPeripheral.pending, (state) => {
        state.isFormLoading = true;
      })
      .addCase(createPeripheral.fulfilled, (state, action) => {
        state.isFormLoading = false;
        state.isSuccess = true;
        state.isOpen = false;
        state.peripherals.push(action.payload);
      })
      .addCase(createPeripheral.rejected, (state, action) => {
        state.isFormLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset, setOpen } = peripheralSlice.actions;
export default peripheralSlice.reducer;
