import React, { useState, useEffect } from "react";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { FaArrowUp, FaArrowDown, FaArrowRight } from "react-icons/fa";
import PopupInfo from "./minorComponents/PopupInfo";
import ConfirmatioDialog from "./minorComponents/Dialog";
import { Switch } from "@headlessui/react";
import SelectList from "./minorComponents/SelectList";
import CustomButton from "./minorComponents/CustomButton";
import { FaArrowLeft } from "react-icons/fa6";

const UserTable = ({ users }) => {
  const [localUsers, setLocalUsers] = useState(users);
  const [selected, setSelected] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: "_id",
    direction: "ascending", // Default sort by _id ascending
  });
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState({
    id: 1,
    name: "5",
  });

  useEffect(() => {
    // Only reset localUsers when the source `users` prop changes identity,
    // which happens when filters are applied in App.jsx.
    // This prevents pagination from resetting local deletions.
    setLocalUsers(users);
  }, [users]);

  const handleEditClick = (e) => {
    setCurrentUser(e);
    setOpen(true);
    console.log(e);
  };

  const handleDeleteClick = (e) => {
    setCurrentUser(e);
    setOpenDelete(true);
  };

  const deleteHandler = () => {
    setLocalUsers((prev) =>
      prev.filter((user) => user._id !== currentUser._id)
    );
    setOpenDelete(false);
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelected(localUsers.map((user) => user._id));
    } else {
      setSelected([]);
    }
  };

  const handleSelectOne = (id) => {
    setSelected((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
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
  };

  const sortedUsers = React.useMemo(() => {
    let sortableUsers = [...localUsers];
    if (sortConfig.key !== null) {
      sortableUsers.sort((a, b) => {
        let valA = a[sortConfig.key];
        let valB = b[sortConfig.key];
        let comparison = 0;

        // Handle numeric sorting for _id field
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
    console.log("Paginating users:", { startIndex, endIndex });
    return sortedUsers.slice(startIndex, endIndex);
  }, [sortedUsers, currentPage, rowsPerPage.name]);

  const isAllSelected =
    localUsers.length > 0 && selected.length === localUsers.length;

  const SortableHeader = ({ children, sortKey, sortConfig, onSort }) => {
    const isSorted = sortConfig.key === sortKey;
    const direction = isSorted ? sortConfig.direction : "none";
    return (
      <th className="py-2 px-2 cursor-pointer" onClick={() => onSort(sortKey)}>
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

  const TableHeader = ({
    onSelectAll,
    isAllSelected,
    numSelected,
    rowCount,
    onSort,
    sortConfig,
  }) => (
    <thead className="border-b border-gray-300 max-w-full sticky top-0 bg-gray-700 z-10">
      <tr key="header-row" className="text-white text-left bg-gray-700">
        <th className="py-2 px-2 w-1/12">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            ref={(input) => {
              if (input) {
                input.indeterminate = numSelected > 0 && numSelected < rowCount;
              }
            }}
            checked={isAllSelected}
            onChange={onSelectAll}
          />
        </th>
        <th className="py-2 px-2 w-2/12">ID</th>
        <SortableHeader
          sortKey="name"
          sortConfig={sortConfig}
          onSort={onSort}
          className="w-3/12"
        >
          Name
        </SortableHeader>
        <SortableHeader sortKey="email" sortConfig={sortConfig} onSort={onSort}>
          Email
        </SortableHeader>
        <th className="py-2 px-2 w-2/12">Status</th>
        <th className="py-2 px-2 w-2/12">Actions</th>
      </tr>
    </thead>
  );

  const TableRow = ({ user, onSelect, isSelected }) => (
    <tr className="w-full border-b border-gray-200 text-gray-600 hover:bg-gray-400/10 relative">
      <td className="p-2">
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          checked={isSelected}
          onChange={() => onSelect(user._id)}
        />
      </td>
      <td className="p-2">{user._id.slice(-6)}</td>
      <td className="p-2">{user.name}</td>
      <td className="p-2">{user.email}</td>
      <td className="p-2">
        <div className="flex items-center gap-2">
          <span
            className={`w-3 h-3 rounded-full ${user.isActive ? "bg-green-500" : "bg-red-500"}`}
          ></span>
          <span>{user.isActive ? "Active" : "Inactive"}</span>
        </div>
      </td>
      <td className="px-2 py-2 flex flex-row gap-3 justify-start items-center text-gray-500">
        <MdDeleteOutline
          className="size-5 text-red-500 cursor-pointer"
          onClick={() => handleDeleteClick(user)}
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
      </td>
    </tr>
  );

  const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
      const pageNumbers = [];
      const maxPagesToShow = 2;
      const half = Math.floor(maxPagesToShow / 2);

      if (totalPages <= maxPagesToShow + 2) {
        for (let i = 1; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        if (currentPage > half + 2) {
          pageNumbers.push("...");
        }

        let start = Math.max(2, currentPage - half);
        let end = Math.min(totalPages - 1, currentPage + half);

        if (currentPage <= half + 1) {
          end = maxPagesToShow;
        }

        if (currentPage >= totalPages - half) {
          start = totalPages - maxPagesToShow + 1;
        }

        for (let i = start; i <= end; i++) {
          pageNumbers.push(i);
        }

        if (currentPage < totalPages - half - 1) {
          pageNumbers.push("...");
        }

        pageNumbers.push(totalPages);
      }
      return pageNumbers;
    };

    return (
      <div className="flex justify-end items-center mt-4">
        <CustomButton
          icon={<FaArrowLeft />}
          className=" text-xl text-gray-800 px-3 py-3 mx-1 bg-white border rounded-full border-gray-300 disabled:opacity-50"
          onClick={() => onPageChange(currentPage - 1)}
          status={currentPage === 1}
        />

        {getPageNumbers().map((number, index) =>
          typeof number === "string" ? (
            <span key={`dots-${index}`} className="px-3 py-1 mx-1">
              ...
            </span>
          ) : (
            <CustomButton
              className={`text-sm px-4.5 py-3 mx-1 rounded-full ${currentPage === number ? " bg-gray-700 text-white" : "bg-gray-200"}`}
              onClick={() => onPageChange(number)}
              label={number}
            />
          )
        )}
        <CustomButton
          icon={<FaArrowRight />}
          className="text-xl text-gray-800 px-3 py-3 mx-1 bg-white border rounded-full border-gray-300 disabled:opacity-50"
          onClick={() => onPageChange(currentPage + 1)}
          status={currentPage === totalPages}
        />
      </div>
    );
  };

  return (
    <div className="min-w-screen bg-white rounded h-[calc(100vh-80px)] flex flex-col relative">
      <div className="w-full overflow-y-auto">
        <table className="w-full h-full">
          <TableHeader
            onSelectAll={handleSelectAll}
            isAllSelected={isAllSelected}
            numSelected={selected.length}
            rowCount={localUsers.length}
            onSort={handleSort}
            sortConfig={sortConfig}
          />
          <tbody>
            {paginatedUsers?.map((user, index) => (
              <TableRow
                key={index}
                user={user}
                isSelected={selected.indexOf(user._id) !== -1}
                onSelect={handleSelectOne}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="absolute bottom-0 left-0 right-0 w-full p-4 border-t border-gray-200 flex justify-between items-center bg-white">
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
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      <ConfirmatioDialog
        open={openDelete}
        setOpen={setOpenDelete}
        onClick={deleteHandler}
      />
      <PopupInfo
        open={open}
        setOpen={setOpen}
        userData={currentUser}
        key={currentUser ? currentUser._id : "new-user"}
      />
    </div>
  );
};

export default UserTable;
