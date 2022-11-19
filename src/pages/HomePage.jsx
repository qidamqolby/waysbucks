import React from "react";
import { useNavigate } from "react-router-dom";

// COMPONENTS
import Jumbotron from "../components/ui/Jumbotron";
import ProductList from "../components/ui/ProductList";

const Home = () => {
  const navigate = useNavigate();
  navigate(0);

  const localData = localStorage.getItem("LOGIN_STATUS");
  const data = JSON.parse(localData);
  let getLogin = data;

  return (
    <>
      <Jumbotron />
      <ProductList getLogin={getLogin} />
    </>
  );
};

export default Home;
