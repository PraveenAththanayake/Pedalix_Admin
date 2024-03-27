import { Input } from "../ui/input";
import { useState, useEffect, useRef, useTransition } from "react";
import { Button } from "../ui/button";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitLocation } from "@/actions/locations";
import { useJsApiLoader } from "@react-google-maps/api";
import { Label } from "../ui/label";
import { toast } from "sonner";
import { DockSchema } from "@/schemas";
import { CardWrapper } from "./card_wrapper";
import Map from "../Map";

const AddPlaceToMap = () => {
  const [locationInput, setLocationInput] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [status, setStatus] = useState("Initializing...");
  const [selectedLocation, setSelectedLocation] =
    useState<google.maps.LatLngLiteral | null>(null);
  const locationRef = useRef<HTMLInputElement | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof DockSchema>>({
    resolver: zodResolver(DockSchema),
    defaultValues: {
      name: "",
      // picture: "",
    },
  });

  const {
    formState: { errors },
  } = form;

  const onMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      setSelectedLocation(event.latLng.toJSON());
      reverseGeocode(event.latLng.lat(), event.latLng.lng());
    }
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDfd43AVuZ-MC7bx0nrfSaVKYLN2WBN_yI",
  });

  const reverseGeocode = (latitude: number, longitude: number) => {
    if (isLoaded) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode(
        { location: { lat: latitude, lng: longitude } },
        (results, status) => {
          if (status === "OK" && results && results[0]) {
            setLocationInput(results[0].formatted_address);
            form.setValue("name", results[0].formatted_address);
          } else {
            console.warn("Geocoder failed: " + status);
          }
        }
      );
    }
  };

  useEffect(() => {
    function success(position: { coords: { latitude: any; longitude: any } }) {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      setLatitude(lat);
      setLongitude(lng);
      setStatus("Location Found");
      reverseGeocode(lat, lng);
    }

    function error() {
      setStatus("Unable to retrieve location");
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error, {
        enableHighAccuracy: true,
      });
    } else {
      setStatus("Geolocation not supported");
    }
  }, []);

  const handleSubmit = async (e: {
    preventDefault: () => void;
    target: {
      name: { value: any };
    };
  }) => {
    e.preventDefault();
    startTransition(async () => {
      if (selectedLocation) {
        const name = e.target.name.value;
        const { lat, lng } = selectedLocation;

        const submissionResult = await submitLocation({
          name,
          lat: lat.toString(),
          lng: lng.toString(),
        });

        if (submissionResult.success) {
          toast.success(submissionResult.success);
        } else {
          toast.error(submissionResult.error);
        }

        form.reset();
      }
    });
  };

  return (
    <CardWrapper headerLabel="Add a Place" desc="Your places will add to map">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
              placeholder="Name of your accommodation"
              name="name"
              disabled={isPending}
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="location">Location</Label>
            <Input
              placeholder="Select location from map or start typing..."
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              ref={locationRef}
              name="location"
              disabled={isPending}
            />
          </div>

          <div className="h-[200px]">
            <Map
              containerStyle={{ height: "100%", width: "100%" }}
              zoom={16.5}
              onClick={onMapClick}
              selectedLocation={selectedLocation || undefined}
            />
          </div>
        </div>
        <Button className="w-full mt-4" type="submit" disabled={isPending}>
          Add to map
        </Button>
      </form>
    </CardWrapper>
  );
};

export default AddPlaceToMap;
