import mobileImg from "../../assets/images/mobile.png";
import { FaListUl, FaShoppingCart, FaTh } from "react-icons/fa";
import Navbar from "../Navbar";

function ProductDesign({
  productData,
  isGridView,
  getCartButtonName,
  handleAddToCart,
  handleGridView,
  handleView,
  getItemAlert,
  inventoryData,
  getQuantity,
}) {
  const renderGridView = () => {
    return (
      <div className="w-full grid md:grid-cols-4 xs:grid-cols-1 content-center p-5">
        {productData &&
          productData.length > 0 &&
          productData.map((product) => {
            return (
              <div className=" items-center p-3" key={product.productId}>
                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                  <img
                    alt="Mobile"
                    src={mobileImg}
                    className="w-full max-h-96"
                  />

                  <div
                    onClick={() => handleView(product.productId)}
                    className="px-6 py-4 flex justify-between cursor-pointer"
                  >
                    <div>
                      <div className="font-bold text-xl mb-2 font-headings">
                        {product.title}
                      </div>
                      <p className="text-gray-700 text-base font-paragraphs">
                        {product.description}
                      </p>
                    </div>
                    <div className="text-black font-extrabold text-xl">
                      ${product.price}
                    </div>
                  </div>
                  <div className="text-md w-full text-red-500 flex justify-start mb-1 ml-5">
                    {getItemAlert(product.productId)}
                  </div>
                  <div className="flex justify-between">
                    {inventoryData[product.productId] > 0 &&
                    getQuantity(product.productId) <=
                      inventoryData[product.productId] ? (
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-11/12 flex items-center justify-center rounded-3xl bg-blue-700 hover:bg-white border-2 hover:border-blue-500 hover:text-blue-700 text-white p-3 m-6 ml-4 mr-4"
                      >
                        {getCartButtonName(product.productId)}
                        <span className="ml-2">
                          <FaShoppingCart />
                        </span>
                      </button>
                    ) : (
                      <button
                        disabled={true}
                        className="w-11/12 flex items-center justify-center disabled:opacity-50 rounded-3xl bg-blue-700 hover:bg-white border-2 hover:border-blue-500 hover:text-blue-700 text-white p-3 m-6 ml-4 mr-4"
                      >
                        Out of Stock!
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    );
  };

  const renderListView = () => {
    return (
      <div className="p-5">
        {productData &&
          productData.length > 0 &&
          productData.map((product) => {
            return (
              <div
                className="border flex flex-row justify-between rounded p-3 mb-4"
                key={product.productId}
              >
                <div className="w-4/12 flex justify-center items-center">
                  <img
                    alt="Mobile"
                    src={mobileImg}
                    className="w-full max-w-sm max-h-96 flex justify-center items-center"
                  />
                </div>
                <div className="w-8/12 flex flex-col justify-between">
                  <div
                    onClick={() => handleView(product.productId)}
                    className="px-6 py-4 flex flex-col justify-between cursor-pointer"
                  >
                    <div>
                      <div className="font-bold text-xl mb-2 font-headings">
                        {product.title}
                      </div>
                      <p className="text-gray-700 text-base font-paragraphs">
                        {product.description}
                      </p>
                    </div>
                    <div className="text-black font-extrabold text-xl">
                      ${product.price}
                    </div>
                  </div>
                  <div className="text-md w-full text-red-500 flex justify-start mb-1 ml-5">
                    {getItemAlert(product.productId)}
                  </div>
                  <div className="flex justify-between w-8/12 items-center">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-11/12 flex items-center justify-center rounded-3xl bg-blue-700 hover:bg-white border-2 hover:border-blue-500 hover:text-blue-700 text-white p-3 m-6 ml-4 mr-4"
                    >
                      {getCartButtonName(product.productId)}
                      <span className="ml-2">
                        <FaShoppingCart />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-end m-4">
        <button className=" border rounded">
          <div className="flex">
            <FaListUl
              className={`m-2 ${
                !isGridView ? " text-blue-500" : "text-gray-700"
              }`}
              onClick={() => handleGridView(false)}
            />
            <FaTh
              className={`m-2 ${
                isGridView ? " text-blue-500" : "text-gray-700"
              }`}
              onClick={() => handleGridView(true)}
            />
          </div>
        </button>
      </div>
      {isGridView ? renderGridView() : renderListView()}
    </div>
  );
}

export default ProductDesign;
