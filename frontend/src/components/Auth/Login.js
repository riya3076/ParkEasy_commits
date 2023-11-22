import React, { useState } from "react";
import { Form, Button, Image, Nav, Navbar, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/ParkEasy.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }

    setValidated(true);

    try {
      const response = await axios.post("http://localhost:9000/auth/login", {
        email: email,
        password: password,
      });

      // Assuming your server sends back a token upon successful login
      const token = response.data.token;
      console.log(response);
      // Store the token in sessionStorage or localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
      // Redirect to the desired page after successful login
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login failure, show an error message, etc.
    }
  };

  return (
    <>
      <Navbar bg="success" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">
            <Image src={logo} style={{ width: "40px", height: "40px" }} fluid />{" "}
            ParkEasy
          </Navbar.Brand>
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link href="/faq">FAQ</Nav.Link>
            <Nav.Link href="/register">Sign Up</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Form
        style={{ marginTop: "20px", marginLeft: "20px" }}
        validated={validated}
        onSubmit={handleSubmit}
      >
        <h2>Login </h2>
        <br />
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            style={{ width: "500px" }}
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            style={{ width: "500px" }}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button style={{ marginTop: "10px" }} variant="success" type="submit">
          Login
        </Button>
      </Form>
    </>
  );
};

export default Login;
