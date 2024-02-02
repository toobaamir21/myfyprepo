import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchReview = createAsyncThunk(
  "fetchReview",
  async (picId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/review/getreview?product=${picId}`);
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

export const createReview = createAsyncThunk(
  "createReview",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/review/createreview", {
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

export const updateReview = createAsyncThunk(
  "updateReview",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/review/updatereview/${data.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
     
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

export const deleteReview = createAsyncThunk(
  "deleteReview",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/review/deletereview/${id}`, {
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

export const ReviewSlice = createSlice({
  name: "review",
  initialState: {
    reviews: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearReviews: (state) => {
      state.reviews = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(createReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews.push(action.payload);
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(updateReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.loading = false;

        const updatedReviewIndex = state.reviews.findIndex(
          (review) => review._id === action.payload._id
        );

        if (updatedReviewIndex !== -1) {
          state.reviews[updatedReviewIndex] = action.payload;
        } else {
          state.reviews.push(action.payload);
        }
      })

      .addCase(updateReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        console.log("this is state.error", state.error);
      })
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteReview.fulfilled, (state, action) => {
        state.loading = false;
        const deletedItemId = action.payload && action.payload._id;

        if (deletedItemId) {
          // Filter out the deleted cart item from the current state
          state.reviews = state.reviews.filter(
            (review) => review._id !== deletedItemId
          );
        }
      })

      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});
export const { clearReviews } = ReviewSlice.actions;

export default ReviewSlice.reducer;
