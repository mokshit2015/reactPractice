import { useNavigate } from "react-router";
import Navbar from "../Navbar";
import { FaChevronLeft } from "react-icons/fa";
import mobileImg from "../../assets/images/mobile.png";

const CartDesign = ({
  cartproduct,
  handleDecreaseQuantity,
  handleIncreaseQuantity,
  handleRemoveItem,
  total,
  discountAmt,
  discountCode,
  setDiscountCode,
  isDiscount,
  handleDiscount,
  handleView,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div>
        <div className="w-full h-full bg-black " id="chec-div">
          <div className="w-full absolute z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700">
            <div className="flex md:flex-row flex-col justify-center" id="cart">
              <div
                className="lg:w-1/2 w-full md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-2 bg-white overflow-y-auto overflow-x-hidden h-screen"
                id="scroll"
              >
                <div style={{ marginLeft: "-10px" }}>
                  <div
                    className="ml-5 flex items-center text-gray-500 hover:text-gray-600 cursor-pointer"
                    onClick={() => navigate(-1)}
                  >
                    <FaChevronLeft /> <p> Back</p>
                  </div>
                </div>
                <p className="text-5xl font-black font-headings leading-10 text-blue-900 pt-4 mb-0">
                  Cart
                </p>
                {cartproduct && cartproduct.length > 0 ? (
                  cartproduct.map((item) => {
                    return (
                      <div
                        className="md:flex items-center mt-14 py-8 border-t border-gray-200"
                        key={item.productId}
                      >
                        <div
                          className="w-1/4 cursor-pointer"
                          onClick={() => handleView(item.productId)}
                        >
                          <img
                            src={mobileImg}
                            alt={"Mobile"}
                            className="w-full max-h-40 object-center object-cover"
                          />
                        </div>
                        <div className="md:pl-3 md:w-3/4">
                          <p className="text-xs leading-3 text-blue-900 md:pt-0 pt-4">
                            {item?.productName}
                          </p>
                          <div className="flex items-center justify-between w-full pt-1 cursor-pointer">
                            <div className="product-number-input h-10 w-32 mt-5">
                              <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                                <button
                                  data-action="decrement"
                                  className="rounded-full px-3 py-1.5 text-xl text-center bg-secondary-300"
                                  onClick={(e) =>
                                    handleDecreaseQuantity(
                                      item.productId,
                                      item.quantity,
                                      e
                                    )
                                  }
                                >
                                  <span className="font-extrabold">−</span>
                                </button>
                                <input
                                  type="number"
                                  className="outline-none border-none focus:outline-none text-center w-full"
                                  name="custom-input-number"
                                  disabled={true}
                                  value={item.quantity}
                                ></input>
                                <button
                                  data-action="increment"
                                  className="rounded-full px-3 py-1.5 text-xl text-center bg-secondary-300"
                                  onClick={(e) =>
                                    handleIncreaseQuantity(
                                      item.productId,
                                      item.quantity,
                                      item.maxPurcahseQty,
                                      e
                                    )
                                  }
                                >
                                  <span className="m-auto font-extrabold">
                                    +
                                  </span>
                                </button>
                              </div>
                            </div>
                          </div>
                          <p className="text-xs leading-3 text-gray-600 pt-2 font-paragraphs">
                            {item?.description}
                          </p>
                          <div className="flex items-center justify-between pt-5 pr-6">
                            <div className="flex itemms-center">
                              <p
                                onClick={() => handleRemoveItem(item)}
                                className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer"
                              >
                                Remove
                              </p>
                            </div>
                            <p className="text-base font-black leading-none text-blue-900">
                              ${item?.price}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <>
                    <div className="m-5 flex justify-center"> Empty Cart </div>
                  </>
                )}
              </div>
              <div className="xl:w-1/2 md:w-1/3  w-full bg-secondary-100 h-full">
                <div className="flex flex-col md:h-screen px-14 py-8 justify-between overflow-y-auto">
                  <div>
                    <div className="flex items-center pb-6 justify-between lg:pt-5 pt-10 font-headings">
                      <p className="text-2xl font-extrabold  leading-normal text-blue-900">
                        Total
                      </p>
                      <p className="text-2xl font-extrabold  leading-normal text-right text-blue-900">
                        ${total}
                      </p>
                    </div>
                    <div className="flex items-center pb-6 justify-between lg:pt-5 pt-10 font-headings">
                      <p className="text-2xl font-extrabold  leading-normal text-blue-900">
                        Discount
                      </p>
                      <p className="text-2xl font-extrabold  leading-normal text-right text-blue-900">
                        ${discountAmt}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <input
                      type="text"
                      value={discountCode}
                      placeholder="Enter Promocode Here..."
                      className="w-8/12 shadow appearance-none border-2 border-gray-200 rounded placeholder-gray-500 placeholder-opacity-75  py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                      onChange={(e) => setDiscountCode(e.target.value)}
                    />
                    <button
                      disabled={isDiscount || discountCode === ""}
                      className="w-3/12 flex items-center justify-center rounded-3xl disabled:cursor-not-allowed bg-blue-700 hover:bg-white border-2 hover:border-blue-500 hover:text-blue-700 text-white p-3 m-6 ml-4 mr-4"
                      onClick={handleDiscount}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDesign;
