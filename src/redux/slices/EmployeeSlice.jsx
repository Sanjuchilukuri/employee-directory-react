import { createSlice } from "@reduxjs/toolkit";
import FetchEmployeeById from "../../Actions/Employee/FetchEmployeeById";
import FetchEmployees from "../../Actions/Employee/FetchEmployees";

// Initial state for FetchEmployeeById
const initialStateFetchEmployeeById = {
  data: "",
  error: null,
  success: false,
};

// FetchEmployeeById slice
const FetchEmployeeByIdSlice = createSlice({
  name: "FetchEmployeeById",
  initialState: initialStateFetchEmployeeById,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(FetchEmployeeById.pending, (state) => {
        state.success = false;
        state.error = null;
      })
      .addCase(FetchEmployeeById.fulfilled, (state, action) => {
        state.data = action.payload;
        state.success = true;
      })
      .addCase(FetchEmployeeById.rejected, (state, action) => {
        state.success = false;
        state.error = action.payload;
      });
  },
});

// Initial state for FetchEmployees
const initialStateFetchEmployees = {
  data: "",
  error: null,
  success: false,
};

// FetchEmployees slice
const FetchEmployeesSlice = createSlice({
  name: "FetchEmployees",
  initialState: initialStateFetchEmployees,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(FetchEmployees.pending, (state) => {
        state.success = false;
        state.error = null;
      })
      .addCase(FetchEmployees.fulfilled, (state, action) => {
        state.data = action.payload;
        state.success = true;
      })
      .addCase(FetchEmployees.rejected, (state, action) => {
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const fetchEmployeeByIdReducer = FetchEmployeeByIdSlice.reducer;
export const fetchEmployeesReducer = FetchEmployeesSlice.reducer;
