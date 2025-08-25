import type { Todolist } from "../interface/ITodolist";

type TodolistColumn = {
  key: keyof Todolist;
  label: string;
  align?: "left" | "center" | "right";
};

export const todolistColumn: TodolistColumn[] = [
  { key: "title", label: "Title" },
  { key: "status", label: "Status" },
  { key: "priority", label: "Priority" },
  { key: "due", label: "Due" },
];
