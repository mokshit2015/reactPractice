import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import allProductData from "../../Utils/products.json";
import inventoryData from "../../Utils/inventory.json";
import ProductDetailDesign from "./ProductDetailDesign";
import { addCartItem } from "../../actions/cart.action";
import { setCartDataInStorage } from "../../Utils/common";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const [productId, setProductId] = useState(null);
  const [productData, setProductData] = useState([]);
  const [productCount, setProductCount] = useState(1);

  const dispatch = useDispatch();
  const params = useParams();

  const cartproduct = useSelector((state) => state.cart);

  useEffect(() => {
    if (params) {
      const id = params.id;
      setProductId(id);
    }
  }, [params]);

  useEffect(() => {
    if (cartproduct && cartproduct.length > 0) {
      setCartDataInStorage(cartproduct);
    }
  }, [cartproduct]);

  useEffect(() => {
    if (productId) {
      getProductDetails();
    }
  }, [productId]);

  const handleIncrementCount = () => {
    setProductCount(productCount + 1);
  };

  const handleDecrementCount = () => {
    if (productCount === 0) {
      setProductCount(0);
    } else {
      setProductCount(productCount - 1);
    }
  };

  const getProductDetails = () => {
    const findProduct = allProductData.find(
      (product) => product.productId === Number(productId)
    );

    if (findProduct) {
      setProductData(findProduct);
    }
  };

  const handleAddToCart = (product) => {
    if (productCount > 0) {
      dispatch(addCartItem(product, productCount));
    } else {
      toast.error("Please Select Proper Quantity");
    }
  };

  return (
    <ProductDetailDesign
      cartproduct={cartproduct}
      productData={productData}
      productCount={productCount}
      inventoryData={inventoryData}
      handleIncrementCount={handleIncrementCount}
      handleDecrementCount={handleDecrementCount}
      handleAddToCart={handleAddToCart}
    />
  );
};

export default ProductDetail;
