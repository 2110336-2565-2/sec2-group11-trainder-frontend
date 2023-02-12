import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

export default function Places() {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const onSuggestionClick = (description: string) => {
    setValue(description, false);
    clearSuggestions();
    getGeocode({ address: description }).then((results) => {
      const { lat, lng } = getLatLng(results[0]);
      console.log("📍 Coordinates: ", { lat, lng });
    });
  };

  return (
    <div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        type="text"
        placeholder="Sub district, District, Province"
        className="w-full pl-3.5 py-2.5 mt-2 mb-2 mx-2 block border border-gray rounded-xl"
      />
      <div>
        {status === "OK" &&
          data.map(({ description }) => (
            <div
              key={description}
              onClick={() => onSuggestionClick(description)}
              className="w-full pl-3.5 py-2.5 mt-2 mb-2 mx-2 block border border-gray rounded-xl text-black hover:cursor-pointer"
            >
              {description}
            </div>
          ))}
      </div>
    </div>
  );
}
