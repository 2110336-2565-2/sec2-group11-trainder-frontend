import { useMemo } from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";

export type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;
type MarkerOptions = google.maps.MarkerOptions;
type MapProps = {
  userCoordinate: LatLngLiteral;
  trainerCoordinate: LatLngLiteral;
};

export default function Map({ userCoordinate, trainerCoordinate }: MapProps) {
  const mapOptions = useMemo<MapOptions>(
    () => ({
      mapId: "ddb903d68666fa6c",
    }),
    []
  );

  const markerOptions = (fillColor: string, label: string) => ({
    icon: {
      path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
      scale: 8,
      fillColor,
      fillOpacity: 1,
      strokeWeight: 2,
      strokeColor: "pink",
    },
    label: {
      text: label,
      color: "#EC5959",
      fontFamily: "Lexend Deca",
      fontSize: "1em",
      fontWeight: "bold",
    },
  });

  const trainerMarkerOptions = useMemo<MarkerOptions>(
    () => markerOptions("#EC5959", "Trainer"),
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
        <MarkerF position={trainerCoordinate} options={trainerMarkerOptions} />
      </GoogleMap>
    </>
  );
}
