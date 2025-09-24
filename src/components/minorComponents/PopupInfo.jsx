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
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (userData) {
      reset(userData);
    }
  }, [userData, reset]);

  //   const handleOnSubmit = async (data) => {
  //     data.isAdmin = data.isAdmin === "true";
  //     try {
  //       if (userData) {
  //         console.log(data);

  //         console.log(userData);
  //       } else {
  //         console.log(data);
  //       }
  //     } catch (error) {
  //       toast.error(error?.data?.message || error.message);
  //       console.log("Error", error);
  //     }
  //   };

  return (
    <>
      <Wrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit()} className="">
          <Dialog.Title
            as="h2"
            className="text-base font-bold leading-6 text-gray-900 mb-4"
          >
            Edit User
          </Dialog.Title>
          <div className="mt-2 flex flex-col gap-6">
            <InputText
              placeholder="Full name"
              type="text"
              name="name"
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
              className=" bg-blue-600 text-white px-5 text-sm font-semibold sm:w-auto rounded-sm hover:cursor-pointer"
              onClick={() => setOpen(false)}
              label="Submit"
            />
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
