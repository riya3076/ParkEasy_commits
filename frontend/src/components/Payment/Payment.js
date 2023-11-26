import React, { useState } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import { Nav, Navbar, Form, Button, Container, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../assets/ParkEasy.png";
import backgroundImage from "../assets/Background.png";

import './Payment.css';

function Payment() {
  const [userName] = useState('John Doe');
  const [address] = useState('Halifax');
  const [price] = useState(1000);
//   const [promoCode, setPromoCode] = useState('');
  const [discountedprice, setDiscountedprice] = useState(price);
  const [submitted, setSubmitted] = useState(false);

  const navigate =useNavigate();
//   const handlePromoCodeChange = (e) => {
//     setPromoCode(e.target.value);

//     if (e.target.value === 'tripngo') {
//       setDiscountedprice(price * 0.85);
//     } else {
//       setDiscountedprice(price);
//     }
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      userName: localStorage.getItem('username') ?? 1,
      address,
      price: price,
    };

    try {
      const response = await axios.post("http://localhost:9000/payment", formData);
      if (response.data.success) {
        window.location.href = response.data.data.link;
      } else {
        throw new Error('Failed to create payment session');
      }
      setSubmitted(true);
    } catch (error) {
      console.log(error);
    }
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
    <div className="background-image">
      <Container className="central-container">
        <div className="payment-container">
          <div className="payment-overlay">
            <h1 className="payment-title">Payment</h1>
            <p className="payment-subtitle label">Name:</p>
            <p className="payment-subtitle">{userName}</p>
            <p className="payment-subtitle label">Parking Spot:</p>
            <p className="payment-subtitle">{address}</p>
            <p className="payment-subtitle label">Amount:</p>
            <p className="payment-subtitle">${price}</p>
            
            <Row className="form-container">
              <Col lg={12} md={12} sm={12}>
                <form onSubmit={handleSubmit}>
                 
                  <div className="button-container">
                    <button type="submit" className="button button-secondary button-100p">
                      Submit
                    </button>
                  </div>
                  {submitted && <p className='submitted-message'>Payment submitted. Thank you!</p>}
                </form>
              </Col>
            </Row>
          </div>
        </div>
      </Container>
    </div>
    </div>
  );
}

export default Payment;
