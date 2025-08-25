interface PaginationProps {
  totalPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  limit: number;
  setLimit: (rows: number) => void;
}

function Pagination({
  totalPage,
  currentPage,
  setCurrentPage,
  limit,
  setLimit,
}: PaginationProps) {
  if (totalPage <= 1) return null;

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPage) setCurrentPage(currentPage + 1);
  };

  const getPages = () => {
    const pages: (number | string)[] = [];
    if (totalPage <= 7) {
      for (let i = 1; i <= totalPage; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPage - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPage) {
          pages.push(i);
        }
      }
      if (currentPage < totalPage - 2) pages.push("...");
      pages.push(totalPage);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-between mt-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Rows per page:</span>
        <select
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          className="border rounded-lg px-2 py-1 text-sm"
        >
          {[5, 10, 20, 50].map((rows) => (
            <option key={rows} value={rows}>
              {rows}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded-lg border flex items-center gap-1 ${
            currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          Prev
        </button>

        <div className="flex items-center space-x-1">
          {getPages().map((page, idx) =>
            page === "..." ? (
              <span key={`ellipsis-${idx}`} className="px-2 text-gray-500">
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => setCurrentPage(page as number)}
                className={`px-3 py-1 rounded-lg border ${
                  page === currentPage
                    ? "bg-blue-600 text-white font-semibold"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            )
          )}
        </div>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPage}
          className={`px-3 py-1 rounded-lg border flex items-center gap-1 ${
            currentPage === totalPage
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
