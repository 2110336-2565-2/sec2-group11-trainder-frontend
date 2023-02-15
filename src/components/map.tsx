import { useEffect, useMemo, useState } from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { getGeocode, getLatLng } from "use-places-autocomplete";

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;
type MarkerOptions = google.maps.MarkerOptions;
type Maprops = {
  userAddress: string;
};
type Coordinate = {
  lat: number;
  lng: number;
};

export default function Map({ userAddress }: Maprops) {
  const [loading, setLoading] = useState<boolean>(true);
  const [userCoordinate, setUserCoordinate] = useState<Coordinate>({
    //chula Geocode
    lat: 13.738481206157571,
    lng: 100.53241615351133,
  });
  //Set user Geocode
  useEffect(() => {
    getGeocode({ address: userAddress }).then((results) => {
      const { lat, lng } = getLatLng(results[0]);
      setUserCoordinate({ lat, lng });
      setLoading(false);
    });
  }, []);
  const center = useMemo<LatLngLiteral>(
    () => ({ lat: userCoordinate.lat, lng: userCoordinate.lng }),
    []
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

  return (
    <>
      {!loading && (
        <GoogleMap
          zoom={14}
          center={center}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={mapOptions}
        >
          <MarkerF position={center} options={markerOptions} />
        </GoogleMap>
      )}
    </>
  );
}
