// dependencies
import React, { useState, useContext } from "react";
import { Modal } from "react-bootstrap";
import { UserContext } from "../../context/UserContext";
import { useMutation } from "react-query";
import { API } from "../../config/api";

export default function ModalAuth({ show, setShow }) {
  // modal-check
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [shows, setShows] = useState(false);
  const handleShows = () => setShows(true);
  const handleCloses = () => setShows(false);

  const handleSwitchRegister = () => {
    setShow(false);
    setShows(true);
  };

  const handleSwitchLogin = () => {
    setShows(false);
    setShow(true);
  };

  // _________login
  const [state, dispatch] = useContext(UserContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  //
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(form);

      const response = await API.post("/login", body, config);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.data,
      });

      setShow(false);
    } catch (error) {
      console.log(error);
    }
  });

  // register
  const [register, setRegister] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleChangeRegister = (e) => {
    setRegister({
      ...register,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitRegister = useMutation(async (e) => {
    e.preventDefault();

    // Configuration Content-type
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    // Data body
    const body = JSON.stringify(register);

    // Insert data user to database
    await API.post("/register", body, config);

    // Handling response here
    setShows(false);
  });

  return (
    <>
      <>
        <button className="btnNavbar login" onClick={handleShow}>
          Login
        </button>
        <Modal show={show} onHide={handleClose}>
          <form onSubmit={(e) => handleSubmit.mutate(e)}>
            <div className="authContainer">
              <h1 className="authTitle">Login</h1>
              <input
                type="email"
                className="inputAuth p-2"
                placeholder="Email"
                name="email"
                id="email"
                onChange={handleChange}
              />
              <input
                type="password"
                className="inputAuth p-2"
                placeholder="Password"
                name="password"
                id="password"
                onChange={handleChange}
              />
              <button className="btnAuth">Login</button>
              <p className="toRegist">
                Don't have an account ? Click{" "}
                <strong onClick={handleSwitchRegister}>Here</strong>
              </p>
            </div>
          </form>
        </Modal>
      </>

      <>
        <button className="btnNavbar register" onClick={handleShows}>
          Register
        </button>
        <Modal show={shows} onHide={handleCloses} id="modalRegister">
          <form onSubmit={(e) => handleSubmitRegister.mutate(e)}>
            <div className="authContainer">
              <h1 className="authTitle">Register</h1>
              <input
                type="email"
                className="inputAuth p-2"
                placeholder="Email"
                name="email"
                onChange={handleChangeRegister}
              />
              <input
                type="password"
                className="inputAuth p-2"
                placeholder="Password"
                name="password"
                onChange={handleChangeRegister}
              />
              <input
                type="text"
                className="inputAuth p-2"
                placeholder="Full Name"
                name="name"
                onChange={handleChangeRegister}
              />
              <button className="btnAuth" type="submit">
                Register
              </button>
              <p className="toRegist">
                Already have an account ? Click{" "}
                <strong onClick={handleSwitchLogin}>Here</strong>
              </p>
            </div>
          </form>
        </Modal>
      </>
    </>
  );
}
