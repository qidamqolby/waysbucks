// dependencies
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useMutation } from "react-query";

//api config
import { API } from "../config/api";

// component
import Navbar from "../components/navbar/navbar";

// file
import paperClip from "../assets/paperClip.png";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const title = "Add Product";
  document.title = "Waysbucks | " + title;

  const [previewName, setPreviewName] = useState(""); //name
  const [preview, setPreview] = useState(null); //image

  const [form, setForm] = useState({
    image: "",
    title: "",
    price: "",
  }); //Store data product

  //handle chahnge data on from
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
      setPreviewName(e.target.files[0].name);
    }
  };

  let navigate = useNavigate();

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("image", form.image[0], form.image[0].name);
      formData.set("title", form.title);
      formData.set("price", form.price);

      // Insert category data
      await API.post("/product", formData, config);

      navigate("/transaction");
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <>
      <Navbar />
      <Container className="addProductContainer">
        <div className="addProductLeft">
          <form onSubmit={(e) => handleSubmit.mutate(e)}>
            <h1>Product</h1>
            <input
              type="text"
              placeholder="Name Product"
              name="title"
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Price"
              className="price"
              name="price"
              onChange={handleChange}
            />
            <input
              type="file"
              id="addProductImage"
              hidden
              className="photoProduct"
              name="image"
              onChange={handleChange}
            />
            <label
              htmlFor="addProductImage"
              className={previewName === "" ? "addProductImage" : "previewName"}
            >
              {previewName === "" ? "Photo Product" : previewName}
              <img src={paperClip} alt="paperClip" />
            </label>
            <button>Add Product</button>
          </form>
        </div>
        {preview && (
          <div className="addProductRight">
            <img src={preview} alt="preview" />
          </div>
        )}
      </Container>
    </>
  );
}
