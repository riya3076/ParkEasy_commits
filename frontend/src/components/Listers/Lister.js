import React, { useState, useEffect } from "react";
import {
  Form,
  Row,
  Col,
  Navbar,
  Container,
  Nav,
  Image,
  Button,
  Spinner,
} from "react-bootstrap";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import axios from "axios";
import logo from "../assets/ParkEasy.png";
import "../Listers/CSS/Lister.css";
const libraries = ["places"];

const Lister = () => {
  const [address, setAddress] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [hoveredLocation, setHoveredLocation] = useState(null);

  const [totalSpots, setTotalSpots] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("daily");

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCCW8GIa8MXFBzdmKFWJs5PL77pHIOtJaU",
    libraries,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time, you can replace this with your actual loading logic
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  const defaultCenter = {
    lat: 44.6472148,
    lng: -63.59483640000001,
  };

  const handleMapClick = (e) => {
    setSelectedLocation({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });

    // Reverse geocode the clicked location to get the address
    geocodeByAddress(`${e.latLng.lat()}, ${e.latLng.lng()}`)
      .then((results) => setAddress(results[0].formatted_address))
      .catch((error) => console.error("Error reverse geocoding:", error));
  };

  const handleMarkerMouseOver = () => {
    setHoveredLocation(selectedLocation);
  };

  const handleMarkerMouseOut = () => {
    setHoveredLocation(null);
  };

  const handleMarkerDragEnd = (e) => {
    setSelectedLocation({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });

    // Reverse geocode the dragged location to get the address
    geocodeByAddress(`${e.latLng.lat()}, ${e.latLng.lng()}`)
      .then((results) => setAddress(results[0].formatted_address))
      .catch((error) => console.error("Error reverse geocoding:", error));
  };

  const handleChange = (newAddress) => {
    setAddress(newAddress);
  };

  const handleSelect = async (selectedAddress) => {
    setAddress(selectedAddress);

    // Geocode the selected address to get the coordinates
    try {
      const results = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(results[0]);

      setSelectedLocation(latLng);
    } catch (error) {
      console.error("Error geocoding selected address:", error);
    }
  };

  const handleSubmit = async () => {
    // Prepare data for the API call
    const data = {
      address,
      coordinates: selectedLocation,
      totalSpots,
      price,
      duration,
      // Add more fields as needed
    };

    try {
      console.log(data);
      // Make an API call using Axios
      const response = await axios.post("YOUR_API_ENDPOINT", data);

      console.log("API Response:", response.data);

      // Reset form after successful submission
      setAddress("");
      setTotalSpots("");
      setPrice("");
      setDuration("daily");
      setSelectedLocation(null);

      // Optionally, you can redirect the user to a success page or show a success message
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error (e.g., show an error message to the user)
    }
  };

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

      <Row className="justify-content-md-center mt-3">
        <Col xs={12} md={8}>
          <Form.Group controlId="formAddress" className="mt-3">
            <Form.Label>Enter Address:</Form.Label>
            <PlacesAutocomplete
              value={address}
              onChange={handleChange}
              onSelect={handleSelect}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div>
                  <input
                    {...getInputProps({ placeholder: "Type address" })}
                    className="form-control"
                  />
                  <div>
                    {loading && <div>Loading...</div>}
                    {suggestions.map((suggestion) => (
                      <div
                        {...getSuggestionItemProps(suggestion)}
                        key={suggestion.placeId}
                      >
                        {suggestion.description}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
          </Form.Group>
        </Col>
      </Row>
      <Row className="justify-content-md-center mt-3">
        <Col xs={12} md={8}>
          <div>
            <GoogleMap
              mapContainerStyle={{
                height: "400px",
                width: "100%",
              }}
              center={{
                lat: selectedLocation?.lat || defaultCenter.lat,
                lng: selectedLocation?.lng || defaultCenter.lng,
              }}
              zoom={14}
              onClick={handleMapClick}
            >
              {hoveredLocation !== null && (
                <Marker
                  position={hoveredLocation}
                  draggable={true}
                  onMouseOver={handleMarkerMouseOver}
                  onMouseOut={handleMarkerMouseOut}
                  onDragEnd={handleMarkerDragEnd}
                />
              )}

              {selectedLocation && (
                <Marker
                  position={selectedLocation}
                  draggable={true}
                  onClick={handleMarkerMouseOver}
                  onMouseOut={handleMarkerMouseOut}
                  onDragEnd={handleMarkerDragEnd}
                />
              )}
            </GoogleMap>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-md-center mt-3">
        <Col xs={12} md={8}>
          <Form.Group controlId="formTotalSpots" className="mb-3">
            <Form.Label className="form-label">
              Total Number of Parking Spots:
            </Form.Label>
            <Form.Control
              min={0}
              type="number"
              placeholder="Enter total spots"
              value={totalSpots}
              onChange={(e) => setTotalSpots(e.target.value)}
              className="form-input"
            />
          </Form.Group>

          <Form.Group controlId="formPrice" className="mb-3">
            <Form.Label className="form-label">Price in CAD:</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="form-input"
            />
          </Form.Group>

          <Form.Group controlId="formDuration" className="mb-3">
            <Form.Label className="form-label">Payment Duration:</Form.Label>
            <Form.Select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="form-input"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </Form.Select>
          </Form.Group>

          {/* Add more form fields as needed (e.g., pictures, description) */}

          <Button
            variant="primary"
            onClick={handleSubmit}
            className="submit-button"
          >
            Submit
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Lister;
