import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/Interceptor";

const FetchManagers = createAsyncThunk(
  "FetchManagers",
  async (_, { rejectWithValue }) => {
    try {
      const Managers = await api.get("/Manager");
      return Managers.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export default FetchManagers;
