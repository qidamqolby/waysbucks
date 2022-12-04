import Header from "../moduls/header";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../components/context/userContext"
import { useMutation, useQuery } from 'react-query';
import { API } from '../config/api';

function DetailProduct() {
  const navigate = useNavigate()
  const [state] = useContext(UserContext)
  const idr = new Intl.NumberFormat("id-ID")
  
  const params = useParams();
  const id = params.id;

  // topping Set
  const [topping, setTopping] = useState([]);
  const [toppingID, settoppingID] = useState ([]);

  const handleChange = (e) => {
    let updateTopping = [...topping];
    if (e.target.checked) {
      updateTopping = [...topping, e.target.value];
    } else {
      updateTopping.splice(topping.indexOf(e.target.value));
    }
    setTopping(updateTopping);
  

  // const name = id;

  let toppingId = [...toppingID];
    if (e.target.checked) {
      toppingId = [...toppingID, parseInt(e.target.name)];
    } else {
      toppingId.splice(toppingID.indexOf(e.target.name));
    }
    settoppingID(toppingId);
  };

  // console.log(toppingID)

  let { data: product } = useQuery('productCache', async () => {
    const res = await API.get(`/product/${id}`)
    // console.log(res);
    return res.data.data
  })

  let { data: toppings } = useQuery('toppingsCache', async () => {
    const response = await API.get('/toppings');
    // console.log(response)
    return response.data.data;
  });

  // tambah price
  let ToppingTotal = topping.reduce((a, b) => {
    return a + parseInt(b);
  }, 0);

  let sub_amount = product?.price + ToppingTotal;

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const body = JSON.stringify({
        topping_id: toppingID,
        sub_amount: sub_amount,

        product_id: parseInt(id),
      });
      console.log("sub amount " + sub_amount);
      console.log("a",body)

      const response = await API.post("/cart", body, config);    
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    navigate('/')
  });

  useEffect(() => {
    if (state.isLogin === false || state.user.status === "admin") {
      navigate('/')
    }
  }, [state])

  return (
    <>
    <Header />
    <div className="detail-product-section after-nav">
      <div className="picture-detail-menu pt1"> 
        <img className="picture-detail" src={ product?.image } alt="drink"></img>
      </div>
      <div className="right-detail-product">
        <div className="flavour-price-detail">
          <div className="flavour-detail">
            <h6>{ product?.title }</h6>
          </div>
          <div className="price-detail">
            <h6>Rp.{idr.format(product?.price) }</h6>
          </div>
        </div>
        <div className="title-topping-detail">
          <div className="title-detail">
            <h6>Topping</h6>
          </div>
          <div className="topping-detail-container">
            {toppings?.map((data, index) => (
              <form>
              <div className="topping-detail">
                <div className="picture-topping-detail">
                  <input type="checkbox" className="toppingCheckboxs" id={`checkmark${index}`} 
                   value={data.price} name={data.id} onChange={handleChange} />
                  <label htmlFor ={`checkmark${index}`}>
                    <img className="picture-topping" src={data.image} alt="" />
                  </label>
                </div>
                <div className="topping-variant-detail">
                  <h6>{data.title}</h6>
                </div>
              </div>
              </form>
            ))}
          </div>
        </div>
        <div className="total-cart-detail">
          <div className="total-detail">
            <div>
              <h6>Total</h6>
            </div>
            <div>
              <h6>Rp.{idr.format(product?.price + ToppingTotal)}</h6>
            </div>
          </div>
          <Button variant="danger" className="add-cart"  onClick={(e) => handleSubmit.mutate(e)}>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
    </>
  );
};
export default DetailProduct;
