import { createSlice } from "@reduxjs/toolkit";
import FetchProjects from "../../Actions/FetchProjects";

const initialState = {
  data: "",
  error: null,
  success: false,
};

const FetchProjectsSlice = createSlice({
  name: "FetchProjects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(FetchProjects.pending, (state) => {
        state.success = false;
        state.error = null;
      })
      .addCase(FetchProjects.fulfilled, (state, action) => {
        state.data = action.payload;
        state.success = true;
      })
      .addCase(FetchProjects.rejected, (state, action) => {
        state.success = false;
        state.error = action.payload;
      });
  },
});

export default FetchProjectsSlice.reducer;
