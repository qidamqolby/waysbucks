<Col className="col-8 d-flex flex-column gap-2">
  <Col className="col-12">
    <h1 className="fw-bold color-red">{Product[0].itemname}</h1>
    <p className="color-red fs-4">{formater.format(Product[0].itemprice)}</p>
  </Col>
  <Col className="col-12">
    <h3 className="fw-bold color-red">Topping</h3>
    <Row>
      {Toppings.map((item, index) => (
        <Col key={index} className="col-12 col-md-3 my-1">
          <Card
            className="cursor-pointer align-items-center toppinglist-card position-relative"
            onClick={() => handleChecked(item.itemid, item.itemprice)}
          >
            <Card.Img src={item.itemimage} className="toppinglist-image" />
            {toppingCheck.filter((element) => element === item.itemid)[0] ===
            item.itemid ? (
              <Card.Img src={check} className="checked" />
            ) : (
              <></>
            )}

            <Card.Body className="d-flex flex-column align-items-center p-1">
              <Card.Title className="fs-7">{item.itemname}</Card.Title>
              <Card.Subtitle className="fs-7">
                {formater.format(item.itemprice)}
              </Card.Subtitle>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Col>
  <Col className="col-12 my-5">
    <Row>
      <Col className="col-6">
        <h3 className="fw-bold color-red">Total</h3>
      </Col>
      <Col className="col-6">
        <h3 className="fw-bold color-red text-end">
          {formater.format(Product[0].itemprice + toppingPrice)}
        </h3>
      </Col>
    </Row>
  </Col>
</Col>;
