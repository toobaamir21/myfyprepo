import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  "fetchProducts",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `/api/products/bysellar?user=${id}`
      );
      if (!response.ok) {
        throw new Error("Request failed with status: " + response.status);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createProducts = createAsyncThunk(
  "createProducts",
  async (data, { rejectWithValue }) => {
    try {
      console.log(data+' data');
      const response = await fetch("/api/products/createprod", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue({ message: error.message });
    }
  }
);


export const updateProducts = createAsyncThunk(
  "updateProducts",
  async (data, { rejectWithValue }) => {
    try {
      console.log(`this is data ${JSON.stringify(data)} and this is id ${data._id}`);
      const response = await fetch(`/api/products/${data._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log("this is the response in cartslice", response);
      if (!response.ok) {
        throw new Error("Request failed with status: " + response.status);
      }

      const updatedProducts = await response.json();
      console.log("this is updatedProducts",updatedProducts);

      if (updatedProducts.quantity > updatedProducts.product.quantity) {
      
        updatedProducts.quantity = updatedProducts.product.quantity;
         console.log("this is newupdatedProducts", updatedProducts);
          return updatedProducts;
      }

      return updatedProducts;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteProducts = createAsyncThunk(
  "deleteProducts",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Request failed with status: " + response.status);
      }
      const result = response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const ProductSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    productData:{},
    quantity: 1,
    length:0,
    loading: false,
    error: null,
  },
  reducers: {
    clearQuantity: (state) => {
      state.quantity = 1;
    },
    increment: (state) => {
      state.quantity += 1;
    },
    decrement: (state) => {
      state.quantity -= 1;
    },
    clearLength: (state) => {
      state.length = 0;
    },
    addLength: (state) => {
      state.length += 1;
    },
    setProduct: (state, action) => {
      state.productData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(createProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(createProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(updateProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProducts.fulfilled, (state, action) => {
        state.loading = false;

        const updatedCartIndex = state.products.findIndex(
          (product) => product._id === action.payload._id
        );

        if (updatedCartIndex !== -1) {
          state.products[updatedCartIndex] = action.payload;
        } else {
          state.products.push(action.payload);
        }
      })

      .addCase(updateProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        console.log("this is state.error", state.error);
      })
      .addCase(deleteProducts.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteProducts.fulfilled, (state, action) => {
        state.loading = false;
        const deletedProductsId = action.payload && action.payload._id;

        if (deletedProductsId) {
          // Filter out the deleted cart item from the current state
          state.carts = state.products.filter(
            (product) => product._id !== deletedProductsId
          );
        }
      })

      .addCase(deleteProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});
export const { increment, decrement, clearQuantity, clearLength, addLength, setProduct } =
  ProductSlice.actions;
export default ProductSlice.reducer;