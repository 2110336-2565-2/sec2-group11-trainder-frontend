import { Listbox } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

type DropdownProps = {
  name: string;
  value: string | string[];
  onChange: ((select: string[]) => void) | ((select: string) => void);
  options: string[];
  multiple: boolean;
  placeholder?: string;
  width?: string;
};

export const Dropdown = (props: DropdownProps) => {
  return (
    <>
      <Listbox
        value={props.value}
        onChange={props.onChange}
        multiple={props.multiple}
        name={props.name}
      >
        <div className="relative">
          <Listbox.Button
            className={`relative ${
              props.width ?? "w-full"
            } bg-white rounded-xl text-left py-2.5 pl-3.5 pr-10 border border-gray`}
          >
            <span
              className={`block ${
                props.value ? "text-black" : "text-gray-400"
              }`}
              id={`selected_${props.name}`}
            >
              {props.value
                ? Array.isArray(props.value)
                  ? props.value.map((value) => value).join(", ")
                  : props.value
                : props.placeholder}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon className="h-6 w-6" strokeWidth={2} />
            </span>
          </Listbox.Button>
          <Listbox.Options
            className={`absolute my-2 bg-white ${
              props.width ?? "w-full"
            } rounded-xl border border-gray shadow-xl z-10`}
          >
            {props.options.map((choice: string, index) => (
              <Listbox.Option
                key={index}
                value={choice}
                disabled={index == 0 ? true : false}
                hidden={index == 0 ? true : false}
                className="py-2 px-3 hover:bg-blue rounded-lg hover:text-white hover:cursor-pointer"
              >
                {({ selected }) => (
                  <div className="inline-flex items-center">
                    {props.multiple ? (
                      <>
                        {selected ? (
                          <CheckIcon className="h-6 w-6 pr-2" strokeWidth={3} />
                        ) : (
                          <div className="h-6 w-6 pr-2"></div>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                    <p
                      className={`${selected ? "font-bold" : ""}`}
                      id={`${props.name}_choice_${index}`}
                    >
                      {choice}
                    </p>
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </>
  );
};
