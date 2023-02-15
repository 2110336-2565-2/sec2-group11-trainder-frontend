import { useEffect, useMemo, useState } from "react";
import { DirectionsRenderer, GoogleMap, MarkerF } from "@react-google-maps/api";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { setHttpClientAndAgentOptions } from "next/dist/server/config";

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;
type MarkerOptions = google.maps.MarkerOptions;
type DirectionResult = google.maps.DirectionsResult;
type MapProps = {
  userAddress: string;
  trainerAddress: string;
};

export default function Map({ userAddress, trainerAddress }: MapProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [userCoordinate, setUserCoordinate] = useState<LatLngLiteral>({
    lat: 0,
    lng: 0,
  });
  const [trainerCoordinate, setTrainerCoordinate] = useState<LatLngLiteral>({
    lat: 0,
    lng: 0,
  });
  const [direction, setDirection] = useState<DirectionResult>();
  useEffect(() => {
    setLoading(true);
    getGeocode({ address: userAddress }).then((results) => {
      const { lat, lng } = getLatLng(results[0]);
      setUserCoordinate({ lat, lng });
    });
    getGeocode({ address: trainerAddress }).then((results) => {
      const { lat, lng } = getLatLng(results[0]);
      setTrainerCoordinate({ lat, lng });
    });
    setLoading(false);
  }, [direction,userAddress,trainerAddress]);
  const service = new google.maps.DirectionsService();

  service.route(
    {
      origin: userCoordinate,
      destination: trainerCoordinate,
      travelMode: google.maps.TravelMode.DRIVING,
    },
    (result, status) => {
      if (status === "OK" && result) {
        setDirection(result);
      }
    }
  );

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
  if (loading) return <div>loading</div>;
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
          <DirectionsRenderer
            directions={direction}
            options={{
              polylineOptions: {
                zIndex: 50,
                strokeColor: "#1976D2",
                strokeWeight: 5,
              },
            }}
          />
      </GoogleMap>
    </>
  );
}
