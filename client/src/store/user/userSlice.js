import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { getCurrent } from "./asyncAction";
export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    current: null,
    token: null,
    isLoading: false,
    mes: "",
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
      state.token = null;
      state.current = null;
      state.mes = "";
    },
    clearMessage: (state, action) => {
      state.mes = "";
    },
    updateCart: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrent.pending, (state, action) => {
      state.isLoading = true;
    }),
      builder.addCase(getCurrent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.current = action.payload;
        state.mes = "";
      });
    builder.addCase(getCurrent.rejected, (state, action) => {
      state.isLoading = false;
      state.current = null;
      state.token = null;
      state.isLoggedIn = false;
      state.mes = "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!";
    });
  },
});
export const { login, logout, clearMessage } = userSlice.actions;
export default userSlice.reducer;
