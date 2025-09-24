/* eslint-disable no-unused-vars */
import clsx from "clsx";
import React from "react";

const CustomButton = ({
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
      {icon && <span>{icon}</span>}
      <span>{label}</span>
    </button>
  );
};

export default CustomButton;
