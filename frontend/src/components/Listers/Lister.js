import React, { useState } from "react";
import {
  Form,
  Row,
  Col,
  Navbar,
  Container,
  Nav,
  Image,
  Button,
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
  if (!isLoaded) return "Loading Maps";

  return (
    <div>
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
          <div style={{}}>
            <GoogleMap
              mapContainerStyle={{ height: "400px", width: "100%" }}
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
    </div>
  );
};

export default Lister;
