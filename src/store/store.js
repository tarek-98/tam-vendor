import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import searchReducer from "./searchSlice";
import favSlice from "./favorite-slice";
import commentsSlice from "./commentSlice";
import usersSlice from "./usersSlice";
import AddressSlice from "./AddressSlice";
import authReducer from "./authSlice";
import addProductReducer from "./addProductSlice";
import shippingReducer from "./shippingSlice";
import { loadState, saveState } from "../utils/localStorage";
import ordersSlice from "./ordersSlice";
import couponsSlice from "./couponsSlice";
import notificationsReducer from "./notificationSlice";
import tabbySlice from "./tabbySlice";
import walletReducer from "./walletSlice";
import vendorSlice from "./vendorSlice";
import chatReducer from "./chatSlice";
import reviewsReducer from "./reviewSlice";

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    address: AddressSlice,
    category: categoryReducer,
    product: productReducer,
    cart: cartReducer,
    search: searchReducer,
    favorite: favSlice,
    users: usersSlice,
    vendor: vendorSlice,
    comments: commentsSlice,
    auth: authReducer,
    addProduct: addProductReducer,
    orders: ordersSlice,
    coupons: couponsSlice,
    shipping: shippingReducer,
    payments: tabbySlice,
    notifications: notificationsReducer,
    wallet: walletReducer,
    chat: chatReducer,
    reviews: reviewsReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState({
    auth: store.getState().auth,
  });
});

export default store;
