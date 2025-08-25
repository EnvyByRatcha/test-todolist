interface SearchBoxProps {
  label: string;
  type?: "text";
  searchTerm: string;
  onClear: () => void;
  onSearchChange: (value: string) => void;
}

function SearchBox({
  label,
  type = "text",
  searchTerm,
  onClear,
  onSearchChange,
}: SearchBoxProps) {
  return (
    <div className="relative w-full max-w-sm">
      <input
        type={type}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={`Search ${label}`}
        className="w-full rounded-lg border border-gray-300 pl-9 pr-9 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />

      {searchTerm && (
        <button
          type="button"
          onClick={() => {
            onSearchChange("");
            onClear();
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          X
        </button>
      )}
    </div>
  );
}

export default SearchBox;
