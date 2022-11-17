import React from "react";
import { useLocation } from "react-router-dom";
import AdminForm from "../components/form/AdminForm";

const AdminControlPage = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname === "/admin/add-product" ? (
        <AdminForm formEdit={{ role: "Product" }} />
      ) : (
        <AdminForm formEdit={{ role: "Topping" }} />
      )}
    </>
  );
};

export default AdminControlPage;
