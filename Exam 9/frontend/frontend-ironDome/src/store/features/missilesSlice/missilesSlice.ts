import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Missile, Status } from "../../../types/userType";
import axios from "axios";



interface MissileState {
    user: Missile | null;
    token: string | null;
    status: Status;
    error: string | null;
  }
  const initialState: MissileState = {
    user:null,
    token:localStorage.getItem('token') || null,
    status: "idle",
    error: null,
  };

const BASE_URL = `${import.meta.env.VITE_API_URL}`;


export const launchMissile = createAsyncThunk(
    "missile/launchMissile",
    async (
      { userId, region, missileName }: { userId: string; region: string; missileName: string },
      { rejectWithValue, getState }
    ) => {
      const { token } = (getState() as { missile: MissileState }).missile;
      try {
        const response = await axios.post(`${BASE_URL}/launchMissile`,
          { userId, region, missileName },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        return response.data.data;
      } catch (error: any) {
        return rejectWithValue(error.response?.data || "Launch failed");
      }
    }
  );
  
  const missileSlice = createSlice({
    name: "missile",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(launchMissile.pending, (state) => {
          state.status = "pending";
          state.error = null;
        })
        .addCase(launchMissile.fulfilled, (state, action) => {
          state.status = "fulfilled";
          state.user = action.payload;
        })
        .addCase(launchMissile.rejected, (state, action) => {
          state.status = "rejected";
          state.error = action.payload as string;
        });
    },
  });
  
  export default missileSlice.reducer;