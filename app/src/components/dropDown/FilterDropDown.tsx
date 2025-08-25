import { useState, useRef, useEffect } from "react";

interface MenuOption {
  label: string;
  value: string;
}

interface FilterDropDownProps {
  title: string;
  options: MenuOption[];
  onSelect: (value: string) => void;
}

export default function FilterDropDown({
  title,
  options,
  onSelect,
}: FilterDropDownProps) {
  const [open, setOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(title);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (label: string, value: string) => {
    setSelectedLabel(value === "all" ? title : label);
    onSelect(value);
    setOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100"
      >
        {selectedLabel}
      </button>

      {open && (
        <div className="absolute z-10 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.label, option.value)}
              className="block w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
