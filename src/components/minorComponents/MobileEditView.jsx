/* eslint-disable no-unused-vars */
import { Dialog } from "@headlessui/react";
import { use, useEffect } from "react";
import { useForm } from "react-hook-form";
import CustomButton from "./CustomButton";
import InputText from "./InputText";
import Wrapper from "./Wrapper";

const MobileEditView = ({
  open,
  setOpen,
  userData,
  deleteHandler,
  handleStatusChange,
}) => {
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
          <div className="mt-4 gap-3 items-start flex flex-col">
            <div>
              <span>Current Status</span>
            </div>
            <div className="flex items-center gap-2">
              {userData && (
                <span
                  className={`w-3 h-3 rounded-full ${userData.isActive ? "bg-green-500" : "bg-red-500"}`}
                ></span>
              )}
              {userData && (
                <span>{userData.isActive ? "Active" : "Inactive"}</span>
              )}
            </div>
          </div>

          <div className="py-3 mt-4 flex justify-end gap-2">
            <CustomButton
              type="button"
              className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md 2xl:py-2.5"
              label={"Toggle Status"}
              onClick={() =>
                userData && handleStatusChange(userData._id, !userData.isActive)
              }
            />
            <CustomButton
              type="button"
              className="flex flex-row-reverse gap-1 items-center bg-red-500 text-white rounded-md 2xl:py-2.5"
              label="Delete"
              onClick={() => deleteHandler(userData)}
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

export default MobileEditView;
