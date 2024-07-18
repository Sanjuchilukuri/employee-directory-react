import { createSlice } from "@reduxjs/toolkit";
import FetchLocations from "../../Actions/FetchLocations";

const initialState = {
  data: "",
  error: null,
  success: false,
};

const FetchLocationsSlice = createSlice({
  name: "FetchLocations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(FetchLocations.pending, (state) => {
        state.success = false;
        state.error = null;
      })
      .addCase(FetchLocations.fulfilled, (state, action) => {
        state.data = action.payload;
        state.success = true;
      })
      .addCase(FetchLocations.rejected, (state, action) => {
        state.success = false;
        state.error = action.payload;
      });
  },
});

export default FetchLocationsSlice.reducer;
