import InputText from "./minorComponents/InputText";
import SelectList from "./minorComponents/SelectList";
import CustomButton from "./minorComponents/CustomButton";

export default function ControlPanel({
  searchTerm,
  setSearchTerm,
  selectedStatus,
  setSelectedStatus,
  statusOptions,
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 min-h-10 bg-gray-100 border-b border-gray-300">
      <div className="flex flex-col sm:flex-row gap-4">
        <InputText
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SelectList
          options={statusOptions}
          selected={selectedStatus}
          setSelected={setSelectedStatus}
        />
      </div>
      <div>
        <CustomButton />
      </div>
    </div>
  );
}
