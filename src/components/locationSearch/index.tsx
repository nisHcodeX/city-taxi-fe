import React, { FC, useEffect, useRef, useState } from "react";
import { TextField } from "@mui/material";
import { usePlacesWidget } from "react-google-autocomplete";


type Props = {
  initialLat?: number;
  initialLng?: number;
  apiKey?: string;
  results: (data: { 
    address: string; 
    lat: number; 
    lng: number; 
  }) => void; 
};

const GeocodingAutocomplete: FC<Props> = ({ initialLat, initialLng, results }) => {
  const [address, setAddress] = useState<string>("");
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const { ref } = usePlacesWidget({
    apiKey : 'AIzaSyAjmXiD-nVEaLyalBEB8mUDtLkvCtjID6I',
    onPlaceSelected: (place) => {
      if (place?.geometry?.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setCoordinates({ lat, lng });
        setAddress(place.formatted_address || "");
        results({address: place.formatted_address || "", lat, lng})
      }
    },
    options: {
      types: ["geocode", "establishment"],
    },
  });

  useEffect(() => {
    if (initialLat && initialLng) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: { lat: initialLat, lng: initialLng } }, (results: any, status: any) => {
        if (status === "OK" && results[0]) {
          setAddress(results[0].formatted_address);
          setCoordinates({ lat: initialLat, lng: initialLng });
        } else {
          console.error("Geocode error: ", status);
        }
      });
    }
  }, [initialLat, initialLng]);

  return (
    <TextField
      fullWidth
      label="Location"
      inputRef={ref}
      value={address}
      onChange={(e) => setAddress(e.target.value)}
    />
  );
};

export default GeocodingAutocomplete;
