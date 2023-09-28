import React, { useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import storage from "redux-persist/lib/storage";
import { setCartItemFromStorage } from "../actions/cart.action";

function Navbar() {
  const dispatch = useDispatch();

  const cartproduct = useSelector((state) => state.cart);

  useEffect(() => {
    if (cartproduct.length === 0) {
      storage.getItem("cart").then((res) => {
        if (res) {
          dispatch(setCartItemFromStorage(JSON.parse(res)));
        }
      });
    }
  }, []);

  return (
    <nav className="bg-transparent border-gray-200 lg:px-48 sm:px-4 py-7  dark:bg-gray-900 shadow-md mb-6">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Link to="/" className="flex items-center pl-1 md:pl-0">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Home
          </span>
        </Link>
        <div className="flex">
          <Link to="/cart" className="m-auto ml-10 text-xl">
            <FaShoppingCart />
            <span
              className={`absolute md:top-5 xs:top-2 ml-2 ${
                cartproduct.length > 0 ? "block" : "hidden"
              } rounded-full bg-red-800 w-5 h-5 top right p-[2px] m-auto mr-10 text-white text-sm  leading-tight text-center`}
            >
              {cartproduct && cartproduct.length > 0 ? cartproduct.length : ""}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
