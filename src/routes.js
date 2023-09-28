import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import Cart from "./Components/Cart/";
import ProductDetail from "./Components/ProductDetail";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/" element={<App />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
