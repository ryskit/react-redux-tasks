import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { access } from "fs";
import { RootState } from "../../app/store";

const apiUrl = "http://localhost:8080";
const accessToken = localStorage;

export const fetchAsyncLogin = createAsyncThunk(
  "login/post",
  async (auth: Authen) => {
    const res = await axios.post<LoginResponse>(
      `${apiUrl}/authentication/sign-in`,
      auth,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return res.data;
  }
);

export const fetchAsyncSignUp = createAsyncThunk(
  "signup/post",
  async (auth: Authen) => {
    const res = await axios.post<void>(
      `${apiUrl}/authentication/sign-up`,
      auth,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  }
);

export const fetchAsyncProfile = createAsyncThunk("users/me", async () => {
  const res = await axios.get<Profile>(`${apiUrl}/users/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken.getItem("localJWT")}`,
    },
  });
  return res.data;
});

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface Authen {
  email: string;
  password: string;
}

export interface Profile {
  id: number;
  email: string;
}

export interface LoginState {
  authen: Authen;
  isLoginView: boolean;
  profile: Profile;
}

const initialState: LoginState = {
  authen: {
    email: "",
    password: "",
  },
  isLoginView: true,
  profile: {
    id: 0,
    email: "",
  },
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    editEmail: (state, action: PayloadAction<string>) => {
      state.authen.email = action.payload;
    },
    editPassword: (state, action: PayloadAction<string>) => {
      state.authen.password = action.payload;
    },
    toggleMode: (state) => {
      state.isLoginView = !state.isLoginView;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncLogin.fulfilled, (state, action) => {
      localStorage.setItem("localJWT", action.payload.accessToken);
      action.payload.accessToken && (window.location.href = "/tasks");
    });
    builder.addCase(fetchAsyncLogin.rejected, (state, action) => {
      console.log(state, action);
    });
    builder.addCase(fetchAsyncProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
  },
});

export const { editEmail, editPassword, toggleMode } = loginSlice.actions;
export const selectAuthen = (state: RootState) => state.login.authen;
export const selectIsLoginView = (state: RootState) => state.login.isLoginView;
export const selectProfile = (state: RootState) => state.login.profile;

export default loginSlice.reducer;
