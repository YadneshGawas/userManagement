import { CiSearch } from "react-icons/ci";

export default function InputText({ value, onChange }) {
  return (
    <div>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <CiSearch className="size-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          id="search"
          name="search"
          type="text"
          placeholder="Search users..."
          value={value}
          onChange={onChange}
          className="block w-full rounded-3xl bg-white py-1.5 pl-10 pr-3 text-base text-black border border-gray-300 placeholder:text-gray-500 focus:outline-none"
        />
      </div>
    </div>
  );
}
