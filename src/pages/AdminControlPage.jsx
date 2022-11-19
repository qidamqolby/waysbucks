import React from "react";
import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import AdminForm from "../components/form/AdminForm";

const AdminControlPage = () => {
  const location = useLocation();

  const localData = localStorage.getItem("LOGIN_STATUS");
  const data = JSON.parse(localData);
  let getLogin = data;

  return (
    <>
      {!!getLogin === false || getLogin[0].role === "user" ? (
        <Container>
          <h1>Please Login</h1>
        </Container>
      ) : (
        <>
          {location.pathname === "/admin/add-product" ? (
            <AdminForm formEdit={{ role: "Product" }} />
          ) : (
            <AdminForm formEdit={{ role: "Topping" }} />
          )}
        </>
      )}
    </>
  );
};

export default AdminControlPage;
