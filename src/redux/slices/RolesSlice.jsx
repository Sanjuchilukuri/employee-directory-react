import { createSlice } from "@reduxjs/toolkit";
import FetchAllRoles from "../../Actions/Roles/FetchAllRoles";
import FetchRoles from "../../Actions/Roles/FetchRoles";

// Initial state for FetchAllRoles
const initialStateFetchAllRoles = {
  data: "",
  error: null,
  success: false,
};

// FetchAllRoles slice
const FetchAllRolesSlice = createSlice({
  name: "FetchAllRoles",
  initialState: initialStateFetchAllRoles,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(FetchAllRoles.pending, (state) => {
        state.success = false;
        state.error = null;
      })
      .addCase(FetchAllRoles.fulfilled, (state, action) => {
        state.data = action.payload;
        state.success = true;
      })
      .addCase(FetchAllRoles.rejected, (state, action) => {
        state.success = false;
        state.error = action.payload;
      });
  },
});

// Initial state for FetchRoles
const initialStateFetchRoles = {
  data: "",
  error: null,
  success: false,
};

// FetchRoles slice
const FetchRolesSlice = createSlice({
  name: "FetchRoles",
  initialState: initialStateFetchRoles,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(FetchRoles.pending, (state) => {
        state.success = false;
        state.error = null;
      })
      .addCase(FetchRoles.fulfilled, (state, action) => {
        state.data = action.payload;
        state.success = true;
      })
      .addCase(FetchRoles.rejected, (state, action) => {
        state.success = false;
        state.error = action.payload;
      });
  },
});

// Export reducers
export const fetchAllRolesReducer = FetchAllRolesSlice.reducer;
export const fetchRolesReducer = FetchRolesSlice.reducer;
