import { createBrowserRouter } from "react-router-dom";
import TodolistPage from "../pages/todolist/TodolistPage";
import TodolistCreatePage from "../pages/todolist/TodolistCreatePage";
import TodolistDetailPage from "../pages/todolist/TodolistDetailPage";

const router = createBrowserRouter([
{
    path: "/todolist",
    element: <TodolistPage />,
  },
  {
    path: "/todolist/create",
    element: <TodolistCreatePage />,
  },
  {
    path: "/todolist/:id",
    element: <TodolistDetailPage />,
  },
  {
    path: "*",
    element: <TodolistPage />,
  },
]);

export default router;
