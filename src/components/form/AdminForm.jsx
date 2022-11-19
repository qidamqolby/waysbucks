import React, { useState } from "react";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";

const AdminForm = ({ formEdit }) => {
  const role = formEdit.role;
  let roleUpperCase = role.toUpperCase();
  const dataInput = [];
  const keyDataInput = `DATA_${roleUpperCase}`;

  const [item, setItem] = useState({
    itemid: 0,
    itemname: "",
    itemprice: 0,
    itemimage: "",
  });

  const handleOnChange = (event) => {
    setItem({
      ...item,
      [event.target.name]: event.target.value,
    });
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    getData();
    saveData();
    document.getElementById("addForm").reset();
  };

  const getData = () => {
    if (typeof Storage === "undefined") {
      alert("cant store user");
    }

    const localData = localStorage.getItem(keyDataInput);
    let data = JSON.parse(localData);

    if (data !== null) {
      for (let i = 0; i < data.length; i++) {
        dataInput.push(data[i]);
      }
    }
  };

  const saveData = () => {
    item.itemid = dataInput.length;
    item.itemprice = parseInt(item.itemprice);
    dataInput.push(item);
    const parsed = JSON.stringify(dataInput);
    localStorage.setItem(keyDataInput, parsed);
  };
  return (
    <Row className="my-3 mx-5 gap-3">
      <Col className="col-6">
        <Form className="p-5" onSubmit={handleOnSubmit} id="addForm">
          <h2 className="text-left fw-bold color-red mb-5">{role}</h2>
          <Form.Group className="my-3">
            <FloatingLabel label={"Name " + role}>
              <Form.Control
                type="text"
                name="itemname"
                onChange={handleOnChange}
                required
                placeholder={"Name " + role}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="my-3">
            <FloatingLabel label={"Price " + role}>
              <Form.Control
                type="number"
                name="itemprice"
                onChange={handleOnChange}
                required
                placeholder={"Price " + role}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="my-3">
            <FloatingLabel label={"Image " + role}>
              <Form.Control
                type="text"
                name="itemimage"
                onChange={handleOnChange}
                required
                placeholder={"Image " + role}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="my-3">
            <Button
              className="btn btn-danger btn-main btn-form col-12"
              type="submit"
            >
              Add {role}
            </Button>
          </Form.Group>
        </Form>
      </Col>
      {item.itemimage !== "" ? (
        <Col className="col-4 product-content">
          <img
            src={item.itemimage}
            className="image-product rounded-4"
            alt=""
          />
        </Col>
      ) : (
        <Col className="col-4 product-content"></Col>
      )}
    </Row>
  );
};

export default AdminForm;
