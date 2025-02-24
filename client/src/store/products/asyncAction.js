import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetProducts } from "../../apis/product";
export const getNewProducts = createAsyncThunk(
  "product/newProducts",
  async (data, { rejectWithValue }) => {
    const response = await apiGetProducts({ sort: "-createAt" });
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response.data;
  }
);
