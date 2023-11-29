import React, { useEffect, useState } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Nav,
  Image,
  Navbar,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router";
import {
  NovuProvider,
  PopoverNotificationCenter,
  NotificationBell,
} from "@novu/notification-center";
import logo from "../assets/ParkEasy.png";
import { faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { backendUrl } from "../API/Api";

const PaymentList = () => {
  const [loading, setLoading] = useState(true);
  const [paymentData, setPaymentData] = useState({
    paymentsMade: [],
    paymentsReceived: [],
  });

  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${backendUrl}/payment/${username}/payments`)
      .then((response) => {
        setPaymentData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching payment data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [username]);

  const handleLogout = () => {
    window.localStorage.clear();

    navigate("/login");
  };

  function onNotificationClick(message) {
    if (message?.cta?.data?.url) {
      window.location.href = message.cta.data.url;
    }
  }

  return (
    <>
      {window.localStorage.getItem("email") ? (
        <>
          <Navbar bg="success" data-bs-theme="dark">
            <Container>
              <Navbar.Brand href="/">
                <Image
                  src={logo}
                  style={{ width: "40px", height: "40px" }}
                  fluid
                ></Image>{" "}
                ParkEasy
              </Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
              </Nav>
              <Nav>
                <NovuProvider
                  subscriberId={window.localStorage.getItem("email")}
                  styles={{
                    bellButton: {
                      root: {
                        svg: {
                          color: "#FFFFFF8C",
                        },
                      },
                    },
                  }}
                  applicationIdentifier={"nS45TrQEHee_"}
                  initialFetchingStrategy={{
                    fetchNotifications: true,
                    fetchUserPreferences: true,
                  }}
                >
                  <PopoverNotificationCenter
                    colorScheme="light"
                    onNotificationClick={onNotificationClick}
                    listItem={(notification) => (
                      <div>{notification?.payload?.description}</div>
                    )}
                  >
                    {({ unseenCount }) => (
                      <Nav.Link>
                        <NotificationBell unseenCount={unseenCount} />
                      </Nav.Link>
                    )}
                  </PopoverNotificationCenter>
                </NovuProvider>
                <Nav.Link onClick={() => navigate("/paymenthistory")}>
                  Payments
                </Nav.Link>
                <Nav.Link onClick={() => navigate("/messages")}>
                  Messages
                </Nav.Link>
                <Nav.Link onClick={() => navigate("/support")}>
                  Support
                </Nav.Link>
                <Nav.Link onClick={() => navigate("/faq")}>FAQ</Nav.Link>
                <Navbar.Text>
                  <FontAwesomeIcon
                    icon={faUser}
                    style={{ marginRight: "0.5rem" }}
                  />
                  {window.localStorage.getItem("username")}
                </Navbar.Text>
                <Nav.Link onClick={handleLogout}>
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    style={{ marginRight: "0.5rem" }}
                  />
                  Logout
                </Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </>
      ) : (
        <>
          <Navbar bg="success" data-bs-theme="dark">
            <Container>
              <Navbar.Brand href="/">
                <Image
                  src={logo}
                  style={{ width: "40px", height: "40px" }}
                  fluid
                ></Image>{" "}
                ParkEasy
              </Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link onClick={() => navigate("/support")}>
                  Support
                </Nav.Link>
                <Nav.Link onClick={() => navigate("/faq")}>FAQ</Nav.Link>
                <Nav.Link onClick={() => navigate("/register")}>
                  Sign Up
                </Nav.Link>
                <Nav.Link onClick={() => navigate("/login")}>Login</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </>
      )}

      <Container>
        {loading ? (
          <div className="text-center mt-5">
            <Spinner animation="border" role="status" variant="success">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <Row>
            <Col>
              <h2 className="text-success">Payments Made</h2>
              {paymentData.paymentsMade.length > 0 ? (
                paymentData.paymentsMade.map((payment) => (
                  <Row key={payment._id} className="mb-2">
                    <Col>
                      <Card className="bg-success text-white">
                        <Card.Body>
                          <Card.Title>Recipient: {payment.to}</Card.Title>
                          <Card.Text>Price: ${payment.price}</Card.Text>
                          <Card.Text>Address: {payment.address}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                ))
              ) : (
                <p>No payments made.</p>
              )}
            </Col>
            <Col>
              <h2 className="text-success mt-4 mt-md-0">Payments Received</h2>
              {paymentData.paymentsReceived.length > 0 ? (
                paymentData.paymentsReceived.map((payment) => (
                  <Row key={payment._id} className="mb-2">
                    <Col>
                      <Card className="bg-success text-white">
                        <Card.Body>
                          <Card.Title>User: {payment.userName}</Card.Title>
                          <Card.Text>Price: ${payment.price}</Card.Text>
                          <Card.Text>Address: {payment.address}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                ))
              ) : (
                <p>No payments received.</p>
              )}
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default PaymentList;
