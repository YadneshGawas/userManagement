import InputText from "./minorComponents/InputText";
import SelectList from "./minorComponents/SelectList";
import { CiSearch } from "react-icons/ci";
import Dropdown from "./minorComponents/dropDown";

export default function ControlPanel({
  searchTerm,
  setSearchTerm,
  selectedStatus,
  setSelectedStatus,
  statusOptions,
  users,
}) {
  return (
    <div className="p-4 bg-gray-100 border-b border-gray-300">
      <div className="flex flex-col sm:flex-row md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <InputText
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-3xl"
            placeholder="Search by name or email"
            icon={<CiSearch />}
          />
          <SelectList
            options={statusOptions}
            selected={selectedStatus}
            setSelected={setSelectedStatus}
          />
        </div>
        <Dropdown users={users} />
      </div>
    </div>
  );
}
