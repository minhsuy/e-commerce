import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncAction";
export const appSlice = createSlice({
  name: "app",
  initialState: {
    categories: null,
    isLoading: false,
    errorMessage: "",
    isShowModal: false,
    modalChildren: null,
  },
  reducers: {
    showModal: (state, action) => {
      state.isShowModal = action.payload.isShowModal;
      state.modalChildren = action.payload.modalChildren;
    },
  },
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
export const { showModal } = appSlice.actions;

export default appSlice.reducer;
