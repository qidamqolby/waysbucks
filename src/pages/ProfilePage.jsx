import { Card, Col, Container, Row } from "react-bootstrap";

const ProfilePage = () => {
  const localData = localStorage.getItem("LOGIN_STATUS");
  const data = JSON.parse(localData);
  let getLogin = data;

  return (
    <>
      {!!getLogin === false ? (
        <Container>
          <h1>Please Login</h1>
        </Container>
      ) : (
        <Container>
          <Row>
            <Col>
              <Card className="border-0 p-2">
                <Card.Header className="bg-white border-0">
                  <Card.Title>
                    <h3 style={{ color: "#BD0707", fontWeight: "bold" }}>
                      My Profile
                    </h3>
                  </Card.Title>
                </Card.Header>
                <Card.Body>
                  <Row className="align-items-center">
                    <Col sm={4} className=""></Col>
                    <Col sm={8}>
                      <Card.Text>
                        <h6 style={{ color: "#613D2B" }}>Full Name</h6>
                        <p>{getLogin[0].name}</p>
                      </Card.Text>
                      <Card.Text>
                        <h6 style={{ color: "#613D2B" }}>Email</h6>
                        <p>{getLogin[0].email}</p>
                      </Card.Text>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default ProfilePage;
