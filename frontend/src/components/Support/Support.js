import React, { useState } from "react";
import { Nav, Navbar, Form, Button, Container, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../assets/ParkEasy.png";
import axios from "axios";
import { backendUrl } from "../API/Api";

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
        phoneValue: phoneValue,
        messageValue: messageValue
      });

      const token = response.data.token;

      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
      localStorage.setItem("username", response.data.username);

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Login failed:", error);

    } 
  };

  return (
    <>
      <Navbar bg="success" data-bs-theme="dark">
        <Container>
          <Navbar.Brand onClick={() => navigate("/")}>
            <Image
              src={logo}
              style={{ width: "40px", height: "40px" }}
              fluid
            ></Image>{" "}
            ParkEasy
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={() => navigate("/support")}>Support</Nav.Link>
            <Nav.Link onClick={() => navigate("/faq")}>FAQ</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div>
        <div style={{ margin: "20px" }}>
          <h1>Contact Us</h1>
          <br />
          <p style={{ fontSize: "18px" }}>
            Please send us your questions to help you out!
          </p>
          <Form
            validated={validated}
            onSubmit={handleSubmit}
          >
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                style={{ width: "600px" }}
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
                style={{ width: "600px" }}
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
                style={{ width: "600px", height: "200px" }}
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
        </div>
      </div>
    </>
  );
}

export default Support;
