import { type ReactNode } from "react";
import classNames from "classnames";

import styles from "./styles.module.css";

interface IButtonProps {
  type?: "button" | "submit";
  onClick: () => void;
  customIcon?: ReactNode;
  label: string;
  extClassNames?: { button: string };
}

export function Button({
  type = "button",
  onClick,
  customIcon,
  label,
  extClassNames,
}: IButtonProps) {
  return (
    <button
      type={type}
      className={classNames(styles.button, extClassNames?.button)}
      onClick={onClick}
    >
      {customIcon}
      <span>{label}</span>
    </button>
  );
}
