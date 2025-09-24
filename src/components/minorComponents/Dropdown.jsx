/* eslint-disable no-unused-vars */
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { MdImportExport } from "react-icons/md";
import { FaRegFilePdf } from "react-icons/fa";
import { BsFiletypeCsv } from "react-icons/bs";
import { RiFileExcel2Line } from "react-icons/ri";
import expPDF from "./../exports/expPDF";
import expCSV from "./../exports/expCSV";
import expEXCEL from "./../exports/expEXCEL";

const Dropdown = ({ users }) => {
  console.log("user from dropdown:", users);
  const handlePDF = () => {
    expPDF({ users }); // call directly
  };

  const handleCSV = () => {
    expCSV({ users });
  };

  const handleExcel = () => {
    expEXCEL({ users });
  };
  return (
    <Menu>
      <MenuButton className="group inline-flex items-center justify-center sm:justify-start sm:gap-2 rounded-full sm:rounded-3xl bg-white p-4 sm:px-3 sm:py-1.5 text-sm/6 font-semibold text-gray-500 shadow-inner shadow-white/10 hover:bg-gray-600 hover:text-white border border-gray-300 focus:outline-none">
        <MdImportExport />
        Export
      </MenuButton>
      <MenuItems
        anchor="bottom"
        className="flex flex-col text-gray-500 absolute right-0 z-20 mt-2 w-56 origin-top-right rounded-xl bg-white shadow-2xl border border-gray-300 focus:outline-none divide-y divide-gray-200"
      >
        <MenuItem
          key={"export"}
          className="inline-flex p-3 data-[focus]:bg-gray-100"
        >
          <button
            className="text-gray-700 group flex w-full items-center rounded-md px-2 py-2 text-base"
            onClick={handlePDF}
          >
            <FaRegFilePdf className="mr-2" aria-hidden="true" />
            Export PDF
          </button>
        </MenuItem>
        <MenuItem
          key={"export"}
          className="inline-flex p-3 data-[focus]:bg-gray-100"
        >
          <button
            className="text-gray-700 group flex w-full items-center rounded-md px-2 py-2 text-base"
            onClick={handleCSV}
          >
            <BsFiletypeCsv className="mr-2" aria-hidden="true" />
            Export CSV
          </button>
        </MenuItem>
        <MenuItem
          key={"export"}
          className="inline-flex p-3 data-[focus]:bg-gray-100"
        >
          <button
            className="text-gray-700 group flex w-full items-center rounded-md px-2 py-2 text-base"
            onClick={handleExcel}
          >
            <RiFileExcel2Line className="mr-2" aria-hidden="true" />
            Export Excel
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default Dropdown;
