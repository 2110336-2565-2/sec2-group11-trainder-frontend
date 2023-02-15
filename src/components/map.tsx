import { useMemo } from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";

export type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;
type MarkerOptions = google.maps.MarkerOptions;
type DirectionResult = google.maps.DirectionsResult;
type MapProps = {
  userCoordinate: LatLngLiteral;
  trainerCoordinate: LatLngLiteral;
};

export default function Map({ userCoordinate, trainerCoordinate }: MapProps) {
  console.log(userCoordinate, trainerCoordinate);
  const mapOptions = useMemo<MapOptions>(
    () => ({
      mapId: "ddb903d68666fa6c",
    }),
    []
  );

  const markerOptions = useMemo<MarkerOptions>(
    () => ({
      icon: {
        path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
        scale: 8,
        fillColor: "#EC5959",
        fillOpacity: 1,
        strokeWeight: 2,
        strokeColor: "pink",
      },
      label: {
        text: "Me",
        color: "#EC5959",
        fontFamily: "Lexend Deca",
        fontSize: "1em",
        fontWeight: "bold",
      },
    }),
    []
  );
  return (
    <>
      <GoogleMap
        zoom={14}
        center={userCoordinate}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        options={mapOptions}
      >
        <MarkerF position={userCoordinate} options={markerOptions} />
        <MarkerF position={trainerCoordinate} />
      </GoogleMap>
    </>
  );
}
