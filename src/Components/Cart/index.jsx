import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeCartItem } from "../../actions/cart.action";
import discountCoupans from "../../Utils/discount.json";
import CartDesign from "./CartDesign";
import useIncreaseQuantity from "../../hooks/useIncreaseQuantity";
import useDecreaseQuantity from "../../hooks/useDecreaseQuantity";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { setCartDataInStorage } from "../../Utils/common";

const CartDisplay = () => {
  const [total, setTotal] = useState(0);
  const [updateQty, setUpdateQty] = useState(false);
  const [discountCode, setDiscountCode] = useState(null);
  const [isDiscount, setIsDiscount] = useState(false);
  const [discountAmt, setDiscountAmt] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartproduct = useSelector((state) => state.cart);

  const increaseQuantity = useIncreaseQuantity();
  const decreaseQuantity = useDecreaseQuantity();

  useEffect(() => {
    if (cartproduct && cartproduct.length > 0) {
      setCartDataInStorage(cartproduct);
      const amt = cartproduct.reduce((accumulator, object) => {
        return accumulator + object.price * object.quantity;
      }, 0);
      if (isDiscount) {
        setDiscountAndTotal(amt, discountCode);
      } else {
        setTotal(amt);
      }
    } else {
      setTotal(0);
      setDiscountAmt(0);
      setIsDiscount(false);
      setDiscountCode("");
    }
  }, [cartproduct, updateQty, isDiscount]);

  const setDiscountAndTotal = (amt, discountCode) => {
    const data = discountCoupans.find(
      (code) => code.name === discountCode && code.discount
    );
    const percent = data?.discount ? Number(data.discount / 100) : 0.1;

    const discountAmt = amt * percent;
    if (discountAmt > 2000) {
      setDiscountAmt(2000);
      setTotal(Number(amt - 2000));
    } else {
      setDiscountAmt(discountAmt);
      setTotal(amt - discountAmt);
    }
  };

  const handleIncreaseQuantity = (id, quantity, maxQty, e) => {
    e.stopPropagation();
    increaseQuantity(id, quantity, maxQty);
    setUpdateQty(!updateQty);
  };

  const handleDecreaseQuantity = (id, quantity, e) => {
    e.stopPropagation();
    decreaseQuantity(id, quantity);
    setUpdateQty(!updateQty);
  };

  const handleDiscount = () => {
    let apply = false;
    if (discountCode) {
      discountCoupans.forEach((code) => {
        const { name } = code;
        if (name === discountCode) {
          setIsDiscount(true);
          setDiscountAndTotal(total, discountCode);
          toast.success(`${discountCode} Discount Code Applied`);
          apply = true;
          return true;
        }
      });
      if (!apply) {
        toast.error(`${discountCode} - Code Invalid! `);
      }
    } else {
      toast.error(`Please Enter Discount Code`);
    }
  };

  const handleRemoveItem = (product) => {
    dispatch(removeCartItem(product.productId));
  };

  const handleView = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <CartDesign
      cartproduct={cartproduct}
      handleDecreaseQuantity={handleDecreaseQuantity}
      handleIncreaseQuantity={handleIncreaseQuantity}
      handleRemoveItem={handleRemoveItem}
      total={total}
      discountAmt={discountAmt}
      discountCode={discountCode}
      setDiscountCode={setDiscountCode}
      isDiscount={isDiscount}
      handleDiscount={handleDiscount}
      handleView={handleView}
    />
  );
};

export default CartDisplay;
