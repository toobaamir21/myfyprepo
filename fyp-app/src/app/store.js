import { configureStore } from "@reduxjs/toolkit";
import prodSlice from "../features/product/ProdSlice";
import CategorySlice from "../features/category/CategorySlice";
import CartSlice from "../features/checkout/CartSlice";
import UserSlice from "../features/users/UserSlice";
import ReviewSlice from "../features/review/ReviewSlice";
import ProductSlice from "../features/artist/product/Artistproduct"
export const store = configureStore({
  reducer: {
    app: prodSlice,
    category: CategorySlice,
    cart:CartSlice,
    user:UserSlice,
    review:ReviewSlice,
    product: ProductSlice,
  },
});