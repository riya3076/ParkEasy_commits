import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Nav, Navbar , NavDropdown , Container, Image} from "react-bootstrap";
import logo from "../assets/ParkEasy.png";
import backgroundImage from "../assets/Background.png";

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  return (<>
    <Navbar bg="success" data-bs-theme="dark">
                <Container>
                  <Navbar.Brand href="/">
                  <Image src={logo} style={{ width: '40px', height: '40px' }} fluid></Image>{' '}
                    ParkEasy
                  </Navbar.Brand>
              <Nav className="me-auto">
              </Nav>
              <Nav>
              <Nav.Link href="/faq">FAQ</Nav.Link>
                <Nav.Link href="/register">Sign Up</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
              </Nav>
            </Container>
    </Navbar>

    <Form  style={{ marginTop: "20px" , marginLeft: "20px" }} validated={validated}>
      <h2>Login </h2><br/>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control style={{width: "500px"}} type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value) } required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control style={{width: "500px"}} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
      </Form.Group>
      
      
      <Button style={{marginTop: "10px"} }variant="success" type="submit">
        Login
      </Button>
    </Form>
    </>
  );
}

export default Login;