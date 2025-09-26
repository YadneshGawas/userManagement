/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import {
  FaArrowUp,
  FaArrowDown,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import PopupInfo from "./minorComponents/PopupInfo";
import { Switch } from "@headlessui/react";
import SelectList from "./minorComponents/SelectList";
import CustomButton from "./minorComponents/CustomButton";
import clsx from "clsx";
import MobileEditView from "./minorComponents/MobileEditView";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import EnterAnimation from "./animations/EnterFade";

const UserTable = ({ users, selected, setSelected }) => {
  const [localUsers, setLocalUsers] = useState(users);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: "_id",
    direction: "ascending",
  });
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState({ id: 3, name: "15" });
  const [mobileAction, setMobileAction] = useState(false);

  const tableVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    setLocalUsers(users);
  }, [users]);

  const handleEditClick = (e) => {
    setCurrentUser(e);
    // setOpen(true);
    console.log(e);
  };

  const handleMobileClick = (e) => {
    console.log(e);
    setCurrentUser(e);
    setMobileAction(true);
  };

  const deleteHandler = (userToDelete) => {
    setLocalUsers((prev) => {
      const updated = prev.filter((user) => user._id !== userToDelete._id);
      const newTotalPages = Math.ceil(
        updated.length / Number(rowsPerPage.name)
      );
      if (currentPage > newTotalPages) setCurrentPage(newTotalPages || 1);
      return updated;
    });

    setSelected((prev) => prev.filter((user) => user._id !== userToDelete._id));
    setMobileAction(false);
    toast.success(`${userToDelete.name} deleted successfully!`);
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelected((prev) => {
        const pageUsers = paginatedUsers.filter(
          (user) => !prev.some((u) => u._id === user._id)
        );
        return [...prev, ...pageUsers];
      });
    } else {
      setSelected((prev) =>
        prev.filter((user) => !paginatedUsers.some((p) => p._id === user._id))
      );
    }
  };

  const handleSelectOne = (user) => {
    setSelected((prev) => {
      const exists = prev.some((u) => u._id === user._id);
      return exists ? prev.filter((u) => u._id !== user._id) : [...prev, user];
    });
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleStatusChange = (userId, newStatus) => {
    setLocalUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === userId ? { ...user, isActive: newStatus } : user
      )
    );

    setSelected((prevSelected) =>
      prevSelected.map((user) =>
        user._id === userId ? { ...user, isActive: newStatus } : user
      )
    );
    toast.success("Status updated successfully!");
  };

  const sortedUsers = React.useMemo(() => {
    let sortableUsers = [...localUsers];
    if (sortConfig.key !== null) {
      sortableUsers.sort((a, b) => {
        let valA = a[sortConfig.key];
        let valB = b[sortConfig.key];
        let comparison = 0;

        if (sortConfig.key === "_id") {
          comparison = Number(valA) - Number(valB);
        } else {
          comparison = String(valA).localeCompare(String(valB), undefined, {
            sensitivity: "base",
          });
        }

        return sortConfig.direction === "ascending" ? comparison : -comparison;
      });
    }
    return sortableUsers;
  }, [localUsers, sortConfig]);

  const totalPages = Math.ceil(sortedUsers.length / Number(rowsPerPage.name));

  const paginatedUsers = React.useMemo(() => {
    const startIndex = (currentPage - 1) * Number(rowsPerPage.name);
    const endIndex = startIndex + Number(rowsPerPage.name);
    return sortedUsers.slice(startIndex, endIndex);
  }, [sortedUsers, currentPage, rowsPerPage.name]);

  const isAllSelected =
    paginatedUsers.length > 0 &&
    paginatedUsers.every((u) => selected.some((s) => s._id === u._id));

  const SortableHeader = ({ children, sortKey, className }) => {
    const isSorted = sortConfig.key === sortKey;
    const direction = isSorted ? sortConfig.direction : "none";
    return (
      <th
        className={clsx("py-2 px-2 cursor-pointer", className)}
        onClick={() => handleSort(sortKey)}
      >
        <div className="flex items-center gap-2">
          {children}
          {isSorted &&
            (direction === "ascending" ? (
              <FaArrowUp size={12} />
            ) : (
              <FaArrowDown size={12} />
            ))}
        </div>
      </th>
    );
  };

  const TableHeader = () => (
    <thead className="border-b border-gray-300 sticky top-0 bg-gray-700 z-10">
      {" "}
      <tr className="text-white text-left">
        {" "}
        <th className="py-2 px-2 w-1/12">
          {" "}
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300"
            checked={isAllSelected}
            onChange={handleSelectAll}
          />{" "}
        </th>{" "}
        <SortableHeader sortKey="_id">ID</SortableHeader>{" "}
        <SortableHeader sortKey="name">Name</SortableHeader>{" "}
        <SortableHeader sortKey="email" className="hidden md:table-cell">
          {" "}
          Email{" "}
        </SortableHeader>{" "}
        <th className="py-2 px-2 w-2/12 hidden md:table-cell">Status</th>{" "}
        <th className="py-2 px-2 w-2/12">Actions</th>{" "}
      </tr>{" "}
    </thead>
  );
  const TableRow = ({
    user,
    isSelected,
    deleteHandler,
    handleEditClick,
    handleStatusChange,
  }) => (
    <tr className="border-b border-gray-200 text-gray-600 hover:bg-gray-400/10">
      <td className="p-2">
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          checked={isSelected}
          onChange={() => handleSelectOne(user)}
        />
      </td>
      <td className="p-2">{user._id.slice(-6)}</td>
      <td className="p-2">{user.name}</td>
      <td className="p-2 hidden md:table-cell">{user.email}</td>
      <td className="p-2 hidden md:table-cell">
        <div className="flex items-center gap-2">
          <span
            className={`w-3 h-3 rounded-full ${user.isActive ? "bg-green-500" : "bg-red-500"}`}
          ></span>
          <span>{user.isActive ? "Active" : "Inactive"}</span>
        </div>
      </td>
      <td className="px-2 py-2 flex flex-row gap-3 items-center text-gray-500">
        <div className="hidden md:flex gap-3 items-center">
          <MdDeleteOutline
            className="size-5 text-red-500 cursor-pointer"
            onClick={() => deleteHandler(user)}
          />
          <MdOutlineEdit
            className="size-5 text-blue-500 cursor-pointer"
            onClick={() => handleEditClick(user)}
          />
          <Switch
            checked={user.isActive}
            onChange={(newStatus) => handleStatusChange(user._id, newStatus)}
            className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 data-checked:bg-blue-600"
          >
            <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6" />
          </Switch>
        </div>

        <div className="md:hidden flex justify-center items-center w-full">
          <button
            onClick={() => handleMobileClick(user)}
            className="text-gray-700"
          >
            <BsThreeDots size={20} />
          </button>
        </div>
      </td>
    </tr>
  );

  const Pagination = ({ currentPage, totalPages }) => {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
      const pageNumbers = [];
      const maxPagesToShow = 2;
      const half = Math.floor(maxPagesToShow / 2);

      if (totalPages <= maxPagesToShow + 2) {
        for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
      } else {
        pageNumbers.push(1);
        if (currentPage > half + 2) pageNumbers.push("...");
        let start = Math.max(2, currentPage - half);
        let end = Math.min(totalPages - 1, currentPage + half);
        if (currentPage <= half + 1) end = maxPagesToShow;
        if (currentPage >= totalPages - half)
          start = totalPages - maxPagesToShow + 1;
        for (let i = start; i <= end; i++) pageNumbers.push(i);
        if (currentPage < totalPages - half - 1) pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
      return pageNumbers;
    };

    return (
      <div className="flex justify-end items-center">
        <CustomButton
          icon={<FaArrowLeft />}
          className="text-xs px-3 py-3 mx-1 bg-white border rounded-full disabled:opacity-50"
          onClick={() => setCurrentPage(currentPage - 1)}
          status={currentPage === 1}
        />
        {getPageNumbers().map((number, index) =>
          typeof number === "string" ? (
            <span key={`dots-${index}`} className="px-3 py-1 mx-1">
              ...
            </span>
          ) : (
            <CustomButton
              key={number}
              className={`text-xs px-4.5 py-3 mx-1 rounded-full ${
                currentPage === number
                  ? "bg-gray-700 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setCurrentPage(number)}
              label={number}
            />
          )
        )}
        <CustomButton
          icon={<FaArrowRight />}
          className="text-xs px-3 py-3 mx-1 bg-white border rounded-full disabled:opacity-50"
          onClick={() => setCurrentPage(currentPage + 1)}
          status={currentPage === totalPages}
        />
      </div>
    );
  };

  return (
    <div className="min-w-screen bg-white rounded h-full flex flex-col">
      <div className="flex-1 overflow-y-auto pb-50">
        <EnterAnimation>
          <table className="w-full">
            <TableHeader />
            <tbody>
              {paginatedUsers?.map((user, index) => (
                <TableRow
                  key={user._id}
                  user={user}
                  isSelected={selected.some((u) => u._id === user._id)}
                  deleteHandler={deleteHandler}
                  handleEditClick={handleEditClick}
                  handleStatusChange={handleStatusChange}
                />
              ))}
            </tbody>
          </table>
        </EnterAnimation>
      </div>

      <div className="w-full p-4 border-t gap-2 border-gray-200 flex flex-col justify-between items-center bg-white md:flex-row sticky bottom-0">
        <EnterAnimation>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Rows per page:</span>
            <SelectList
              options={[
                { id: 1, name: "5" },
                { id: 2, name: "10" },
                { id: 3, name: "15" },
              ]}
              selected={rowsPerPage}
              setSelected={setRowsPerPage}
              className="min-w-16"
            />
          </div>
        </EnterAnimation>
        <EnterAnimation>
          <div>
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          </div>
        </EnterAnimation>
      </div>

      <PopupInfo
        open={open}
        setOpen={setOpen}
        userData={currentUser}
        key={currentUser}
      />

      <MobileEditView
        open={mobileAction}
        setOpen={setMobileAction}
        userData={localUsers.find((u) => u._id === currentUser._id)}
        deleteHandler={deleteHandler}
        handleEditClick={handleEditClick}
        handleStatusChange={handleStatusChange}
      />
      <ToastContainer />
    </div>
  );
};

export default UserTable;
