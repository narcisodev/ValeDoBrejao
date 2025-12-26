import React from "react";
import styles from "./button.module.css";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  color?: "default" | "red" | "blue";
}

export default function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  color = "default",
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[color]}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
