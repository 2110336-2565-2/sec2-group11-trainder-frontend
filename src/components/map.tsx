import { useMemo } from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;
type MarkerOptions = google.maps.MarkerOptions;

export default function Map() {
  const center = useMemo<LatLngLiteral>(
    () => ({ lat: 13.738481206157571, lng: 100.53241615351133 }),
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
    }),
    []
  );

  return (
    <GoogleMap
      zoom={14}
      center={center}
      mapContainerStyle={{ width: "100%", height: "100%" }}
      options={mapOptions}
    >
      <MarkerF position={center} options={markerOptions} />
    </GoogleMap>
  );
}
