import React from "react";
import mobileImg from "../../assets/images/mobile.png";
import { FaChevronLeft, FaShoppingCart } from "react-icons/fa";
import Navbar from "../Navbar";
import { useNavigate } from "react-router";

function ProductDetailDesign({
  productData,
  cartproduct,
  productCount,
  inventoryData,
  handleIncrementCount,
  handleDecrementCount,
  handleAddToCart,
}) {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div
        className="ml-5 flex items-center text-gray-500 hover:text-gray-600 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <FaChevronLeft /> <p> Back</p>
      </div>
      <div className="grid  md:grid-cols-2  sm:grid-cols-1 xs:grid-cols-1">
        <div className="p-5">
          <img
            alt="Mobile"
            src={mobileImg}
            className="w-8/12 h-auto flex justify-center"
          />
        </div>
        <div className="p-5">
          <div className="flex justify-between">
            <h3 className="font-extrabold text-2xl font-headings">
              {productData.productName}
            </h3>
          </div>
          <div className="mt-3 font-paragraphs">{productData.description}</div>
          <div className="mt-5 text-blue-500 font-extrabold">
            ${productData.price}
          </div>
          <div className="product-number-input h-10 w-32 mt-5">
            <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
              <button
                data-action="decrement"
                className="rounded-full px-3 py-1.5 text-xl text-center bg-secondary-300"
                onClick={handleDecrementCount}
              >
                <span className="font-extrabold">−</span>
              </button>
              <input
                type="number"
                className="outline-none border-none focus:outline-none text-center w-full"
                name="custom-input-number"
                disabled={true}
                value={productCount}
              ></input>
              <button
                data-action="increment"
                className="rounded-full px-3 py-1.5 text-xl text-center bg-secondary-300"
                onClick={handleIncrementCount}
              >
                <span className="m-auto font-extrabold">+</span>
              </button>
            </div>
          </div>
          <div className="w-full md:mt-36 sm:mt-5 xs:mt-5">
            {productCount <= Number(inventoryData[productData.productId]) ? (
              <button
                className="w-4/12 rounded-3xl bg-blue-700 hover:bg-white border-2 hover:border-blue-500 hover:text-blue-700 text-white p-3 m-6 ml-4 mr-4"
                onClick={() => handleAddToCart(productData)}
              >
                <span className="flex justify-center items-center font-extrabold ">
                  {cartproduct &&
                  cartproduct.length > 0 &&
                  cartproduct.find(
                    (item) => item.productId === productData.productId
                  )
                    ? "Added to Cart"
                    : "Add to Cart"}
                  <span className="ml-2">
                    <FaShoppingCart />
                  </span>
                </span>
              </button>
            ) : (
              <button className="opacity-50 rounded-3xl bg-blue-500  border-2 text-white p-3 m-6 ml-4 mr-4">
                <span className="flex justify-center items-center font-extrabold">
                  Out of Stock
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetailDesign;
