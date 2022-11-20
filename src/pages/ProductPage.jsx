import React, { useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

import check from "../assets/icons/green-check.svg";
const ProductPage = () => {
  const navigate = useNavigate();

  let getProductURL = useLocation();
  let getProductId = parseInt(getProductURL.pathname.replace(/\D/g, ""));

  const localData = localStorage.getItem("LOGIN_STATUS");
  const data = JSON.parse(localData);
  let getLogin = data;

  const Product = [];
  const getProduct = () => {
    if (typeof Storage === "undefined") {
      alert("cant store user");
    }

    const localData = localStorage.getItem("DATA_PRODUCT");
    let data = JSON.parse(localData);

    if (data !== null) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].itemid === getProductId) {
          Product.push(data[i]);
        }
      }
    }
  };

  const Toppings = [];
  const getToppings = () => {
    if (typeof Storage === "undefined") {
      alert("cant store user");
    }

    const localData = localStorage.getItem("DATA_TOPPING");
    let data = JSON.parse(localData);

    if (data !== null) {
      for (let i = 0; i < data.length; i++) {
        Toppings.push(data[i]);
      }
    }
  };

  const [toppingCheck, setToppingCheck] = useState([]);
  const [toppingPrice, setToppingPrice] = useState(0);

  getProduct();
  getToppings();

  const handleChecked = (id, price) => {
    let filterID = toppingCheck.filter((e) => e === id);
    if (filterID[0] !== id) {
      setToppingCheck([...toppingCheck, id]);
      setToppingPrice(toppingPrice + price);
    } else {
      setToppingCheck(toppingCheck.filter((e) => e !== id));
      setToppingPrice(toppingPrice - price);
    }
  };

  let formater = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  const dataCart = [];
  const getCartUser = () => {
    if (typeof Storage === "undefined") {
      alert("cant store user");
    }

    const localData = localStorage.getItem(`DATA_CART_${getLogin[0].id}`);
    let data = JSON.parse(localData);

    if (data !== null) {
      for (let i = 0; i < data.length; i++) {
        dataCart.push(data[i]);
      }
    }
  };

  const saveCartUser = () => {
    let currentProduct = {
      cartid: +new Date(),
      itemid: Product[0].itemid,
      topping: toppingCheck,
      total: Product[0].itemprice + toppingPrice,
      isPaid: false,
    };

    dataCart.push(currentProduct);
    const parsed = JSON.stringify(dataCart);
    localStorage.setItem(`DATA_CART_${getLogin[0].id}`, parsed);
  };

  const handleOnSubmit = () => {
    getCartUser();
    saveCartUser();
    navigate("/cart");
  };
  return (
    <>
      {!!getLogin === false ? (
        <Container>
          <h1>Please Login</h1>
        </Container>
      ) : (
        <Container>
          <Row className="my-3 mx-5">
            <Col className="col-4">
              <img
                src={Product[0].itemimage}
                alt=""
                className="image-product rounded-4"
              />
            </Col>
            <Col className="col-8 d-flex flex-column gap-2">
              <Col className="col-12">
                <h2 className="fw-bold color-red">{Product[0].itemname}</h2>
                <p className="color-red fs-5">
                  {formater.format(Product[0].itemprice)}
                </p>
              </Col>
              <Col className="col-12">
                <h4 className="fw-bold color-red">Topping</h4>
                <Row>
                  {Toppings.map((item, index) => (
                    <Col key={index} className="col-12 col-md-3 my-1">
                      <Card
                        className="cursor-pointer align-items-center toppinglist-card position-relative"
                        onClick={() =>
                          handleChecked(item.itemid, item.itemprice)
                        }
                      >
                        <Card.Img
                          src={item.itemimage}
                          className="toppinglist-image"
                        />
                        {toppingCheck.filter(
                          (element) => element === item.itemid
                        )[0] === item.itemid ? (
                          <Card.Img src={check} className="checked" />
                        ) : (
                          <></>
                        )}

                        <Card.Body className="d-flex flex-column align-items-center p-1">
                          <Card.Title className="fs-7">
                            {item.itemname}
                          </Card.Title>
                          <Card.Subtitle className="fs-7">
                            {formater.format(item.itemprice)}
                          </Card.Subtitle>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Col>
              <Col className="col-12">
                <Row className="my-3">
                  <Col className="col-6">
                    <h3 className="fw-bold color-red">Total</h3>
                  </Col>
                  <Col className="col-6">
                    <h3 className="fw-bold color-red text-end">
                      {formater.format(Product[0].itemprice + toppingPrice)}
                    </h3>
                  </Col>
                </Row>
                <Row className="my-3">
                  <Button
                    className="btn btn-danger btn-main btn-form col-12"
                    onClick={handleOnSubmit}
                  >
                    Add Cart
                  </Button>
                </Row>
              </Col>
            </Col>
            ;
          </Row>
        </Container>
      )}
    </>
  );
};
export default ProductPage;
