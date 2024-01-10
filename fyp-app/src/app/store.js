import { configureStore } from "@reduxjs/toolkit";
import prodSlice from "../features/product/ProdSlice";
import CategorySlice from "../features/category/CategorySlice";
export const store = configureStore({
  reducer: {
    app: prodSlice,
    category: CategorySlice
  },
});