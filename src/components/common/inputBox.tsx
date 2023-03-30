type InputBoxProps = {
  type: string;
  placeholder: string;
  name: string;
  required: boolean;
  margin?: string;
  borderColor?: string;
  pattern?: string;
  icon?: any;
};

export const InputBox = (props: InputBoxProps) => {
  return (
    <div className="relative flex items-center">
      <input
        className={`w-full py-2.5 ${
          props.margin ?? "m-2"
        } pl-3.5 block border ${
          props.borderColor ?? "border-gray"
        } rounded-xl ${props.icon != null ? "pl-3.5 pr-12" : "px-3.5"}`}
        placeholder={props.placeholder}
        type={props.type === "date" ? "text" : props.type}
        onFocus={
          props.type === "date" ? (e) => (e.target.type = "date") : undefined
        }
        onBlur={
          props.type === "date" ? (e) => (e.target.type = "text") : undefined
        }
        pattern={props.pattern}
        required={props.required}
        name={props.name}
      />
      {props.icon != null ? <>{props.icon}</> : <></>}
    </div>
  );
};
