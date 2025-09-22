import { useState, useMemo } from "react";
import ControlPanel from "./components/ControlPanel";
import UserTable from "./components/UserTable";
import { users } from "./assets/data";

const statusOptions = [
  { id: 1, name: "All" },
  { id: 2, name: "Active" },
  { id: 3, name: "Inactive" },
];

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(statusOptions[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 15;

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const searchMatch =
        user.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        user.email.toLowerCase().includes(lowerCaseSearchTerm);

      const statusMatch =
        selectedStatus.name === "All" ||
        user.isActive === (selectedStatus.name === "Active");
      return searchMatch && statusMatch;
    });
  }, [users, searchTerm, selectedStatus]);

  const paginatedUsers = useMemo(() => {
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    return filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  }, [filteredUsers, currentPage, usersPerPage]);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <main className=" w-full min-h-screen bg-white">
      <div className=" w-full h-screen flex flex-col">
        <ControlPanel
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          statusOptions={statusOptions}
        />
        <UserTable
          users={paginatedUsers}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </main>
  );
}

export default App;
