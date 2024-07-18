import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/Interceptor";

const FetchEmployeeById = createAsyncThunk(
  "FetchEmployeeById",
  async (empId, { rejectWithValue }) => {
    try {
      const employee = await api.get(`/Employee/${empId}`);
      return employee.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export default FetchEmployeeById;
