import bin from "../../assets/bin.svg";
import { Form, Button } from "react-bootstrap";
import Header from "../moduls/header";
import React, { useEffect } from "react";
import { useMutation, useQuery } from 'react-query';
import { API } from '../config/api';
import { useNavigate } from "react-router-dom";



function Cart() {
  let navigate = useNavigate();
  const idr = new Intl.NumberFormat("id-ID")
  
  let { data: cart, refetch } = useQuery("cartsCache", async () => {
    const response = await API.get("/carts");
    return response.data.data;
  });

  const dataCarts = cart?.filter((item)=>{
    return item.transaction_id === null
  })

  // console.log(dataCarts)
 
  let resultTotal = dataCarts?.reduce((addition, b) => {
    return addition + b.sub_amount;
  }, 0);

    // payment condition
    const form = {
      amount: resultTotal,
    };

console.log(form)

  const handleSubmit = useMutation(async (e) => {
    
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    // Insert transaction data
    const body = JSON.stringify(form);

    const response = await API.post("/transaction_id", body, config);
    const idTransaction = response.data.data.id

    for (let i=0; i<dataCarts.length; i++){
      API.patch(`/cart/${dataCarts[i].id}`, {"transaction_id": idTransaction}, config )
    }

    const snapToken = await API.get(`/midtrans/${idTransaction}`)

    const token = snapToken.data.data.token;

    window.snap.pay(token, {
      onSuccess: function (result) {
        /* You may add your own implementation here */

        console.log(result);
        navigate("/profile");
      },
      onPending: function (result) {
        /* You may add your own implementation here */
        console.log(result);
        navigate("/profile");
      },
      onError: function (result) {
        /* You may add your own implementation here */
        console.log(result);
      },
      onClose: function () {
        /* You may add your own implementation here */
        alert("you closed the popup without finishing the payment");
      },
    });

  
});
//

  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = "SB-Mid-client-8GBlOlIZLs7yEVF3";
    // const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);
  return (
    <>
    <Header addCart={cart?.length} />
    <div className="cart-section after-nav">
      <div className="cart-title">
        <h6>My Cart</h6>
      </div>
      <div className="cart-container">
        <div className="left-cart-container">
          <h6>Review Your Order</h6>
          <div className="line-review-cart">
            {cart?.map((data, index) =>(
            <div className="main-cart" key={index}>
              <div className="picture-menu-cart">
                <img
                  className="picture-cartPaid"
                  src={data?.product?.image}
                  alt="cartPaid"
                ></img>
              </div>
              <div className="data-cart">
                <div className="data-flavour-cart">
                  <div className="menu-title-cart">
                    <h6>{data?.product?.title}</h6>
                  </div>
                  <div className="data-price-cart">
                    <h6>Rp.{idr.format(data?.sub_amount)}</h6>
                  </div>
                </div>
             
                <div className="data-topping-cart">
                  <div>
                    <h6>
                      Topping <i>: {data.topping?.map((topping, idx) => (
                              <h4 className="d-inline" key={idx}>
                                {topping.title},
                              </h4>
                            ))}</i>
                    </h6>
                  </div>
                  <div className="trash-cart">
                    <img src={bin}  alt="bin"/>
                  </div>
                </div>
              </div>
            </div>
            ))}
          </div>

          <div className="line-cart">
            <div className="data-payment">
              <div className="detail-payment-cart">
                <div className="subTotal-title-cart">
                  <h6>Sub Total</h6>
                </div>
                <div className="subTotal-payment-cart">
                  <h6>Rp.{idr.format(resultTotal)} </h6>
                </div>
              </div>
              <div className="quantity-title-cart">
                <div>
                  <h6>Quantity</h6>
                </div>
                <div className="quantity-cart">
                  <h6>{cart?.length}</h6>
                </div>
              </div>
            </div>
          </div>

          <div className="total-cart-detail">
            <div className="total-detail txt-red">
              <div>
                <h6>Total</h6>
              </div>
              <div>
                <h6>Rp.{idr.format(resultTotal)}</h6>
              </div>
            </div>
          </div>

        </div>

        <div className="right-cart-container">
        <div>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Control className='input' type="text" placeholder="Name"  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control className='input' type="email" placeholder="Enter email" />
                </Form.Group>


                <Form.Group className="mb-3">
                  <Form.Control className='input' type="text" placeholder="Phone" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control className='input' type="text" placeholder="Pos Code" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control className='input' as="textarea" rows={6} placeholder="Address" />
                </Form.Group>
              </Form>
              <Button variant="danger" type="submit" className="add-cart" onClick={(e) => handleSubmit.mutate(e)}>
                Pay
              </Button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Cart;
