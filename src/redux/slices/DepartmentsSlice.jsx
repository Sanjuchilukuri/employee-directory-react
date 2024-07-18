import { createSlice } from "@reduxjs/toolkit";
import FetchDepartments from "../../Actions/FetchDepartments";

const initialState = {
  data: "",
  error: null,
  success: false,
};

const FetchDepartmentsSlice = createSlice({
  name: "FetchDepartments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(FetchDepartments.pending, (state) => {
        state.success = false;
        state.error = null;
      })
      .addCase(FetchDepartments.fulfilled, (state, action) => {
        state.data = action.payload;
        state.success = true;
      })
      .addCase(FetchDepartments.rejected, (state, action) => {
        state.success = false;
        state.error = action.payload;
      });
  },
});

export default FetchDepartmentsSlice.reducer;
