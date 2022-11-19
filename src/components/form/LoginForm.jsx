import React, { useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ show, setShow, setShowRegister }) => {
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const changeModal = () => {
    handleClose();
    setShowRegister(true);
  };

  const [userLogin, setUserLogin] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dataUser = [];
  const getUser = () => {
    if (typeof Storage === "undefined") {
      alert("cant store user");
    }

    const localData = localStorage.getItem("DATA_USER");
    let data = JSON.parse(localData);

    if (data !== null) {
      for (let i = 0; i < data.length; i++) {
        dataUser.push(data[i]);
      }
    }
  };

  function handleOnChange(event) {
    setUserLogin({
      ...userLogin,
      [event.target.name]: event.target.value,
    });
  }

  function handleOnSubmit(event) {
    event.preventDefault();
    getUser();
    let loggedIn = dataUser.filter(
      (element) => element.email === userLogin.email
    );
    if (loggedIn.length === 0) {
      return alert("email not registered");
    }

    if (loggedIn[0].password !== userLogin.password) {
      return alert("wrong password");
    }

    let parsed = JSON.stringify(loggedIn);
    localStorage.setItem("LOGIN_STATUS", parsed);
    handleClose();
    handlePage(loggedIn[0].role);
  }

  const handlePage = (role) => {
    if (role === "admin") {
      return navigate("/admin");
    } else {
      return navigate("/");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form className="p-5" onSubmit={handleOnSubmit}>
        <h2 className="text-left fw-bold color-red mb-4">Login</h2>
        <Form.Group className="my-3">
          <FloatingLabel label="Email address">
            <Form.Control
              type="email"
              placeholder="yourname@example.com"
              name="email"
              onChange={handleOnChange}
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3">
          <FloatingLabel label="Password">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleOnChange}
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3">
          <Button
            className="btn btn-danger btn-main btn-form col-12"
            type="submit"
          >
            Login
          </Button>
        </Form.Group>
        <Form.Group>
          <p className="text-center my-3">
            Don't have an account? Click{" "}
            <span className="fw-bold cursor-pointer" onClick={changeModal}>
              Here
            </span>
          </p>
        </Form.Group>
      </Form>
    </Modal>
  );
};

export default LoginForm;
