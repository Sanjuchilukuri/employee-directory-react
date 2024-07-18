import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/Interceptor";

const FetchLocations = createAsyncThunk(
  "FetchLocations",
  async (_,{ rejectWithValue }) => {
    try {
        const Locations = await api.get("/Location");
      return Locations.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export default FetchLocations;
