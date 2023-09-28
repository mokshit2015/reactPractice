import { useDispatch } from "react-redux";
import {
  decreaseCartItemQuantity,
  removeCartItem,
} from "../actions/cart.action";

const useDecreaseQuantity = () => {
  const dispatch = useDispatch();

  const decreaseQuantity = (id, quantity) => {
    if (quantity > 1) {
      dispatch(decreaseCartItemQuantity({ id: id }));
    } else if (quantity === 1) {
      dispatch(removeCartItem(id));
    }
  };

  return decreaseQuantity;
};

export default useDecreaseQuantity;
