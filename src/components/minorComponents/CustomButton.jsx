import { Button } from "@headlessui/react";
import { CiExport } from "react-icons/ci";

export default function CustomButton() {
  return (
    <Button className="group inline-flex items-center justify-center sm:justify-start sm:gap-2 rounded-full sm:rounded-3xl bg-white p-4 sm:px-3 sm:py-1.5 text-sm/6 font-semibold text-gray-500 shadow-inner shadow-white/10 data-hover:bg-gray-600 data-hover:text-white border border-gray-300">
      <CiExport className="h-5 w-5 text-gray-500 group-data-hover:text-white" />
      <span>Export</span>
    </Button>
  );
}
