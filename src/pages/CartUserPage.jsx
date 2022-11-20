import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CartUserPage = () => {
  const navigate = useNavigate();
  const localData = localStorage.getItem("LOGIN_STATUS");
  const data = JSON.parse(localData);
  let getLogin = data;

  const Products = [];
  const getProducts = () => {
    if (typeof Storage === "undefined") {
      alert("cant store user");
    }

    const localData = localStorage.getItem("DATA_PRODUCT");
    let data = JSON.parse(localData);

    if (data !== null) {
      for (let i = 0; i < data.length; i++) {
        Products.push(data[i]);
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

  let dataCart = [];
  const getCartData = () => {
    let data;
    if (!!getLogin !== false) {
      data = JSON.parse(localStorage.getItem(`DATA_CART_${getLogin[0].id}`));
    }

    if (!!data !== false) {
      for (let i = 0; i < data.length; i++) {
        dataCart.push(data[i]);
      }
    }
  };
  getCartData();
  getProducts();
  getToppings();

  let formater = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  const deleteCartItem = (cartid) => {
    let localData = dataCart.filter((e) => e.cartid !== cartid);
    const parsed = JSON.stringify(localData);
    localStorage.setItem(`DATA_CART_${getLogin[0].id}`, parsed);
    navigate("/cart");
  };

  const getPaid = () => {
    dataCart.forEach((element) => {
      element.isPaid = true;
    });
    const parsed = JSON.stringify(dataCart);
    localStorage.setItem(`DATA_CART_${getLogin[0].id}`, parsed);
    navigate("/cart");
  };
  return (
    <>
      {!!getLogin === false ? (
        <Container>
          <h1>Please Login</h1>
        </Container>
      ) : (
        <Container className="my-3">
          <Row>
            <Col xs={7} className="d-flex flex-column gap-3">
              <Col xs={12}>
                <h2 className="fw-bold color-red">My Cart</h2>
              </Col>
              <Col>
                <p className="color-red fs-5">Review Your Order</p>
                <hr className="hr-cart" />
              </Col>
              <Row>
                {dataCart.map((item, index) => (
                  <Col
                    key={index}
                    className="col-12 my-1 d-flex flex-row align-items-start"
                  >
                    <Col xs={2}>
                      <img
                        src={Products[item.itemid].itemimage}
                        alt=""
                        className="cartlist-image rounded"
                      />
                    </Col>
                    <Col xs={8}>
                      <h6 className="fw-bold color-red">
                        {Products[item.itemid].itemname}
                      </h6>
                      <p className="color-red fs-7">
                        Toppings:{" "}
                        {`${item.topping.map((e) => Toppings[e].itemname)}`}
                      </p>
                    </Col>
                    <Col
                      xs={2}
                      className="d-flex flex-column gap-1 align-items-center"
                    >
                      <p className="color-red fs-6 my-0">
                        {formater.format(item.total)}
                      </p>
                      <Button
                        className="btn btn-danger btn-main delete-cart"
                        variant="danger"
                        onClick={() => deleteCartItem(item.cartid)}
                      >
                        delete
                      </Button>
                    </Col>
                  </Col>
                ))}
              </Row>
              <Col>
                <hr className="hr-cart" />
                <Col xs={6} className="d-flex flex-row align-items-start">
                  <Col xs={6}>
                    <hr className="hr-cart" />
                    <p className="color-red fs-6">Subtotal</p>
                    <p className="color-red fs-6">Qty</p>
                    <hr className="hr-cart" />
                  </Col>
                  <Col xs={6}>
                    <hr className="hr-cart" />
                    <p className="color-red fs-6 text-end">
                      {!!dataCart === false || dataCart.length === 0
                        ? 0
                        : formater.format(
                            dataCart.map((e) => e.total).reduce((a, b) => a + b)
                          )}
                    </p>
                    <p className="color-red fs-6 text-end">{dataCart.length}</p>
                    <hr className="hr-cart" />
                  </Col>
                </Col>
                <Col xs={6} className="d-flex flex-row align-items-start">
                  <Col xs={6}>
                    <p className="color-red fs-6">Total</p>
                  </Col>
                  <Col xs={6}>
                    <p className="color-red fs-6 text-end">
                      {!!dataCart === false || dataCart.length === 0
                        ? 0
                        : formater.format(
                            dataCart.map((e) => e.total).reduce((a, b) => a + b)
                          )}
                    </p>
                  </Col>
                </Col>
              </Col>
            </Col>

            <Col xs={5}>
              <Form>
                <Form.Control
                  className="my-3"
                  placeholder="Name"
                  style={{
                    border: "1px solid #BD0707",
                    background: "#E0C8C840",
                    lineHeight: "2.5",
                  }}
                />
                <Form.Control
                  className="my-3"
                  placeholder="Email"
                  style={{
                    border: "1px solid #BD0707",
                    background: "#E0C8C840",
                    lineHeight: "2.5",
                  }}
                />
                <Form.Control
                  className="my-3"
                  placeholder="Phone"
                  style={{
                    border: "1px solid #BD0707",
                    background: "#E0C8C840",
                    lineHeight: "2.5",
                  }}
                />
                <Form.Control
                  className="my-3"
                  placeholder="Pos Code"
                  style={{
                    border: "1px solid #BD0707",
                    background: "#E0C8C840",
                    lineHeight: "2.5",
                  }}
                />
                <Form.Control
                  className="my-3"
                  as="textarea"
                  placeholder="Leave a comment here"
                  style={{
                    height: "150px",
                    border: "1px solid #BD0707",
                    background: "#E0C8C840",
                    lineHeight: "2.5",
                  }}
                />
                <Button
                  className="btn btn-danger btn-main btn-form col-12"
                  onClick={() => getPaid}
                >
                  Pay
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default CartUserPage;
