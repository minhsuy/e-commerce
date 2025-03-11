import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGetCurrent } from "../../apis/user";

export const getCurrent = createAsyncThunk(
  "user/current",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiGetCurrent();

      if (response.success === false || response.message === "jwt expired") {
        return rejectWithValue(response.message || "Token đã hết hạn");
      }

      return response.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi không xác định"
      );
    }
  }
);
