import React, { useState } from "react";
import { Nav, Navbar, Form , Button , Container , Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../assets/ParkEasy.png";

function Support() {
  
  const [emailValue, setEmail] = useState("");
  const [phoneValue, setPhone] = useState("");
  const [messageValue, setMessage] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const navigate = useNavigate();


  return (
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
                <Nav.Link href="/support">Support</Nav.Link>
                <Nav.Link href="/faq">FAQ</Nav.Link>
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
            <Form>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  value={emailValue}
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
          </div>
        </div>
    </>
  );
}

export default Support;