import storage from "redux-persist/lib/storage";

export const setCartDataInStorage = (cart) => {
  storage.setItem("cart", JSON.stringify(cart));
};
