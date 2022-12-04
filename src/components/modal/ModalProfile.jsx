import React from "react";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useMutation } from "react-query";
import { API } from "../../config/api";
import paperClip from "../../assets/paperClip.png";

export default function ModalProfile({ refetch }) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [form, setForm] = useState({
    address: "",
    postal_code: "",
    image: "",
  });

  const [previewName, setPreviewName] = useState(""); //name
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
    // Create image url for preview
    if (e.target.type === "file") {
      setPreviewName(e.target.files[0].name);
    }
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const formData = new FormData();
      formData.set("image", form.image[0], form.image[0].name);
      formData.set("address", form.address);
      formData.set("postal_code", form.postal_code);

      await API.patch("/profile", formData, config);

      setShow(false);
      refetch();
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <>
      <button className="btnProfile login mb-2" onClick={handleShow}>
        Edit Profile
      </button>
      <Modal show={show} onHide={handleClose}>
        <form onSubmit={(e) => handleSubmit.mutate(e)}>
          <div className="authContainer">
            <h1 className="authTitle">Edit Profile</h1>
            <input
              type="text"
              className="inputAuth p-2"
              placeholder="Address"
              name="address"
              id="address"
              onChange={handleChange}
            />
            <input
              type="number"
              className="inputAuth p-2"
              placeholder="Postal Code"
              name="postal_code"
              id="postalcode"
              onChange={handleChange}
            />
            <input
              type="file"
              name="image"
              id="addProductImage"
              hidden
              onChange={handleChange}
            />
            <label
              htmlFor="addProductImage"
              className={
                previewName === "" ? "addProfileImage" : "previewPhoto"
              }
            >
              {previewName === "" ? "Photo Product" : previewName}
              <img src={paperClip} alt="paperClip" />
            </label>

            <button className="btnAuth mb-4">Submit</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
