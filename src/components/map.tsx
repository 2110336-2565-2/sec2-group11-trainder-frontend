import { useMemo } from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;

export default function Map() {
  const center = useMemo<LatLngLiteral>(
    () => ({ lat: 13.738481206157571, lng: 100.53241615351133 }),
    []
  );

  const options = useMemo<MapOptions>(
    () => ({
      mapId: "c01bd34cdeea52b2",
    }),
    []
  );

  return (
    <GoogleMap
      zoom={16}
      center={center}
      mapContainerStyle={{ width: "100%", height: "100%" }}
      options={options}
    >
      <MarkerF position={center} />
    </GoogleMap>
  );
}
