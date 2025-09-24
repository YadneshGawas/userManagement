import { useState, useMemo } from "react";
import ControlPanel from "./components/ControlPanel";
import UserTable from "./components/UserTable";
import { users as usersData } from "./assets/data";

const statusOptions = [
  { id: 1, name: "All" },
  { id: 2, name: "Active" },
  { id: 3, name: "Inactive" },
];

function App() {
  const [users, setUsers] = useState(usersData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(statusOptions[0]);

  const handleUpdateUser = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === updatedUser._id ? updatedUser : user
      )
    );
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const searchMatch =
        user.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        user.email.toLowerCase().includes(lowerCaseSearchTerm);

      let statusMatch = true;
      if (selectedStatus.name === "Active") {
        statusMatch = user.isActive;
      } else if (selectedStatus.name === "Inactive") {
        statusMatch = !user.isActive;
      }
      return searchMatch && statusMatch;
    });
  }, [users, searchTerm, selectedStatus]);

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
        <UserTable users={filteredUsers} />
      </div>
    </main>
  );
}

export default App;
