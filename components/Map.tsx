// Map.js

import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import useFirebaseData from "@/hooks/useFirebaseData";

const containerStyle = {
  width: "100%",
  height: "1000px",
  borderRadius: "10px",
};

const options = {
  mapId: "9f61529698b48602",
  mapTypeControl: false,
  zoomControl: false,
  fullscreenControl: false,
  clickableIcons: false,
  scrollwheel: true,
  streetViewControl: false,
};

const center = {
  lat: 6.821456927849568,
  lng: 80.04150852388756,
};

const pinIcon = {
  url: "/assets/Record.png",
  scaledSize: new window.google.maps.Size(30, 30),
};

const Map = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDfd43AVuZ-MC7bx0nrfSaVKYLN2WBN_yI",
  });

  const { userLocations } = useFirebaseData();

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      options={options}
      center={center}
      zoom={16}
    >
      {userLocations.map((userLocation, index) => (
        <Marker
          key={index}
          position={{
            lat: userLocation.location.latitude,
            lng: userLocation.location.longitude,
          }}
          icon={pinIcon}
        />
      ))}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default Map;
