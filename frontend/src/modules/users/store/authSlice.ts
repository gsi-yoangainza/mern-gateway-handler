import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IUser } from '../../../pages/Register';
import authService from '../services/authService';

//Get user from localStorage
const user = authService.getSession();

export interface IInitialState {
  user: any;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: IInitialState = {
  user: user ? user : {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Register user
export const register = createAsyncThunk('auth/register', async (user: IUser, thunkAPI) => {
  try {
    return await authService.register(user);
  } catch (error: any) {
    const message: string =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Register user
export const login = createAsyncThunk('auth/login', async (user: Pick<IUser, 'email' | 'password'>, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error: any) {
    const message: string =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.user = {};
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.user = {};
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = {};
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
