import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/Interceptor";

export const login = createAsyncThunk(
  "SignIn/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await api.post("/Auth/login", credentials);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

const initialState = {
  data: "",
  loading: false,
  error: null,
  success: false,
};

const SignInSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.success = true;
        if (state.data != "undefined") {
          localStorage.setItem("token", state.data);
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error.message;
      });
  },
});

export default SignInSlice.reducer;
