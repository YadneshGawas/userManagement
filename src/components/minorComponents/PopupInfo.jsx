/* eslint-disable no-unused-vars */
import { Dialog } from "@headlessui/react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import CustomButton from "./CustomButton";
import InputText from "./InputText";
import Wrapper from "./Wrapper";

const PopupInfo = ({ open, setOpen, userData }) => {
  const {
    register,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (userData) {
      reset(userData);
    }
  }, [userData, reset]);

  return (
    <>
      <Wrapper open={open} setOpen={setOpen}>
        <form>
          <Dialog.Title
            as="h2"
            className="text-base font-bold leading-6 text-gray-900 mb-4"
          >
            User Info
          </Dialog.Title>
          <div className="mt-2 flex flex-col gap-6">
            <InputText
              placeholder="Full name"
              type="text"
              name="name"
              readOnly={true}
              label="Full Name"
              className="w-full rounded"
              register={register("name", {
                required: "Full name is required!",
              })}
              error={errors.name ? errors.name.message : ""}
            />
            <InputText
              placeholder="Email Address"
              type="email"
              name="email"
              readOnly={true}
              label="Email Address"
              className="w-full rounded"
              register={register("email", {
                required: "Email Address is required!",
              })}
              error={errors.email ? errors.email.message : ""}
            />
          </div>

          <div className="py-3 mt-4 flex justify-end gap-2">
            <CustomButton
              type="button"
              className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto hover:cursor-pointer"
              onClick={() => setOpen(false)}
              label="Close"
            />
          </div>
        </form>
      </Wrapper>
    </>
  );
};

export default PopupInfo;
