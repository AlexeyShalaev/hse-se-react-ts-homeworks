import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../apiClient';
import Cookies from 'js-cookie'; // Import js-cookie library

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
};

export const loginAsync = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }) => {
    const response = await apiClient.login(credentials.email, credentials.password);
    const { accessToken, refreshToken } = response.data;
    Cookies.set('accessToken', accessToken);
    Cookies.set('refreshToken', refreshToken);
    return { accessToken, refreshToken };
  }
);

export const logoutAsync = createAsyncThunk('auth/logout', async () => {
  await apiClient.logout();
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
  return {};
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    clearTokens: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to login';
      })
      .addCase(logoutAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.loading = false;
        state.accessToken = null;
        state.refreshToken = null;
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to logout';
      });
  },
});

export const { setTokens, clearTokens } = authSlice.actions;
export default authSlice.reducer;
