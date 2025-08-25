import { useEffect, useState } from "react";
import todolistService from "../../services/todolistService";
import type { Todolist } from "../../interface/ITodolist";
import { useDebounce } from "../debonce/debonce.hook";
import { unwrapOrError } from "../../utils/upwrapOrError";

const useTodolist = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 800);

  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    fetchTodolists(
      currentPage,
      limit,
      debouncedSearchTerm,
      statusFilter,
      priorityFilter
    );
  }, [currentPage,limit, debouncedSearchTerm, statusFilter, priorityFilter]);

  const fetchTodolists = async (
    page: number,
    limit: number,
    search?: string,
    status?: string,
    priority?: string
  ) => {
    try {
      const data = await todolistService.getAllTodolist(
        page,
        limit,
        search,
        status,
        priority
      );
      const result = unwrapOrError(data);
      setTodolists(result.data.todolists);
      setTotalPage(result.pagination.totalPages);
    } catch (error) {}
  };

  return {
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
  };
};

export default useTodolist;
