import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

interface TableProps<T> {
  data: T[];
  columns: {
    key: keyof T;
    label: string;
    align?: "left" | "center" | "right";
  }[];
  isLinkButton?: boolean;
}

export function CustomTable<T extends { id: number }>({
  data = [],
  columns = [],
}: TableProps<T>) {
  const navigate = useNavigate();
  const location = useLocation();
  const renderData = data.map((item, rowIndex) => {
    return (
      <tr
        key={rowIndex}
        className="odd:bg-white even:bg-gray-50 hover:bg-gray-100"
        onClick={() => navigate(`${location.pathname}/${item.id}`)}
      >
        {columns.map((col) => {
          const value = item[col.key];
          const key = col.key as string;
          const align = col.align || "left";
          let displayValue = value as string;

          if (key === "due" && key != null) {
            displayValue = dayjs(displayValue).format("YYYY/MM/DD");
          }

          return (
            <td
              key={String(col.key)}
              className={`border border-gray-200 px-4 py-2 text-sm text-gray-800 text-${align}`}
            >
              {displayValue}
            </td>
          );
        })}
      </tr>
    );
  });

  return (
    <div className="overflow-x-auto rounded shadow">
      <table className="min-w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{renderData}</tbody>
      </table>
    </div>
  );
}
