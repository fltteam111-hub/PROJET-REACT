import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

store.subscribe(() => {
  const items = store.getState().cart.items;

  localStorage.setItem("panier", JSON.stringify(items));
});

export default store;
