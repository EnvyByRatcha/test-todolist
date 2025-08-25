export interface Todolist {
  id: number;
  title: string;
  status: string;
  priority: string;
  due: string;
}

export interface TodolistFormData {
  title: string;
  status: string;
  priority: string;
  due: string | null;
}

export interface TodolistUpdateFormData extends TodolistFormData {
  id: number;
}
