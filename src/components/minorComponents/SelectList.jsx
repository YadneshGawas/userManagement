"use client";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/20/solid";

export default function SelectList({ options, selected, setSelected }) {
  return (
    <div>
      <div className="relative min-w-32">
        <Listbox value={selected} onChange={setSelected}>
          <ListboxButton className="relative w-full cursor-default rounded-3xl bg-white py-1.5 pl-3 pr-10 text-left text-gray-500 border border-gray-300">
            <span className="block truncate">{selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
              <ChevronUpDownIcon
                aria-hidden="true"
                className="h-5 w-5 text-gray-400"
              />
            </span>
          </ListboxButton>
          <ListboxOptions
            transition
            className="absolute z-10 mt-1 max-h-56 overflow-auto rounded-md bg-white py-1 text-base shadow-lg border border-gray-300"
            anchor="top"
          >
            {options.map((item) => (
              <ListboxOption
                key={item.id}
                value={item}
                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-500   data-[focus]:bg-gray-100"
              >
                <span className="block truncate font-normal group-data-selected:font-semibold">
                  {item.name}
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-700 group-data-focus:text-gray-700 [.group:not([data-selected])_&]:hidden">
                  <CheckIcon aria-hidden="true" className="h-5 w-5" />
                </span>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Listbox>
      </div>
    </div>
  );
}
