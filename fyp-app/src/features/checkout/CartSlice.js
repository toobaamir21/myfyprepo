import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';

export const fetchCart = createAsyncThunk(
  "fetchCart",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `/api/cart/getcart?user=${id}`
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

export const createCart = createAsyncThunk(
  "createCart",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/cart/createcart", {
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


export const updateCart = createAsyncThunk(
  "updateCart",
  async (data, { rejectWithValue }) => {
    try {
      console.log(`this is data ${data} and this is id ${data.id}`);
      const response = await fetch(`/api/cart/updatecart/${data.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log("this is the response in cartslice", response);
      if (!response.ok) {
        throw new Error("Request failed with status: " + response.status);
      }

      const updatedCart = await response.json();
      console.log("this is updatedCart",updatedCart);

      if (updatedCart.quantity > updatedCart.product.quantity) {
      
        updatedCart.quantity = updatedCart.product.quantity;
         console.log("this is newupdatedCart", updatedCart);
          return updatedCart;
      }

      return updatedCart;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteCart = createAsyncThunk(
  "deleteCart",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/cart/deletecart/${id}`, {
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

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    carts: [],
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.carts = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(createCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCart.fulfilled, (state, action) => {
        state.loading = false;
        state.carts.push(action.payload);
      })
      .addCase(createCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(updateCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.loading = false;

        const updatedCartIndex = state.carts.findIndex(
          (cart) => cart._id === action.payload._id
        );

        if (updatedCartIndex !== -1) {
          state.carts[updatedCartIndex] = action.payload;
        } else {
          state.carts.push(action.payload);
        }
      })

      .addCase(updateCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        console.log("this is state.error", state.error);
      })
      .addCase(deleteCart.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteCart.fulfilled, (state, action) => {
        state.loading = false;
        const deletedItemId = action.payload && action.payload._id;

        if (deletedItemId) {
          // Filter out the deleted cart item from the current state
          state.carts = state.carts.filter(
            (cart) => cart._id !== deletedItemId
          );
        }
      })

      .addCase(deleteCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});
export const { increment, decrement, clearQuantity, clearLength, addLength } =
  CartSlice.actions;
export default CartSlice.reducer;