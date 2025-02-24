import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncAction";
export const appSlice = createSlice({
  name: "app",
  initialState: {
    categories: null,
    isLoading: false,
    errorMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actions.getCategories.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(actions.getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      });
    builder.addCase(actions.getCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = "Something went wrong";
    });
  },
});

export default appSlice.reducer;
