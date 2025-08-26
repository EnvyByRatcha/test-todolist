import { createBrowserRouter } from "react-router-dom";
import TodolistPage from "../pages/todolist/TodolistPage";
import TodolistCreatePage from "../pages/todolist/TodolistCreatePage";
import TodolistDetailPage from "../pages/todolist/TodolistDetailPage";
import NotFoundPage from "../pages/notfound/NotFoundPage";
import MainPage from "../pages/main/MainPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
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
    element: <NotFoundPage />,
  },
]);

export default router;
