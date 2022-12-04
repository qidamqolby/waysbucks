import React, { useState, useEffect, useContext } from "react";
import Header from "../moduls/header";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { API } from "../config/api";
import dateFormat from "dateformat";
import { Button } from "react-bootstrap";
import { useMutation } from "react-query";

export default function Income() {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);

  const idr = new Intl.NumberFormat("id-ID");
  const [transaction, setTransaction] = useState([]);

  const getTransaction = async () => {
    try {
      const res = await API.get(`/transactions`);
      setTransaction(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (state.isLogin === false || state.user.status === "customer") {
      navigate("/");
    } else {
      getTransaction();
    }
  }, []);

  const handleAction = () => {};

  return (
    <>
      <Header />
      <main className="after-nav pb5">
        <section className="pt4 mx5">
          <h1 className="txt-red mb2-5">Income Transaction</h1>
          <table>
            <thead className="bg-gray">
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Product</th>
                <th>Income</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {transaction.map((data, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{data.user.name}</td>
                  <td>
                    {data.cart.map((data, index) => (
                      <h6 className="productIncome" key={index}>
                        {data.product.title},{" "}
                      </h6>
                    ))}
                  </td>
                  <td>Rp {idr.format(data.amount)}</td>
                  <td>{data.status}</td>
                  <td>
                    {data.status === "pending" ? (
                      <>
                        <Button
                          variant="danger"
                          className="btn-sm mx-2"
                          onClick={() => handleAction()}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="success"
                          className="btn-sm mx-2"
                          onClick={() => handleAction()}
                        >
                          Approve
                        </Button>
                      </>
                    ) : (
                      <>{data.status === "cancel" ? <></> : <></>}</>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
}
