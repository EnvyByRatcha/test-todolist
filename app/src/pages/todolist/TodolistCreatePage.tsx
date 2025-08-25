import TodolistForm from "../../components/form/todolistForm";
import type { TodolistFormData } from "../../interface/ITodolist";
import { Link, useNavigate } from "react-router-dom";
import todolistService from "../../services/todolistService";

function TodolistCreatePage() {
  const navigate = useNavigate();

  const handleCreateTodolist = async (payload: TodolistFormData) => {
    const data = await todolistService.createTodolist(payload);
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
        <p className="text-2xl font-semibold">Create Todolist</p>
        <Link
          to="/todolist"
          className="inline-flex items-center justify-center px-4 py-2 
        rounded-lg bg-red-600 text-white font-semibold text-sm 
        hover:bg-red-700 transition-colors"
        >
          Back
        </Link>
      </div>
      <TodolistForm onSubmit={handleCreateTodolist} />
    </div>
  );
}

export default TodolistCreatePage;
