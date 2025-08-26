import useTodolist from "../../hooks/todolistHook/todolist.hook";
import { CustomTable } from "../../components/table/Customtable";
import { todolistColumn } from "../../constants/todolistColumn";
import { Link } from "react-router-dom";
import Pagination from "../../components/paginattion/Pagination";
import SearchBox from "../../components/searchbox/SearchBox";
import FilterDropDown from "../../components/dropDown/FilterDropDown";

const statusOptions = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "In progress", value: "in_progress" },
  { label: "Done", value: "done" },
];

const priorityOptions = [
  { label: "All", value: "all" },
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
];

function TodolistPage() {
  const {
    todolists,
    searchTerm,
    setSearchTerm,
    setStatusFilter,
    setPriorityFilter,
    totalPage,
    currentPage,
    setCurrentPage,
    limit,
    setLimit,
  } = useTodolist();

  return (
    <div className="w-5xl mx-auto py-20">
      <div className="flex justify-between py-2">
        <p className="text-2xl font-semibold">Todolist</p>
        <Link
          to="/todolist/create"
          className="inline-flex items-center justify-center px-4 py-2 
        rounded-lg bg-blue-600 text-white font-semibold text-sm 
        hover:bg-blue-700 transition-colors"
        >
          + Create
        </Link>
      </div>
      <div className="flex justify-between py-2">
        <SearchBox
          label="title"
          type="text"
          searchTerm={searchTerm}
          onClear={() => setSearchTerm("")}
          onSearchChange={(value) => setSearchTerm(value)}
        />
        <div className="flex justify-between space-x-4">
          <FilterDropDown
            title="Status"
            options={statusOptions}
            onSelect={(value) => setStatusFilter(value)}
          />
          <FilterDropDown
            title="Priority"
            options={priorityOptions}
            onSelect={(value) => setPriorityFilter(value)}
          />
        </div>
      </div>

      <CustomTable data={todolists} columns={todolistColumn}></CustomTable>
      <Pagination
        totalPage={totalPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        limit={limit}
        setLimit={setLimit}
      />
    </div>
  );
}

export default TodolistPage;
