import { useMemo } from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";

export type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;
type MapProps = {
  trainerCoordinate: LatLngLiteral;
};

export default function Map({ trainerCoordinate }: MapProps) {
  const mapOptions = useMemo<MapOptions>(
    () => ({
      mapId: "ddb903d68666fa6c",
      streetViewControl: false,
      clickableIcons: false,
      disableDefaultUI: true,
    }),
    []
  );

  return (
    <>
      <GoogleMap
        zoom={10}
        center={trainerCoordinate}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        options={mapOptions}
      >
        <MarkerF position={trainerCoordinate} />
      </GoogleMap>
    </>
  );
}
