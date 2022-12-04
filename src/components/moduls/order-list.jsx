import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { API } from "../config/api";

export default function DrinkList() {
  const navigate = useNavigate()

  const idr = new Intl.NumberFormat("id-ID")
  const { data: products } = useQuery('productsCache', async () => {
    const res = await API.get('/products')
    return res.data.data
  })

  const toDetail = (id) =>{
    navigate("/detail-product/" + id)
  }

  return (
    <section className="mx10">
        <h2 className="mt2 mb2-25 txt-red bold">Let's Order</h2>
        <ul className="drink-list">
            {products?.map((data, index) => (
            <li key={index} className="bg-pink br10" style={{cursor: "pointer"}}>
                <img className="br10" src={data?.image} alt="drink" onClick={()=> toDetail(data?.id)}/>
                <div className="mt0-75 px1 pb1">
                    <h6 className="line-clamp1 txt-red bold">{data?.title}</h6>
                    <p>Rp.{idr.format(data?.price)}</p>
                </div>
            </li>
            ))}
        </ul>
      </section>
  )
}
