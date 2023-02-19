import { useEffect, useMemo, useState } from "react";
import { DirectionsRenderer, GoogleMap, MarkerF } from "@react-google-maps/api";

export type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;
type MarkerOptions = google.maps.MarkerOptions;
type DirectionsResult = google.maps.DirectionsResult;
type MapProps = {
  userCoordinate: LatLngLiteral;
  trainerCoordinate: LatLngLiteral;
};

export default function Map({ userCoordinate, trainerCoordinate }: MapProps) {
  const [directions, setDirections] = useState<DirectionsResult>();

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

  const userMarkerOptions = useMemo<MarkerOptions>(
    () => markerOptions("#EC5959", "Me"),
    []
  );
  const trainerMarkerOptions = useMemo<MarkerOptions>(
    () => markerOptions("black", "Trainer"),
    []
  );

  useEffect(() => {
    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: userCoordinate,
        destination: trainerCoordinate,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);
        }
      }
    );
  }, [userCoordinate, trainerCoordinate]);

  return (
    <>
      <GoogleMap
        zoom={10}
        center={trainerCoordinate}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        options={mapOptions}
      >
        <MarkerF position={trainerCoordinate} options={trainerMarkerOptions} />
        <MarkerF position={userCoordinate} options={userMarkerOptions} />
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              polylineOptions: {
                zIndex: 50,
                strokeColor: "#EC5959",
                strokeWeight: 3,
              },
              suppressMarkers: true,
            }}
          />
        )}
      </GoogleMap>
      {directions &&
        directions.routes[0].legs[0].distance &&
        directions.routes[0].legs[0].duration && (
          <>
            <div>
              distance: {directions.routes[0].legs[0].distance.text} | duration:{" "}
              {directions.routes[0].legs[0].duration.text}{" "}
            </div>
          </>
        )}
    </>
  );
}
