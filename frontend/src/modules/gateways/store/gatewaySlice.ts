import { RootState } from '../../../app/store';
import { createSlice, createAsyncThunk, Reducer, AnyAction } from '@reduxjs/toolkit';

import { IUser } from '../../../pages/Register';
import gatewayService from '../services/gatewayService';
import { IGateway } from '../types/gateway';

export interface IPeripheral {
  vendor: string;
  status: boolean;
  dateCreated?: string;
}

export interface IInitialState {
  gateways: IGateway[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  isFormLoading: boolean;
  message: string;
  isOpen: boolean;
}

const initialState: IInitialState = {
  gateways: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  isFormLoading: false,
  message: '',
  isOpen: false,
};

// Register user
export const getAll = createAsyncThunk<
  // Return type of the payload creator
  IGateway[],
  // First argument to the payload creator
  undefined,
  {
    // Optional fields for defining thunkApi field types
    state: RootState;
  }
>('gateways/getAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await gatewayService.getAll(token);
  } catch (error: any) {
    const message: string =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const createGateway = createAsyncThunk<any, IGateway, { state: RootState }>(
  'gateway/create',
  async (gatewayData: IGateway, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await gatewayService.createGateway(gatewayData, token);
    } catch (error: any) {
      const message: string =
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const gatewaySlice = createSlice({
  name: 'gateway',
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
        state.gateways = action.payload;
      })
      .addCase(getAll.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.gateways = [];
      })
      .addCase(createGateway.pending, (state) => {
        state.isFormLoading = true;
      })
      .addCase(createGateway.fulfilled, (state, action) => {
        state.isFormLoading = false;
        state.isSuccess = true;
        state.gateways.push(action.payload);
      })
      .addCase(createGateway.rejected, (state, action) => {
        state.isFormLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.gateways = [];
      });
  },
});

export const { reset, setOpen } = gatewaySlice.actions;
export default gatewaySlice.reducer;
