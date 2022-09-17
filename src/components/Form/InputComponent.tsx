import { FC, InputHTMLAttributes } from "react";

interface IInputComponentProps extends InputHTMLAttributes<HTMLInputElement> {}

const InputComponent: FC<IInputComponentProps> = ({ ...props }) => {
  return (
    <input
      {...props}
      className="bg-zinc-900  py-3 px-4 rounded text-small placeholder:text-zinc-500"
    />
  );
};

export default InputComponent;
