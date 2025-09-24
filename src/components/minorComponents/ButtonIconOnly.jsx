/* eslint-disable no-unused-vars */
import clsx from "clsx";
import React from "react";

const ButtonIconOnly = ({
  icon,
  className,
  label,
  type,
  onClick = () => {},
  status,
}) => {
  return (
    <button
      type={type || "button"}
      className={clsx("px-3 py-2", className)}
      disabled={status}
      onClick={() => {
        onClick();
      }}
    >
      <span>{label}</span>
    </button>
  );
};

export default ButtonIconOnly;
