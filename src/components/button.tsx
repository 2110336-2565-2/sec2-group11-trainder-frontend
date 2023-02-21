type ButtonProps = {
  name: string;
  onClick?: () => void;
  disabled?: boolean;
  width?: string;
  margin?: string;
  type?: "button" | "submit" | "reset";
};

export const Button = (props: ButtonProps) => {
  return (
    <button
      className={`${props.width ?? "w-full"} py-2.5 px-3 ${
        props.margin ?? "my-3"
      } ${
        props.disabled
          ? "bg-gray-light text-gray"
          : "bg-pink hover:bg-pink-dark text-white"
      } shadow rounded-xl`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled ?? false}
    >
      {props.name}
    </button>
  );
};
