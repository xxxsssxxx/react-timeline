import { FC, MouseEvent } from "react";
import { IButtonTypes } from "../../../interfaces/interfaces";
type Props = {
  type: string,
  text: string,
  click?: (e: MouseEvent) => void
};

const BaseButton: FC<Props> = ({ type, text, click }) => {
  const typesMap: IButtonTypes = {
    primary: "bg-primary",
    success: "bg-green-600",
    danger: "bg-red-600"
  };

  return (
    <button
      className={`uppercase px-2 py-2 rounded ${
        typesMap[type as keyof IButtonTypes]
      } text-xs text-blue-50 max-w-max shadow-sm hover:shadow-md my-2`}
      onClick={click}
    >
      <span>{text}</span>
    </button>
  );
};

export default BaseButton;
