import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/Interceptor";

const FetchAllRoles = createAsyncThunk(
  "FetchAllRoles",
  async (_, { rejectWithValue }) => {
    try {
      const allRoles = await api.get("/Roles");
      return allRoles.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export default FetchAllRoles;
