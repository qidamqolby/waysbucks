import logo from "../../assets/logo.svg";
import Header from "../moduls/header";
import { useEffect, useContext, useState } from "react";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";
import dateFormat from 'dateformat'
import imgProfile from '../../assets/profile.png' 
import qrCode from '../../assets/scan.svg'

function Profile() {
  const idr = new Intl.NumberFormat("id-ID")
  const [state] = useContext(UserContext)
  const [transaction, setTransaction] = useState([])
  

  useEffect(()=>{
  const getTransaction = async()=>{
    try{
      const response = await API.get("/transactionId")
      setTransaction(response.data.data)
    }catch(error){
      console.error(error)
    }
  };  
     getTransaction()
  }, [setTransaction])
  

  return (
    <>
    <Header />
    <div className="transaction-section after-nav">
      <div className="profile-container">
        <div className="profile-title">
          <h6>My Profile</h6>
        </div>
        <div className="detail-profile">
            <div className="picture-profile">
            <img
              className="picture-user"
              src={imgProfile}
              alt=""
              />
          </div>
          <div className="identity-profile">
            <div className="identity-name">
              <h6>Full Name</h6>
            </div>
            <div className="userName">
              <h6>{ state.user.name }</h6>
            </div>
            <div className="identity-email">
              <h6>Email</h6>
            </div>
            <div className="userEmail">
              <h6>{ state.user.email }</h6>
            </div>
          </div>
        </div>
      </div>
      <div className="transaction-container">
        <div className="transaction-title">
          <h6>My Transaction</h6>
        </div>
        {transaction.map((data,index)=>(
        <div className="detail-transaction">
            {data.cart.map((item, index)=>(
          <div className="box-order">
          <div className="left-container">
            <div className="main-order">
              <div className="picture-menu">
                <img
                  className="picture-menuPurchased"
                  src={item?.product?.image}
                  alt=""
                />
              </div>
              <div className="data-order">
                <div className="data-flavour">
                  <h6>{item?.product?.title}</h6>
                </div>
                <div className="orderTime">
                  <h6>{dateFormat(item?.updated_at, 'dddd, ')}{dateFormat(item?.updated_at, 'd mmmm yyyy')}</h6>
                </div>
                <div className="data-price">
                  <h6>Rp.{idr.format(item?.product?.price)}</h6>
                </div>
                <div className="data-topping">
                  <h6>Topping :
                          {item?.topping.map((topping, idx) => (
                            <div key={idx} style={{display:"inline"}}>{topping?.title} ,</div>
                          ))}</h6>
                </div>
                <div className="subTotal">
              <h6>Sub Total : Rp.{idr.format(item?.sub_amount)}</h6>
              </div>
              </div>
            </div>
          </div>
          <div align="center" className="right-container">
            <div className="logo-transaction">
              <img className="logo-detail" src={logo} alt="logo" />
            </div>
            <div className="qr-transaction">
              <img
                className="qr-code"
                src={qrCode}
                alt=""
                />
            </div>
            <div className="status-order">
              <h6>{data.status}</h6>
            </div>
            </div>
          </div>
        ))}
        </div>
        ))}
      </div>
      
    </div>
    </>
  );
}

export default Profile;
