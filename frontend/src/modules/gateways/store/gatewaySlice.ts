import { RootState } from '../../../app/store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import gatewayService from '../services/gatewayService';
import { IGateway, IGatewayEditData, IGatewayResponse } from '../types/gateway';

export interface IPeripheral {
  vendor: string;
  status: boolean;
  dateCreated?: string;
}

export interface IInitialState {
  gateways: IGatewayResponse[];
  isError: boolean;
  isSuccess: boolean;
  isFormSuccess: boolean;
  isLoading: boolean;
  isFormLoading: boolean;
  message: string;
  isOpen: boolean;
  isOpenEdit: boolean;
  openDetails: boolean;
}

const initialState: IInitialState = {
  gateways: [],
  isError: false,
  isSuccess: false,
  isFormSuccess: false,
  isLoading: false,
  isFormLoading: false,
  message: '',
  isOpen: false,
  isOpenEdit: false,
  openDetails: false,
};

// Register user
export const getAll = createAsyncThunk<
  // Return type of the payload creator
  IGatewayResponse[],
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

export const editGateway = createAsyncThunk<IGatewayResponse, IGatewayEditData, { state: RootState }>(
  'gateway/edit',
  async (data: IGatewayEditData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await gatewayService.editGateway(data, token);
    } catch (error: any) {
      const message: string =
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteGateway = createAsyncThunk<any, string, { state: RootState }>(
  'gateway/delete',
  async (id: string, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await gatewayService.deleteGateway(id, token);
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
      state.isFormLoading = false;
      state.isSuccess = false;
      state.isFormSuccess = false;
      state.isError = false;
      state.message = '';
      state.isOpen = false;
      state.isOpenEdit = false;
      state.openDetails = false;
    },
    setOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    setOpenEdit: (state, action) => {
      state.isOpenEdit = action.payload;
    },
    setOpenDetails: (state, action) => {
      state.openDetails = action.payload;
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
        state.isFormSuccess = true;
        state.isOpen = false;
        state.gateways.push(action.payload);
        state.message = 'gateway.successfullyCreated';
      })
      .addCase(createGateway.rejected, (state, action) => {
        state.isFormLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(editGateway.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editGateway.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isFormSuccess = true;
        state.isOpenEdit = false;
        state.message = 'gateway.successfullyEdited';

        const foundIndex = state.gateways.findIndex((x) => x._id == action.payload._id);
        let arr = [...state.gateways];
        arr[foundIndex] = action.payload;

        state.gateways = arr;
      })
      .addCase(editGateway.rejected, (state, action) => {
        state.isFormLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(deleteGateway.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGateway.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isFormSuccess = true;
        state.gateways = state.gateways.filter((item) => item._id !== action.payload.id);
        state.message = 'gateway.successfullyDeleted';
      })
      .addCase(deleteGateway.rejected, (state, action) => {
        state.isFormLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset, setOpen, setOpenDetails, setOpenEdit } = gatewaySlice.actions;
export default gatewaySlice.reducer;
