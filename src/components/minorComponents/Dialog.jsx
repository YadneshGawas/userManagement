import { Dialog } from "@headlessui/react";
import { FaQuestion } from "react-icons/fa";
import Wrapper from "./Wrapper";
import CustomButton from "./CustomButton";

export default function ConfirmationDialog({ open, setOpen, onClick }) {
  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <Wrapper open={open} setOpen={closeDialog}>
        <div className="py-4 w-full flex flex-col gap-4 items-center justify-center">
          <Dialog.Title as="h3" className="w-full flex justify-center">
            <p
              className={
                "inline-block p-3 rounded-full text-red-600 bg-red-200"
              }
            >
              <FaQuestion size={60} />
            </p>
          </Dialog.Title>

          <p className="text-center text-gray-500">
            {"Are you sure you want to delete the selected record?"}
          </p>

          <div className="bg-gray-50 py-3 gap-4 flex justify-center items-center">
            <CustomButton
              type="button"
              className={
                " px-8 text-sm font-semibold text-white sm:w-auto bg-red-600 hover:bg-red-500"
              }
              onClick={onClick}
              label="Delete"
            />

            <CustomButton
              type="button"
              className="bg-white px-8 text-sm font-semibold text-gray-900 sm:w-auto border"
              onClick={() => closeDialog()}
              label="Cancel"
            />
          </div>
        </div>
      </Wrapper>
    </>
  );
}
