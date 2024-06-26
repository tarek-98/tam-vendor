import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import searchReducer from "./searchSlice";
import favSlice from "./favorite-slice";
import vendorsSlice from "./vendorsSlice";
import commentsSlice from "./commentSlice";
import usersSlice from "./usersSlice";
import AddressSlice from "./AddressSlice";
import authReducer from "./authSlice";
import shippingReducer from "./shippingSlice";
import { loadState, saveState } from "../utils/localStorage";
import ordersSlice from "./ordersSlice";
import couponsSlice from "./couponsSlice";
import notificationsReducer from "./notificationSlice";
import tabbySlice from "./tabbySlice";

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    address: AddressSlice,
    category: categoryReducer,
    product: productReducer,
    cart: cartReducer,
    search: searchReducer,
    favorite: favSlice,
    vendors: vendorsSlice,
    users: usersSlice,
    comments: commentsSlice,
    auth: authReducer,
    orders: ordersSlice,
    coupons: couponsSlice,
    shipping: shippingReducer,
    payments: tabbySlice,
    notifications: notificationsReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState({
    auth: store.getState().auth,
  });
});

export default store;
