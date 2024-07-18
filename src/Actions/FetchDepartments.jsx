import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/Interceptor";

const FetchDepartments = createAsyncThunk(
  "FetchDepartments",
  async (_, { rejectWithValue }) => {
    try {
      const departments = await api.get("/Department");
      return departments.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export default FetchDepartments;
