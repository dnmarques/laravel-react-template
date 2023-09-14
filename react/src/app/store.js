import { configureStore } from '@reduxjs/toolkit'
import authReducer from 'features/auth/authSlice'
import counterReducer from 'features/counter/counterSlice'
import tasksReducer from 'features/tasks/tasksSlice'
import loggedUserReducer from 'features/loggedUser/loggedUserSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    counter: counterReducer,
    tasks: tasksReducer,
    loggedUser: loggedUserReducer
  },
});
