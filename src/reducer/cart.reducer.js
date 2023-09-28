import inventoryData from "../Utils/inventory.json";
import { toast } from "react-toastify";
import {
  ADD_TO_CART,
  DECREASE_CART_ITEM_QUANTITY,
  INCREASE_CART_ITEM_QUANTITY,
  REMOVE_FROM_CART,
  SET_CART_ITEM_FROM_STORAGE,
} from "../Utils/constant";
import { setCartDataInStorage } from "../Utils/common";

const cartReducer = (state = [], action) => {
  let done = false;
  switch (action.type) {
    case ADD_TO_CART:
      state.forEach((item, index) => {
        if (item.productId === action.payload.productId) {
          done = true;
          if (item.quantity >= inventoryData[item.productId]) {
            toast.error("Out of Stock! You can't add this product");
          } else if (item.maxPurcahseQty <= item.quantity) {
            toast.error(
              `You can not add more than maximum purchase quantity ${item.maxPurcahseQty}`
            );
          } else {
            state[index].quantity = state[index].quantity + action.quantity;
          }
          return state;
        }
      });
      if (!done) {
        const obj = [
          ...state,
          {
            ...action.payload,
            quantity: action.quantity,
          },
        ];
        return obj;
      }
      return state;

    case REMOVE_FROM_CART:
      const data = state.filter((item) => item.productId !== action.payload);
      setCartDataInStorage(data);
      return data;

    case SET_CART_ITEM_FROM_STORAGE:
      return [...action.payload];

    case INCREASE_CART_ITEM_QUANTITY:
      state.forEach((item, index) => {
        if (item.productId === action.payload.id) {
          let qty = item.quantity;
          if (item.quantity >= inventoryData[item.productId]) {
            toast.error("Out of Stock! You can't add this product");
          } else if (item.maxPurcahseQty <= item.quantity) {
            toast.error(
              `You can not add more than maximum purchase quantity ${item.maxPurcahseQty}`
            );
          } else {
            qty = Number(state[index].quantity) + 1;
          }
          state[index].quantity = qty;
          return state;
        }
      });
      return state;

    case DECREASE_CART_ITEM_QUANTITY:
      state.forEach((item, index) => {
        if (item.productId === action.payload.id) {
          state[index].quantity = state[index].quantity - 1;
          return state;
        }
      });
      return state;

    default:
      return state;
  }
};

export default cartReducer;
