import { useCallback, useState } from "react";
import usePlacesAutocomplete from "use-places-autocomplete";

export default function Places() {
  const [isSelected, setIsSelected] = useState<boolean>(true);
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const onSuggestionClick = useCallback(
    (description: string) => {
      setValue(description, false);
      setIsSelected(true);
      clearSuggestions();
    },
    [clearSuggestions, setValue]
  );

  return (
    <>
      <input
        value={value}
        onChange={(e) => {
          setIsSelected(false);
          setValue(e.target.value);
        }}
        disabled={!ready}
        type="text"
        placeholder="House No. & Street"
        className={`w-full pl-3.5 py-2.5 mt-2 mb-2 mx-2 block border ${
          isSelected ? "border-gray" : "border-pink-dark"
        } rounded-xl`}
        name="address"
        id="address"
      />
      {!isSelected ? (
        <p className="text-sm mx-4 mb-2 text-pink-dark">
          Please select the address from the suggestions.
        </p>
      ) : (
        <></>
      )}
      <div>
        {status === "OK" &&
          data.map(({ description }) => (
            <div
              key={description}
              onClick={() => onSuggestionClick(description)}
              className="w-full pl-3.5 py-2.5 mt-2 mb-2 mx-2 block border border-gray rounded-xl text-black hover:cursor-pointer hover:bg-gray hover:bg-opacity-60"
            >
              {description}
            </div>
          ))}
      </div>
    </>
  );
}
