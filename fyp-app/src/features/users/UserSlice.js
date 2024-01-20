import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const loadUserFromLocalStorage = () => {
  const storedUser = localStorage.getItem("userInfo");
  return storedUser ? JSON.parse(storedUser) : null;
};

export const confirmEmail = createAsyncThunk(
  "fetchUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(`api/users/confirmemail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Request failed with status: " + response.status);
      }

      const result = await response.json();

    //  localStorage.setItem("userInfo", JSON.stringify(result));

      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const registration = createAsyncThunk(
  "registration",
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/users/verifyemail/:${token}`);
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
      const result = await response.json();
      localStorage.setItem("userInfo", JSON.stringify(result));
      return result;
    } catch (error) {
      return rejectWithValue({ message: error.message });
    }
  }
);

export const authUser = createAsyncThunk(
  "authUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/users/authuser", {
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

      // Store user info in local storage
      localStorage.setItem("userInfo", JSON.stringify(result));
      return result;
    } catch (error) {
      return rejectWithValue({ message: error.message });
    }
  }
);

export const UserSlice = createSlice({
  name: "user",
  initialState: {
    user: loadUserFromLocalStorage(),
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(confirmEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(confirmEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(confirmEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      .addCase(authUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(authUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default UserSlice.reducer;
