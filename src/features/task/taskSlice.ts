import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";

const apiUrl = "http://localhost:8080/tasks";
const accessToken = localStorage.getItem("localJWT");

export interface Task {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export type TaskInput = Pick<Task, "title">;

export interface TaskState {
  tasks: Task[];
  editedTask: Task;
  selectedTask: Task;
}

const initialState: TaskState = {
  tasks: [],
  editedTask: {
    id: 0,
    title: "",
    createdAt: "",
    updatedAt: "",
  },
  selectedTask: {
    id: 0,
    title: "",
    createdAt: "",
    updatedAt: "",
  },
};

export const fetchAsyncTasks = createAsyncThunk("tasks/get", async () => {
  const res = await axios.get<Task[]>(`${apiUrl}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
});

export const createAsyncTask = createAsyncThunk(
  "task/post",
  async (task: Task) => {
    const taskInput: TaskInput = { title: task.title };
    const res = await axios.post<Task>(`${apiUrl}`, taskInput, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  }
);

export const updateAsyncTask = createAsyncThunk(
  "task/put",
  async (task: Task) => {
    const taskInput: TaskInput = { title: task.title };
    const res = await axios.patch<Task>(`${apiUrl}/${task.id}`, taskInput, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  }
);

export const deleteAsyncTask = createAsyncThunk(
  "task/delete",
  async (id: number) => {
    const res = await axios.delete<Task>(`${apiUrl}/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    editTask: (state, action: PayloadAction<Task>) => {
      state.editedTask = action.payload;
    },
    selectTask: (state, action: PayloadAction<Task>) => {
      state.selectedTask = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchAsyncTasks.fulfilled,
      (state, action: PayloadAction<Task[]>) => {
        return {
          ...state,
          tasks: action.payload,
        };
      }
    );

    builder.addCase(createAsyncTask.fulfilled, (state, action) => {
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
      };
    });

    builder.addCase(updateAsyncTask.fulfilled, (state, action) => {
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
        selectedTask: action.payload,
      };
    });

    builder.addCase(deleteAsyncTask.fulfilled, (state, action) => {
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload.id),
        selectedTask: { id: 0, title: "", createdAt: "", updatedAt: "" },
      };
    });
  },
});

export const { editTask, selectTask } = taskSlice.actions;

export const selectSelectedTask = (state: RootState) => state.task.selectedTask;
export const selectEditedTask = (state: RootState) => state.task.editedTask;
export const selectTasks = (state: RootState) => state.task.tasks;

export default taskSlice.reducer;
