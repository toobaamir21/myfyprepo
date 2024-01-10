import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk(
  "getProducts",
  async (category, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/products?category=${category}`);
      console.log("this is response",response);
       if (!response.ok) {
         // If the response status is not OK (status code other than 200)
         throw new Error("Request failed with status: " + response.status);
       }
      const result = await response.json();
      console.log("this is result", result);
      return result
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const prodSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
     reducers: {
    clearProducts: (state) => {
      state.products = [];
    },
  }, // You can add reducers here if needed
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        console.log("Fulfilled payload:", action.payload);
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? action.payload.message
          : "Unknown error occurred";
        console.error("Rejected with error:", action.payload); 
      });
  },
});

export const { clearProducts } = prodSlice.actions;
export default prodSlice.reducer;



