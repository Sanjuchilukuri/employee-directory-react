import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/Interceptor";

const FetchProjects = createAsyncThunk(
  "FetchProjects",
  async (_,{ rejectWithValue }) => {
    try {
      const projects = await api.get("/Project");
      return projects.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export default FetchProjects;
