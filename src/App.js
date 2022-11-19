import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// PAGES
import Navbars from "./components/ui/Navbars";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import AdminControlPage from "./pages/AdminControlPage";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <BrowserRouter>
      <Navbars />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/add-product" element={<AdminControlPage />} />
        <Route path="/admin/add-topping" element={<AdminControlPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
