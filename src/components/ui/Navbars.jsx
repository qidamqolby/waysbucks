import React, { useState } from "react";
import {
  Badge,
  Button,
  Container,
  Dropdown,
  Nav,
  Navbar,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import LoginForm from "../form/LoginForm";
import RegisterForm from "../form/RegisterForm";

import navLogo from "../../assets/images/waybucks-logo.png";

import cartIcon from "../../assets/icons/shopping-basket.svg";
import userIcon from "../../assets/icons/user.svg";
import logoutIcon from "../../assets/icons/logout.svg";
import productIcon from "../../assets/icons/product.svg";
import toppingIcon from "../../assets/icons/topping.svg";

const Navbars = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const localData = localStorage.getItem("LOGIN_STATUS");
  const data = JSON.parse(localData);
  let getLogin = [...data];

  const Logout = () => {
    getLogin.pop();
    const parsed = JSON.stringify(getLogin);
    localStorage.setItem("LOGIN_STATUS", parsed);
  };

  return (
    <>
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              src={navLogo}
              width="80"
              height="80"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="justify-content-end">
            {getLogin.length === 0 ? (
              <Nav className="gap-2 col-3">
                <Button
                  variant="outline-danger"
                  className="btn-white btn-navbar col-6"
                  onClick={() => setShowLogin(true)}
                >
                  Login
                </Button>
                <Button
                  variant="danger"
                  className="btn-main btn-navbar col-6"
                  onClick={() => setShowRegister(true)}
                >
                  Register
                </Button>
              </Nav>
            ) : (
              <Nav>
                <Dropdown className="d-flex gap-4 align-items-center">
                  <Button
                    className="position-relative btn-user"
                    variant="light"
                  >
                    <img
                      src={cartIcon}
                      onClick={() => navigate("/")}
                      alt=""
                      className="icon-size"
                    />

                    <Badge className="position-absolute badge-position rounded-pill bg-danger">
                      1
                    </Badge>
                  </Button>
                  <Dropdown.Toggle variant="light" className="btn-user">
                    <img src={userIcon} alt="" className="icon-size" />
                  </Dropdown.Toggle>
                  {getLogin[0].role === "user" ? (
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => navigate("/profile")}>
                        <img src={userIcon} alt="" className="icon-size me-3" />
                        Profile
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        onClick={() => {
                          Logout();
                          navigate("/");
                        }}
                      >
                        <img
                          src={logoutIcon}
                          alt=""
                          className="icon-size me-3"
                        />
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  ) : (
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => navigate("/add-product")}>
                        <img
                          src={productIcon}
                          alt=""
                          className="icon-size me-3"
                        />
                        Add Product
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => navigate("/add-topping")}>
                        <img
                          src={toppingIcon}
                          alt=""
                          className="icon-size me-3"
                        />
                        Add Topping
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        onClick={() => {
                          Logout();
                          navigate("/");
                        }}
                      >
                        <img
                          className="icon-size me-3"
                          src={logoutIcon}
                          alt=""
                        />
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  )}
                </Dropdown>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <LoginForm
        show={showLogin}
        setShow={setShowLogin}
        setShowRegister={setShowRegister}
      />
      <RegisterForm
        show={showRegister}
        setShow={setShowRegister}
        setShowLogin={setShowLogin}
      />
    </>
  );
};

export default Navbars;
