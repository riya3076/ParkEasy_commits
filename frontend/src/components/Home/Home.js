import React from "react";
import { Navbar, Nav, Button, Form, Image } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import logo from "../assets/ParkEasy.png";
import backgroundImage from "../assets/Background.png";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.clear();
    window.location.reload();
    navigate("/login");
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      {window.localStorage.getItem("email") ||
      window.localStorage.getItem("token") ? (
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
                <Navbar.Text>
                  {window.localStorage.getItem("email")}
                </Navbar.Text>
                <Nav.Link onClick={handleLogout} href="/login">
                  Logout
                </Nav.Link>
              </Nav>
            </Container>
          </Navbar>
          <div style={{ textAlign: "center" }}>
            <h1
              style={{
                color: "white",
                marginTop: "40px",
                fontSize: "100px",
                fontWeight: "bold",
              }}
            >
              ParkEasy
            </h1>
            <h1
              style={{
                marginTop: "20px",
                marginBottom: "20px",
                color: "white",
                fontWeight: "bold",
              }}
            >
              FINDING PARKING SPOT MADE EASY
            </h1>
            <Button
              variant="success"
              size="lg"
              onClick={() => navigate("/login")}
              style={{ marginRight: "10px" }}
            >
              FIND PARKING SPOT
            </Button>
            <Button
              variant="success"
              size="lg"
              onClick={() => navigate("/register")}
            >
              LIST PARKING SPOT
            </Button>
          </div>
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
                <Nav.Link href="/support">Support</Nav.Link>
                <Nav.Link href="/faq">FAQ</Nav.Link>
                <Nav.Link href="/register">Sign Up</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
          <div style={{ textAlign: "center" }}>
            <h1
              style={{
                color: "white",
                marginTop: "40px",
                fontSize: "100px",
                fontWeight: "bold",
              }}
            >
              ParkEasy
            </h1>
            <h1
              style={{
                marginTop: "20px",
                marginBottom: "20px",
                color: "white",
                fontWeight: "bold",
              }}
            >
              FINDING PARKING SPOT MADE EASY
            </h1>
            <Button
              variant="success"
              size="lg"
              onClick={() => navigate("/login")}
              style={{ marginRight: "10px" }}
            >
              FIND PARKING SPOT
            </Button>
            <Button
              variant="success"
              size="lg"
              onClick={() => navigate("/register")}
            >
              LIST PARKING SPOT
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
