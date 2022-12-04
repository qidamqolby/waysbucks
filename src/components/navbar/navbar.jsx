// dependencies
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { API } from "../../config/api";
import { useState } from "react";

// components
import Dropdown from "./dropdown/Dropdown";
import ModalAuth from "../modal/ModalAuth";

// files
import Logo from "../../assets/Logo.svg";
import Cart from "../../assets/cart.svg";

export default function Navbar({ setShow, show }) {
  const [state] = useContext(UserContext);
  const isLogin = state.isLogin;

  const [bubble, setBubble] = useState([]);

  useEffect(() => {
    API.get("/carts-id")
      .then((res) => {
        setBubble(res.data.data);
      })
      .catch((err) => console.log("error", err));
  });

  return (
    <nav>
      <div>
        <Link to={state.user.status === "customer" ? "/" : "/transaction"}>
          <img src={Logo} alt="Logo" className="navbarLogo" />
        </Link>
      </div>
      {isLogin ? (
        <div className="navbarRight">
          <div
            className={
              bubble === undefined
                ? "d-none"
                : bubble?.length === 0
                ? "d-none"
                : "circle"
            }
          >
            {bubble?.length}
          </div>
          <Link to={"/cart"}>
            <img
              src={Cart}
              alt="cart"
              className={
                state.user.status === "customer" ? "navbarCart" : "d-none"
              }
            />
          </Link>
          <Dropdown />
        </div>
      ) : (
        <div className="navbarLeft">
          <ModalAuth show={show} setShow={setShow} />
        </div>
      )}
    </nav>
  );
}
