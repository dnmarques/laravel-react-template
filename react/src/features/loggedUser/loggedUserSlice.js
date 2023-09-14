import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import client from '../../api/client'
import {register} from "../auth/authSlice";

const initialState = {
  status: 'idle',
  user: null,
  errors: []
}

export const getUser = createAsyncThunk('loggedUser/fetchUser', async (arg, { rejectWithValue }) => {
  try {
    const response = await client.get('/api/user')
    return response.data;
  } catch (e) {
    return rejectWithValue(e.response.data.errors)
  }
})

const loggedUserSlice = createSlice({
  name: 'loggedUser',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUser.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = 'failed'
        state.user = null
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
      })
  }
})

export const user = state => state.loggedUser.user

export default loggedUserSlice.reducer
