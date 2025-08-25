import axios from "axios";
import config from "../config";
import type { Todolist, TodolistFormData } from "../interface/ITodolist";
import type { ErrorResponse } from "../interface/IError";
import { handleAxiosError } from "../utils/handleAxiosError";

const baseUrl = `${config.apiPath}/todolists`;

const todolistService = {
  getAllTodolist: async (
    page: number,
    limit: number,
    search?: string,
    status?: string,
    priority?: string
  ): Promise<GetTodolistsResponse | ErrorResponse> => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (search) params.append("search", search);
      if (status) params.append("status", status);
      if (priority) params.append("priority", priority);

      const response = await axios.get(`${baseUrl}?${params.toString()}`);
      return response.data;
    } catch (error) {
      return handleAxiosError(error, "fetching the products");
    }
  },
  getTodolist: async (
    id: number
  ): Promise<TodolistResponse | ErrorResponse> => {
    try {
      const response = await axios.get(`${baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      return handleAxiosError(error, "creating todolist");
    }
  },
  createTodolist: async (
    payload: TodolistFormData
  ): Promise<TodolistResponse | ErrorResponse> => {
    try {
      const response = await axios.post(baseUrl, payload);
      return response.data;
    } catch (error) {
      return handleAxiosError(error, "creating todolist");
    }
  },
  updateTodolist: async (
    id: number,
    payload: TodolistFormData
  ): Promise<TodolistResponse | ErrorResponse> => {
    try {
      const response = await axios.put(`${baseUrl}/${id}`, payload);
      return response.data;
    } catch (error) {
      return handleAxiosError(error, "creating todolist");
    }
  },
  deleteTodolist: async (
    id: number
  ): Promise<TodolistResponse | ErrorResponse> => {
    try {
      const response = await axios.delete(`${baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      return handleAxiosError(error, "creating todolist");
    }
  },
};

interface GetTodolistsResponse {
  success: boolean;
  message: string;
  data: {
    todolists: Todolist[];
  };
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

interface TodolistResponse {
  success: boolean;
  message: string;
  data: {
    todolist: Todolist;
  };
}

export default todolistService;
