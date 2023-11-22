import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const libraries = ["places"];

const LocationPicker = () => {
  const [address, setAddress] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [hoveredLocation, setHoveredLocation] = useState(null);

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

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div>
      <Row>
        <Col>
          <Form.Group controlId="formAddress">
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
        <Col>
          <div style={{ height: "600px", width: "100%" }}>
            <GoogleMap
              mapContainerStyle={{ height: "600px", width: "100%" }}
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
      <Row>
        <Col>
          <Form.Group controlId="formSelectedAddress">
            <Form.Label>Selected Address:</Form.Label>
            <Form.Control readOnly value={address} />
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default LocationPicker;
