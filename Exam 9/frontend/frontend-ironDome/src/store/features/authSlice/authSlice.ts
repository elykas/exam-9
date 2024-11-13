import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IUser, Status } from "../../../types/userType";

interface AuthState {
  user: IUser | null;
  token: string | null;
  status: Status;
  error: string | null;
}

const BASE_URL = `${import.meta.env.VITE_API_URL}`;

export const register = createAsyncThunk(
  "auth/register",
  async (userData: { username: string; password: string,organization:string }, { rejectWithValue }) => {
    try {
        
      const response = await axios.post(`${BASE_URL}/register`, userData);
      return response.data.data;
    } catch (error:any) {
      const message = error.response?.data?.message || "Registration failed";
      return rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, userData);
      const { token, data: user } = response.data;
      localStorage.setItem("token", token);
      return { token, user };
    } catch (error:any) {
      const message = error.response?.data?.message || "Login failed";
      return rejectWithValue(message);;
    }
  }
);


export const fetchUserByTokenAttack = createAsyncThunk(
  "auth/fetchUserByTokenAttack",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/auth/user/attack`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data.data; 
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to fetch user";
      return rejectWithValue(message);
    }
  }
);


export const fetchUserByTokenDefense = createAsyncThunk(
    "auth/fetchUserByTokenDefense",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${BASE_URL}/auth/user/defense`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        return response.data.data; 
      } catch (error: any) {
        const message = error.response?.data?.message || "Failed to fetch user";
        return rejectWithValue(message);
      }
    }
  );


const initialState: AuthState = {
    user:null,
    token:localStorage.getItem('token') || null,
    status: "idle",
    error: null,
  };

const authSlice = createSlice({
  name:"auth",
  initialState,
  reducers:{
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = "idle";
      state.error = null;
      localStorage.removeItem("token");
    },
    
  },
  extraReducers:(builder)=>{
    builder
    .addCase(register.pending,(state) => {
      state.status = "pending";
      state.error = null;
    })
    .addCase(register.fulfilled,(state,action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.status = "fulfilled";
    })
    .addCase(register.rejected,(state,action) =>{
      state.status = "rejected";
      state.error = action.payload as string
    });

    builder
    .addCase(login.pending,(state) => {
      state.status = "pending";
      state.error = null;
    })
    .addCase(login.fulfilled,(state,action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.status = "fulfilled"
    })
    .addCase(login.rejected,(state,action)=>{
      state.status = "rejected";
      state.error = action.payload as string
    })
    .addCase(fetchUserByTokenAttack.pending, (state) => {
      state.status = "pending";
    })
    .addCase(fetchUserByTokenAttack.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = "fulfilled";
    })
    .addCase(fetchUserByTokenAttack.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload as string;
    })
    .addCase(fetchUserByTokenDefense.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchUserByTokenDefense.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "fulfilled";
      })
      .addCase(fetchUserByTokenDefense.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload as string;
      });
  }
})


export const { logout } = authSlice.actions;

export default authSlice.reducer;