import TodolistForm from "../../components/form/todolistForm";
import type {
  TodolistFormData,
  TodolistUpdateFormData,
} from "../../interface/ITodolist";
import { Link, useNavigate, useParams } from "react-router-dom";
import todolistService from "../../services/todolistService";
import { useEffect, useState } from "react";
import { unwrapOrError } from "../../utils/upwrapOrError";

function TodolistDetailPage() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [todolist, setTodolist] = useState<TodolistUpdateFormData>();

  useEffect(() => {
    if (id) {
      fetchTodolist(id);
    }
  }, [id]);

  const fetchTodolist = async (id: string) => {
    const data = await todolistService.getTodolist(Number(id));
    const result = unwrapOrError(data);
    if (result.success) {
      setTodolist(result.data.todolist);
    }
  };

  const handleUpdateTodolist = async (payload: TodolistFormData) => {
    const data = await todolistService.updateTodolist(Number(id), payload);
    if (data.success) {
      setTimeout(() => {
        navigate("/todolist");
      }, 2000);
      alert(data.message);
      return;
    }

    alert(data.message);
  };

  const handleDeleteTodolist = async (id: number) => {
    const data = await todolistService.deleteTodolist(id);
    if (data.success) {
      setTimeout(() => {
        navigate("/todolist");
      }, 2000);
      alert(data.message);
      return;
    }
    alert(data.message);
  };

  return (
    <div className="max-w-md mx-auto space-y-2">
      <div className="flex justify-between py-2">
        <p className="text-2xl font-semibold">Update Todolist</p>
        <Link
          to="/todolist"
          className="inline-flex items-center justify-center px-4 py-2 
        rounded-lg bg-red-600 text-white font-semibold text-sm 
        hover:bg-red-700 transition-colors"
        >
          Back
        </Link>
      </div>
      <TodolistForm onSubmit={handleUpdateTodolist} selectedData={todolist} onDelete={handleDeleteTodolist}/>
    </div>
  );
}

export default TodolistDetailPage;
