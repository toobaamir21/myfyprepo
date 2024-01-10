import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCategory = createAsyncThunk("fetchCategory",async(args,{rejectWithValue})=>{
     try {
        const response = await fetch("/api/category/getcategory")
        const result = await response.json()
        return result
     } catch (error) {
        return rejectWithValue(error);
     }
})

export const CategorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {}, // You can add reducers here if needed
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default CategorySlice.reducer;

















