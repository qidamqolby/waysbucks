import { useContext, useState } from "react";
import Rupiah from "rupiah-format";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useQuery } from "react-query";
import { API } from "../config/api"; //DB

import cssModules from "../styles/home.module.css"; // style
import HeroImage from "../assets/Hero-Image.png"; // file
import Navbar from "../components/navbar/navbar"; // component

export default function LandingPage() {
  document.title = "Waysbucks";

  // modal login
  const [show, setShow] = useState(false);
  const [state] = useContext(UserContext); // user data
  const handleClick = () => setShow(true);

  // Fetching product data from database
  let { data: products } = useQuery("productsCache", async () => {
    const response = await API.get("/products");
    return response.data.data;
  });

  return (
    <>
      <Navbar setShow={setShow} show={show} />
      <div>
        <section>
          <div className={cssModules.landing_page}>
            <div className={cssModules.reactangle}>
              <span className={cssModules.text_inside}>
                <h3>WAYSBUCKS</h3>
                <span>
                  <p className={cssModules.p1}>
                    Things are changing, but we're still here for you <br />
                  </p>
                  <br />
                  <p>
                    We have temporarily closed our in-store cafes, but select{" "}
                    <br />
                    grocery and drive-thru location remaining open.
                    <br />
                    <strong>Waysbucks</strong> Driver is also available <br />
                    <br />
                    let's Orderr...
                  </p>
                </span>
              </span>
              <div>
                <img
                  className={cssModules.pitc}
                  src={HeroImage}
                  alt="HeroBanner"
                />
              </div>
            </div>
          </div>
        </section>
        <section>
          <span className={cssModules.textofdown}>
            <p>Let's Order</p>
          </span>
          <div className={cssModules.landofdown}>
            {products?.map((item, index) => (
              <div className={cssModules.card} key={index}>
                <div className={cssModules.card1}>
                  <Link
                    to={
                      state.isLogin === true ? `/detail-product/${item.id}` : ""
                    }
                    onClick={state.isLogin === false ? handleClick : ""}
                  >
                    <img
                      className={cssModules.imageP}
                      src={item.image}
                      alt="ProductImage"
                    />
                  </Link>
                  <div className={cssModules.card2}>
                    <p className={cssModules.text1}>
                      {item.title.substring(0, 17)}...
                    </p>
                    <p className={cssModules.text2}>
                      {Rupiah.convert(item.price)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
