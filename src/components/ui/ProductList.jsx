import React, { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import LoginForm from "../form/LoginForm";
import RegisterForm from "../form/RegisterForm";

const ProductList = ({ getLogin }) => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const Products = [];
  const getProducts = () => {
    if (typeof Storage === "undefined") {
      alert("cant store user");
    }

    const localData = localStorage.getItem("DATA_PRODUCT");
    let data = JSON.parse(localData);

    let formater = new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    });

    if (data !== null) {
      for (let i = 0; i < data.length; i++) {
        data[i].itemprice = formater.format(data[i].itemprice);
        Products.push(data[i]);
      }
    }
  };
  getProducts();
  return (
    <Container className="my-5">
      <h2 className="fw-bold color-red">Let's Order</h2>
      <Row className="my-3">
        {Products.map((item, index) => (
          <Col key={index} className="col-12 col-md-3 my-3">
            <Card
              className="cursor-pointer"
              onClick={() =>
                !!getLogin === false
                  ? setShowLogin(true)
                  : navigate(`/product/${item.itemid}`)
              }
            >
              <Card.Img src={item.itemimage} className="productlist-image" />
              <Card.Body>
                <Card.Title className="fs-6">{item.itemname}</Card.Title>
                <Card.Subtitle>{item.itemprice}</Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <LoginForm
        show={showLogin}
        setShow={setShowLogin}
        setShowRegister={setShowRegister}
      />
      <RegisterForm
        show={showRegister}
        setShow={setShowRegister}
        setShowRegister={setShowLogin}
      />
    </Container>
  );
};

export default ProductList;
