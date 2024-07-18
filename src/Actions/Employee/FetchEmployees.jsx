import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/Interceptor";

const FetchEmployees = createAsyncThunk(
  "FetchEmployees",
  async (_, { rejectWithValue }) => {
    try {
      const employee = await api.get("/Employee");
      return employee.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export default FetchEmployees;
