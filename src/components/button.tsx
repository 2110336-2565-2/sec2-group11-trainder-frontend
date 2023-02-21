type ButtonProps = {
  name: string;
  onClick?: () => void;
  width?: string;
  margin?: string;
  type?: "button" | "submit" | "reset";
};

export const Button = (props: ButtonProps) => {
  return (
    <button
      className={`${props.width ?? "w-full"} py-2.5 px-3 ${
        props.margin ?? "my-3"
      } bg-pink hover:bg-pink-dark shadow rounded-xl text-white`}
      type={props.type}
      onClick={props.onClick}
    >
      {props.name}
    </button>
  );
};
