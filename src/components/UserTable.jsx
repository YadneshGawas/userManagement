import React, { useState, useEffect } from "react";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

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
  <thead className="border-b border-gray-300 max-w-full sticky top-0">
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
      <th className="py-2 px-2 w-2/12">Role</th>
    </tr>
  </thead>
);

const TableRow = ({ user, onSelect, isSelected }) => (
  <tr className="border-b border-gray-200 text-gray-600 hover:bg-gray-400/10">
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
    <td className="p-2">{user.isActive ? "Active" : "Inactive"}</td>
    <td className="px-2 py-2 flex flex-row gap-3 justify-start items-center text-gray-500">
      <MdDeleteOutline className="size-5 text-red-500 cursor-pointer" />
      <MdOutlineEdit className="size-5 text-blue-500 cursor-pointer" />
    </td>
  </tr>
);

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center items-center mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 mx-1 rounded-md bg-gray-200 disabled:opacity-50"
      >
        Previous
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-3 py-1 mx-1 rounded-md ${currentPage === number ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          {number}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 mx-1 rounded-md bg-gray-200 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

const UserTable = ({ users, currentPage, setCurrentPage, totalPages }) => {
  const [selected, setSelected] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "ascending",
  });

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelected(users.map((user) => user._id));
    } else {
      setSelected([]);
    }
  };

  const handleSelectOne = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedUsers = React.useMemo(() => {
    let sortableUsers = [...users];
    if (sortConfig.key !== null) {
      sortableUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableUsers;
  }, [users, sortConfig]);

  const isAllSelected = users.length > 0 && selected.length === users.length;

  return (
    <div className="min-w-screen bg-white py-4 shadow-md rounded h-[calc(100vh-150px)]">
      <div className="overflow-y-auto h-full">
        <table className="w-full mb-5 table-fixed">
          <TableHeader
            onSelectAll={handleSelectAll}
            isAllSelected={isAllSelected}
            numSelected={selected.length}
            rowCount={users.length}
            onSort={handleSort}
            sortConfig={sortConfig}
          />
          <tbody>
            {sortedUsers?.map((user, index) => (
              <TableRow
                key={index}
                user={user}
                isSelected={selected.indexOf(user._id) !== -1}
                onSelect={handleSelectOne}
              />
            ))}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default UserTable;
