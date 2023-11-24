import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from "@react-google-maps/api";
import {
  Form,
  Row,
  Col,
  Navbar,
  Container,
  Nav,
  Card,
  Image,
  Button,
  Spinner,
} from "react-bootstrap";
import logo from "../assets/ParkEasy.png";
import "../Finders/Finder.css";
import { db } from "../Chatting/Firebase1";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import ChatBox from "../Chatting/ChatBox";

const libraries = ["places"];
const Finder = () => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCCW8GIa8MXFBzdmKFWJs5PL77pHIOtJaU",
    libraries: ["places"],
  });

  const parkingLocations = [
    {
      address: "2080 Quingate Place, Halifax, NS, Canada",
      coordinates: { lat: 44.6472148, lng: -63.59483640000001 },
      duration: "weekly",
      price: "80",
      totalSpots: "2",
      userName: "JohnDoe",
      email: "johndoe@gmail.com",
      imageurl:
        "https://firebasestorage.googleapis.com/v0/b/ti-parkeasy.appspot.com/o/images%2Fhelloworld?alt=media&token=ae38158a-30c9-42e0-b1e2-7a8237646d40",
    },
    {
      address: "2080 Quingate Place, Halifax, NS, Canada",
      coordinates: { lat: 44.6573148, lng: -63.59483640000001 },
      duration: "weekly",
      price: "80",
      totalSpots: "2",
      userName: "JohnDoe",
      email: "johndoe@gmail.com",
      imageurl:
        "https://firebasestorage.googleapis.com/v0/b/ti-parkeasy.appspot.com/o/images%2Fhelloworld?alt=media&token=ae38158a-30c9-42e0-b1e2-7a8237646d40",
    },
    {
      address: "2080 Quingate Place, Halifax, NS, Canada",
      coordinates: { lat: 44.6672148, lng: -63.59483640000001 },
      duration: "weekly",
      price: "80",
      totalSpots: "2",
      userName: "JohnDoe",
      email: "johndoe@gmail.com",
      imageurl:
        "https://firebasestorage.googleapis.com/v0/b/ti-parkeasy.appspot.com/o/images%2Fhelloworld?alt=media&token=ae38158a-30c9-42e0-b1e2-7a8237646d40",
    },
    {
      address: "2080 Quingate Place, Halifax, NS, Canada",
      coordinates: { lat: 44.6172148, lng: -63.59483640000001 },
      duration: "weekly",
      price: "80",
      totalSpots: "2",
      userName: "JohnDoe",
      email: "johndoe@gmail.com",
      imageurl:
        "https://firebasestorage.googleapis.com/v0/b/ti-parkeasy.appspot.com/o/images%2Fhelloworld?alt=media&token=ae38158a-30c9-42e0-b1e2-7a8237646d40",
    },
    {
      address: "2080 Quingate Place, Halifax, NS, Canada",
      coordinates: { lat: 44.6272148, lng: -63.59483640000001 },
      duration: "weekly",
      price: "80",
      totalSpots: "2",
      userName: "JohnDoe",
      email: "johndoe@gmail.com",
      imageurl:
        "https://firebasestorage.googleapis.com/v0/b/ti-parkeasy.appspot.com/o/images%2Fhelloworld?alt=media&token=ae38158a-30c9-42e0-b1e2-7a8237646d40",
    },
  ];

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time, you can replace this with your actual loading logic
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(loadingTimeout);
  }, []);

  const handleMapClick = () => {
    // Handle map click event if needed
  };

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const handleInfoWindowClose = () => {
    setSelectedMarker(null);
  };

  const renderMarkers = () => {
    console.log(markers);
    return markers.map((marker) => (
      <Marker
        key={marker.userName}
        position={{
          lat: Number(marker.coordinates.lat),
          lng: Number(marker.coordinates.lng),
        }}
        onClick={() => handleMarkerClick(marker)}
      />
    ));
  };
  const [showChatBox, setShowChatBox] = useState(false);
  const handleMessage = () => {
    setShowChatBox(!showChatBox);
  };

  const renderParkingList = () => {
    return (
      <Col xs={4} className="parking-list">
        <h4 className="mb-4 text-center">Parking Locations</h4>
        <div
          className="list-group overflow-auto custom-list-group"
          style={{ maxHeight: "80vh" }}
        >
          {parkingLocations.map((location) => (
            <div
              key={location.userName}
              onClick={() => handleMarkerClick(location)}
              className="list-group-item list-group-item-action mb-3 custom-list-item"
            >
              <h5 className="mb-2">{location.address}</h5>
              <div className="d-flex">
                <img
                  src={location.imageurl}
                  alt="Parking Location"
                  className="img-fluid me-3"
                  style={{ maxHeight: "150px", objectFit: "cover" }}
                />
                <div>
                  <ul className="list-unstyled">
                    <li>
                      <strong>Username:</strong> {location.userName}
                    </li>
                    <li>
                      <strong>Email:</strong> {location.email}
                    </li>
                    <li>
                      <strong>Duration:</strong> {location.duration}
                    </li>
                    <li>
                      <strong>Price:</strong> {location.price} CAD
                    </li>
                    <li>
                      <strong>Total Spots:</strong> {location.totalSpots}
                    </li>
                  </ul>
                  <Button variant="success" onClick={handleMessage}>
                    Message
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Col>
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setMarkers(parkingLocations);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded || isLoading) {
    return (
      <>
        <Navbar bg="success" data-bs-theme="dark">
          <Container fluid>
            <Navbar.Brand href="/">
              <Image
                src={logo}
                style={{ width: "40px", height: "40px" }}
                fluid
              />{" "}
              ParkEasy
            </Navbar.Brand>
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link href="/support">Support</Nav.Link>
              <Nav.Link href="/faq">FAQ</Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        <div class="loader">
          <svg
            class="car"
            width="102"
            height="40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              transform="translate(2 1)"
              stroke="#348e49"
              fill="#348e49"
              fill-rule="evenodd"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                class="car__body"
                d="M47.293 2.375C52.927.792 54.017.805 54.017.805c2.613-.445 6.838-.337 9.42.237l8.381 1.863c2.59.576 6.164 2.606 7.98 4.531l6.348 6.732 6.245 1.877c3.098.508 5.609 3.431 5.609 6.507v4.206c0 .29-2.536 4.189-5.687 4.189H36.808c-2.655 0-4.34-2.1-3.688-4.67 0 0 3.71-19.944 14.173-23.902zM36.5 15.5h54.01"
                stroke-width="3"
              />
              <ellipse
                class="car__wheel--left"
                stroke-width="3.2"
                fill="#FFF"
                cx="83.493"
                cy="30.25"
                rx="6.922"
                ry="6.808"
              />
              <ellipse
                class="car__wheel--right"
                stroke-width="3.2"
                fill="#FFF"
                cx="46.511"
                cy="30.25"
                rx="6.922"
                ry="6.808"
              />
              <path
                class="car__line car__line--top"
                d="M22.5 16.5H2.475"
                stroke-width="3"
              />
              <path
                class="car__line car__line--middle"
                d="M20.5 23.5H.4755"
                stroke-width="3"
              />
              <path
                class="car__line car__line--bottom"
                d="M25.5 9.5h-19"
                stroke-width="3"
              />
            </g>
          </svg>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar bg="success" data-bs-theme="dark">
        <Container fluid>
          <Navbar.Brand href="/">
            <Image src={logo} style={{ width: "40px", height: "40px" }} fluid />{" "}
            ParkEasy
          </Navbar.Brand>
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link href="/support">Support</Nav.Link>
            <Nav.Link href="/faq">FAQ</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container fluid>
        <Row>
          {isLoaded && renderParkingList()}
          <Col xs={8} style={{ marginTop: "20px" }}>
            {isLoaded && (
              <GoogleMap
                mapContainerStyle={{
                  height: "85vh",
                  width: "100%",
                }}
                center={{
                  lat: 44.6472148,
                  lng: -63.59483640000001,
                }}
                zoom={12}
                onClick={handleMapClick}
                onLoad={(map) => setMap(map)}
              >
                {renderMarkers()}
                {selectedMarker && (
                  <InfoWindow
                    position={{
                      lat: selectedMarker.coordinates.lat,
                      lng: selectedMarker.coordinates.lng,
                    }}
                    onCloseClick={handleInfoWindowClose}
                  >
                    <Card className="custom-card">
                      <Card.Body>
                        <Card.Title className="custom-title">
                          {selectedMarker.userName}
                        </Card.Title>
                        <ul className="list-unstyled">
                          <li>
                            <strong>Email:</strong> {selectedMarker.email}
                          </li>
                          <li>
                            <strong>Address:</strong> {selectedMarker.address}
                          </li>
                          <li>
                            <strong>Duration:</strong> {selectedMarker.duration}
                          </li>
                          <li>
                            <strong>Price:</strong> {selectedMarker.price} CAD
                          </li>
                          <li>
                            <strong>Total Spots:</strong>{" "}
                            {selectedMarker.totalSpots}
                          </li>
                        </ul>
                      </Card.Body>
                    </Card>
                  </InfoWindow>
                )}
              </GoogleMap>
            )}
          </Col>
        </Row>
        {showChatBox && <ChatBox from="admin123" to="margin123" />}
      </Container>
    </>
  );
};

export default Finder;
