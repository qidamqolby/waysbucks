import React from "react";
import { Col, Container, Row } from "react-bootstrap";

// Assets
import heroImg from "../../assets/images/hero-img.jpeg";

const Jumbotron = () => {
  return (
    <Container className="my-5">
      <Row className="col-10 bg-red p-5 rounded-3">
        <Col xs={7} className="text-white">
          <Col>
            <h1 className="fw-bold">WAYBUCKS</h1>
            <p>Things are changing, but we’re still here for you</p>
            <p>
              We have temporarily closed our in-store cafes, but select grocery
              and drive-thru locations remaining open.{" "}
              <strong> Waysbucks Drivers</strong> is also available
              <br />
              <br />
              Let’s Order...
            </p>
          </Col>
        </Col>
        <Col xs={5} className="position-relative">
          <img
            src={heroImg}
            className="rounded position-absolute top-50 start-100 translate-middle"
            width={400}
            alt=""
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Jumbotron;
