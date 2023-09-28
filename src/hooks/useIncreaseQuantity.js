import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { increaseCartItemQuantity } from "../actions/cart.action";

const useIncreaseQuantity = () => {
  const dispatch = useDispatch();

  const increaseQuantity = (id, quantity, maxQty) => {
    if (maxQty > quantity) {
      dispatch(increaseCartItemQuantity({ id: id }));
    } else {
      toast.error("Maximum Quantity Exceeded");
    }
  };

  return increaseQuantity;
};

export default useIncreaseQuantity;
