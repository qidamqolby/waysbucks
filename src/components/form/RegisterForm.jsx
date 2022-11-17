import React, { useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";

const RegisterForm = ({ show, setShow, setShowLogin }) => {
  const dataUser = [];

  const handleClose = () => setShow(false);
  const changeModal = () => {
    handleClose();
    setShowLogin(true);
  };

  const [userRegister, setUserRegister] = useState({
    id: 0,
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  function handleOnChange(event) {
    setUserRegister({
      ...userRegister,
      [event.target.name]: event.target.value,
    });
  }

  function handleOnSubmit(event) {
    event.preventDefault();
    getUser();

    let loggedIn = dataUser.filter(
      (element) => element.email === userRegister.email
    );
    if (loggedIn.length !== 0) {
      return alert("email is registered");
    } else {
      createUser();
      changeModal();
    }
  }

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

  const createUser = () => {
    userRegister.id = dataUser.length;
    dataUser.push(userRegister);
    const parsed = JSON.stringify(dataUser);
    localStorage.setItem("DATA_USER", parsed);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form className="p-5" onSubmit={handleOnSubmit}>
        <h2 className="text-left fw-bold color-red mb-4">Register</h2>
        <Form.Group className="my-3">
          <FloatingLabel label="Your name">
            <Form.Control
              type="text"
              placeholder="John Doe"
              name="name"
              onChange={handleOnChange}
              required
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3">
          <FloatingLabel label="Email address">
            <Form.Control
              type="email"
              placeholder="yourname@example.com"
              name="email"
              onChange={handleOnChange}
              required
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
              required
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3">
          <Button
            className="btn btn-danger btn-main btn-form col-12"
            type="submit"
          >
            Register
          </Button>
        </Form.Group>
        <Form.Group>
          <p className="text-center my-3">
            Already have an account ? Click{" "}
            <span className="fw-bold cursor-pointer" onClick={changeModal}>
              Here
            </span>
          </p>
        </Form.Group>
      </Form>
    </Modal>
  );
};

export default RegisterForm;
