import React, { useState } from "react";
import { Nav, Navbar, Form, Button, Container, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../assets/ParkEasy.png";
import axios from "axios";
import { backendUrl } from "../API/Api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  NovuProvider,
  PopoverNotificationCenter,
  NotificationBell,
} from "@novu/notification-center";
import { faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Support() {
  const [email, setEmail] = useState("");
  const [phoneValue, setPhone] = useState("");
  const [messageValue, setMessage] = useState("");
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };
  const handleLogout = () => {
    window.localStorage.clear();
    window.location.reload();
    navigate("/login");
  };

  const [description, setDescription] = useState("");

  function onNotificationClick(message) {
    if (message?.cta?.data?.url) {
      window.location.href = message.cta.data.url;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }

    setValidated(true);

    try {
      const response = await axios.post(`${backendUrl}/support/create`, {
        email: email,
        phone: phoneValue,
        message: messageValue,
      });
      toast.success("Successfully Submitted! Our team will contact you soon.", {
        position: "top-right",
        autoClose: 3000,
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast.error("Error while Submitting!", {
        position: "top-right",
        autoClose: 3000,
      });
      console.error("Login failed:", error);
    }
  };

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
      <ToastContainer />
      <div className="d-flex justify-content-center align-items-center">
        <div>
          <h1 style={{ color: "green", fontWeight: "bold" }}>Contact Us</h1>
          <br />
          <p style={{ fontSize: "18px", color: "green", fontWeight: "bold" }}>
            Please send us your questions to help you out!
          </p>
          <Container>
            <Form
              validated={validated}
              onSubmit={handleSubmit}
              style={{ width: "100%" }}
            >
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                  placeholder="Enter email"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="tel"
                  required
                  minLength={10}
                  maxLength={10}
                  value={phoneValue}
                  onChange={handlePhoneChange}
                  placeholder="Enter Phone Number"
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="textarea">
                <Form.Label>What's the issue?</Form.Label>
                <Form.Control
                  as="textarea"
                  required
                  rows={3}
                  value={messageValue}
                  onChange={handleMessageChange}
                  placeholder="Describe your problem you are facing"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  required
                  label="I agree to be contacted by ParkEasy"
                />
              </Form.Group>
              <Button variant="success" type="submit">
                Submit
              </Button>
            </Form>
          </Container>
        </div>
      </div>
    </>
  );
}

export default Support;
