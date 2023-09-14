import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import client from '../../api/client'
import { getUser } from "../loggedUser/loggedUserSlice";

const initialState = {
  status: 'idle',
  errors: []
}

export const register = createAsyncThunk('auth/register', async (arg, { rejectWithValue }) => {
  const {
    name,
    email,
    password,
    passwordConfirmation
  } = arg
  try {
    await client.get('/sanctum/csrf-cookie')
    await client.post('/api/register', {
      name: name,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation
    });
  } catch (e) {
    return rejectWithValue(e.response.data.errors)
  }
})

export const login = createAsyncThunk('auth/login', async (arg, { rejectWithValue }) => {
  const {
    email,
    password
  } = arg
  try {
    // await client.get('/sanctum/csrf-cookie')
    await client.post('/api/login', {
      email: email,
      password: password
    });
  } catch (e) {
    return rejectWithValue(e.response.data.errors)
  }
})

export const logout = createAsyncThunk('auth/logout', async (arg, { rejectWithValue }) => {
  try {
    await client.post('/api/logout');
  } catch (e) {
    return rejectWithValue(e.response.data.errors)
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
     builder
       .addCase(register.pending, (state, action) => {
         state.status = 'loading'
       })
       .addCase(register.rejected, (state, action) => {
         state.status = 'failed'
       })
       .addCase(register.fulfilled, (state, action) => {
         state.status = 'succeeded'
       })
       .addCase(logout.pending, (state, action) => {
         state.status = 'loading'
       })
       .addCase(logout.rejected, (state, action) => {
         state.status = 'failed'
       })
       .addCase(logout.fulfilled, (state, action) => {
         state.status = 'succeeded'
       })
       .addCase(login.pending, (state, action) => {
         state.status = 'loading'
       })
       .addCase(login.rejected, (state, action) => {
         state.status = 'failed'
       })
       .addCase(login.fulfilled, (state, action) => {
         state.status = 'succeeded'
       })
  }
})

export default authSlice.reducer
