import React from "react";
import clsx from "clsx";

const InputText = React.forwardRef(
  (
    {
      type,
      placeholder,
      label,
      className,
      name,
      register,
      error,
      id,
      readOnly,
      min,
      icon,
      onChange,
      value,
    },
    ref
  ) => {
    return (
      <div>
        <div className="relative">
          {label && (
            <label htmlFor={name} className="block text-slate-800 mb-2">
              {label}
            </label>
          )}
          {icon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              {icon}
            </div>
          )}
          <input
            type={type}
            name={name}
            id={id}
            value={value}
            placeholder={placeholder}
            readOnly={readOnly}
            ref={ref}
            onChange={onChange}
            {...register}
            aria-invalid={error ? "true" : "false"}
            className={clsx(
              "block w-full bg-white py-1.5 pr-3 text-base text-black border border-gray-300 placeholder:text-gray-500 focus:outline-none",
              icon ? "pl-10" : "pl-3",
              className
            )}
            // supply these for form px-2.5 py-2.5 2xl:py-3
            // supply rounded-3xl for control panel
            min={min}
          />
        </div>
        {error && (
          <span className="text-xs text-[#fb0606fe] mt-0.5 ">{error}</span>
        )}
      </div>
    );
  }
);

export default InputText;
