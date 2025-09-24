import InputText from "./minorComponents/InputText";
import SelectList from "./minorComponents/SelectList";
import CustomButton from "./minorComponents/CustomButton";
import { MdImportExport, MdAdd } from "react-icons/md";
import { CiSearch } from "react-icons/ci";

export default function ControlPanel({
  searchTerm,
  setSearchTerm,
  selectedStatus,
  setSelectedStatus,
  statusOptions,
}) {
  return (
    <div className="p-4 bg-gray-100 border-b border-gray-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
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
        <div className="flex flex-col sm:flex-row gap-4">
          <CustomButton
            icon={<MdImportExport />}
            label="Export"
            className="group inline-flex items-center justify-center sm:justify-start sm:gap-2 rounded-full sm:rounded-3xl bg-white p-4 sm:px-3 sm:py-1.5 text-sm/6 font-semibold text-gray-500 shadow-inner shadow-white/10 hover:bg-gray-600 hover:text-white border border-gray-300"
          />
        </div>
      </div>
    </div>
  );
}
