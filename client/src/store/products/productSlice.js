import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getNewProducts } from "./asyncAction";
export const productSlice = createSlice({
  name: "product",
  initialState: {
    newProducts: null,
    isLoading: false,
    errorMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNewProducts.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(getNewProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.newProducts = action.payload;
      });
    builder.addCase(getNewProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = "Something went wrong";
    });
  },
});

export default productSlice.reducer;
