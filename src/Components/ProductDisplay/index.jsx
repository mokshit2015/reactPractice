import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "../../actions/cart.action";
import productData from "../../Utils/products.json";
import inventoryData from "../../Utils/inventory.json";
import ProductDesign from "./ProductDesign";
import { useNavigate } from "react-router";
import { setCartDataInStorage } from "../../Utils/common";

function ProductDisplay() {
  const [isGridView, setIsGridView] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartproduct = useSelector((state) => state.cart);

  useEffect(() => {
    if (cartproduct && cartproduct.length > 0) {
      setCartDataInStorage(cartproduct);
    }
  }, [cartproduct]);

  const handleAddToCart = (product) => {
    dispatch(addCartItem(product));
    getItemAlert(product.productId);
  };

  const handleGridView = (isGridView) => {
    setIsGridView(isGridView);
  };

  const handleView = (id) => {
    navigate(`/product/${id}`);
  };

  const getProduct = (id) => cartproduct.find((item) => item.productId === id);

  const getCartButtonName = (id) => {
    if (cartproduct && cartproduct.length > 0) {
      const found = getProduct(id);
      if (found) {
        return `Added to Cart`;
      } else {
        return "Add to Cart";
      }
    } else {
      return "Add to Cart";
    }
  };

  const getItemAlert = (id) => {
    if (cartproduct && cartproduct.length > 0) {
      const found = getProduct(id);
      if (found) {
        const cnt = Number(inventoryData[id]) - found.quantity;
        if (cnt <= 0) {
          return "Out of Stock!!!";
        } else if (cnt <= 2) {
          return `only few items left now!`;
        }
      } else {
        return "";
      }
    }
  };

  const getQuantity = (id) => {
    const found = getProduct(id);
    return found ? found.quantity : 0;
  };

  return (
    <ProductDesign
      productData={productData}
      isGridView={isGridView}
      getCartButtonName={getCartButtonName}
      handleAddToCart={handleAddToCart}
      handleGridView={handleGridView}
      handleView={handleView}
      getItemAlert={getItemAlert}
      inventoryData={inventoryData}
      getQuantity={getQuantity}
    />
  );
}

export default ProductDisplay;
