import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  completeTaskAPI,
  createTaskAPI,
  deleteTaskAPI,
  editTaskAPI,
  getTasksAPI
} from "./tasksAPI";
import moment from "moment";

export const toggleCompleteTask = createAsyncThunk(
  'tasks/completeTask',
  async (task) => {
    const response = await completeTaskAPI(task);
    return response.data;
  }
);

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (date) => {
    const response = await getTasksAPI(date)
    return response.data
  }
)

export const createTask = createAsyncThunk('tasks/createTask', async (arg, { rejectWithValue }) => {
  const {
    text,
    date,
  } = arg
  try {
    await createTaskAPI({
      text: text,
      date: date,
    })
  } catch (e) {
    return rejectWithValue(e.response.data.errors)
  }
})

export const deleteTask = createAsyncThunk('deleteTask/deleteTask', async (arg, { rejectWithValue }) => {
  const {
    taskId
  } = arg
  try {
    await deleteTaskAPI(taskId)
  } catch (e) {
    return rejectWithValue(e.response.data.errors)
  }
})

export const editTask = createAsyncThunk('tasks/editTask', async (arg, { rejectWithValue }) => {
  const {
    taskId,
    text,
    date,
  } = arg
  try {
    await editTaskAPI(taskId, {
      text: text,
      date: date,
    })
  } catch (e) {
    return rejectWithValue(e.response.data.errors)
  }
})

const initialState = {
  date: moment().format('YYYY-MM-DD'),
  tasks: [],
  loadingTasks: {},
  status: 'idle',
  selectedTask: null,
  editTaskDialogOpen: false,
  createTaskDialogOpen: false,
  deleteTaskDialogOpen: false
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setCreateTaskDialog: (state, action) => {
      state.createTaskDialogOpen = action.payload.open
    },
    setEditTaskDialog: (state, action) => {
      state.selectedTask = action.payload.task
      state.editTaskDialogOpen = action.payload.open
    },
    setDeleteTaskDialog: (state, action) => {
      state.selectedTask = action.payload.task
      state.deleteTaskDialogOpen = action.payload.open
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(toggleCompleteTask.pending, (state, action) => {
        state.loadingTasks[action.meta.arg.id] = true
      })
      .addCase(toggleCompleteTask.fulfilled, (state, action) => {
        const taskId = action.payload.data.id
        const existingTaskIndex = state.tasks.findIndex(task => task.id === taskId)
        if (existingTaskIndex >= 0) {
          state.tasks[existingTaskIndex] = action.payload.data
        }
        state.loadingTasks[action.meta.arg.id] = false
      })
      .addCase(fetchTasks.pending, (state, action) => {
        state.status = 'loading'
        state.tasks = []
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.tasks = action.payload.data
      })
  },
});

export const { setDate, setEditTaskDialog, setCreateTaskDialog, setDeleteTaskDialog } = tasksSlice.actions;

export const dateSelector = (state) => state.tasks.date
export const selectTasks = (state) => state.tasks.tasks;

export default tasksSlice.reducer;
