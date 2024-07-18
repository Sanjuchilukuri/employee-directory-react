import { createSlice } from "@reduxjs/toolkit";
import FetchManagers from "../../Actions/FetchManagers";

const initialState = {
  data: "",
  error: null,
  success: false,
};

const FetchManagersSlice = createSlice({
  name: "FetchManagers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(FetchManagers.pending, (state) => {
        state.success = false;
        state.error = null;
      })
      .addCase(FetchManagers.fulfilled, (state, action) => {
        state.data = action.payload;
        state.success = true;
      })
      .addCase(FetchManagers.rejected, (state, action) => {
        state.success = false;
        state.error = action.payload;
      });
  },
});

export default FetchManagersSlice.reducer;
