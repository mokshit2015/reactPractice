import {
  ADD_TO_CART,
  DECREASE_CART_ITEM_QUANTITY,
  INCREASE_CART_ITEM_QUANTITY,
  REMOVE_FROM_CART,
  SET_CART_ITEM_FROM_STORAGE,
} from "../Utils/constant";

export const addCartItem = (product, quantity = 1) => {
  return (dispatch) => {
    dispatch({ type: ADD_TO_CART, payload: product, quantity });
  };
};

export const removeCartItem = (id) => {
  return (dispatch) => {
    dispatch({ type: REMOVE_FROM_CART, payload: id });
  };
};

export const setCartItemFromStorage = (data) => {
  return (dispatch) => {
    dispatch({ type: SET_CART_ITEM_FROM_STORAGE, payload: data });
  };
};

export const increaseCartItemQuantity = (id) => {
  return (dispatch) => {
    dispatch({ type: INCREASE_CART_ITEM_QUANTITY, payload: id });
  };
};

export const decreaseCartItemQuantity = (id) => {
  return (dispatch) => {
    dispatch({ type: DECREASE_CART_ITEM_QUANTITY, payload: id });
  };
};
