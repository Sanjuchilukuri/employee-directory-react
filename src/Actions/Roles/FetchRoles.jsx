import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/Interceptor";

const FetchRoles = createAsyncThunk(
  "FetchRoles",
  async (department, { rejectWithValue }) => {
    try {
      console.log(department);
      const Roles = await api.get(`/Roles/${department}`);

      return Roles.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export default FetchRoles;
