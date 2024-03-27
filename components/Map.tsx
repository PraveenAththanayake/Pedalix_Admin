import React from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import useFirebaseData from "@/hooks/useFirebaseData";

interface MapProps {
  center?: google.maps.LatLngLiteral;
  zoom?: number;
  onClick?: (event: google.maps.MapMouseEvent) => void;
  selectedLocation?: google.maps.LatLngLiteral;
  containerStyle: React.CSSProperties;
}

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

const Map = ({
  zoom = 10,
  onClick,
  selectedLocation,
  containerStyle,
}: MapProps) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDfd43AVuZ-MC7bx0nrfSaVKYLN2WBN_yI",
  });

  const { userLocations } = useFirebaseData();

  const pinIcon = isLoaded
    ? {
        url: "/assets/Record.png",
        scaledSize: new google.maps.Size(20, 20), // size in pixels
      }
    : {};

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      options={options}
      center={center}
      zoom={zoom}
      onClick={onClick}
    >
      {userLocations.map((userLocation, index) => (
        <MarkerF
          key={index}
          position={{
            lat: userLocation.location.latitude,
            lng: userLocation.location.longitude,
          }}
          icon={pinIcon.url ? pinIcon : undefined}
        />
      ))}
      {selectedLocation && <MarkerF position={selectedLocation} />}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default Map;
