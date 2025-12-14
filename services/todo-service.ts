import axios, { isAxiosError } from "axios";
import { API_URL } from "../constants/config";
import { Task } from "../constants/types";

export interface GetTodosResponse {
  success: boolean;
  data: Task[];
  count: number;
}

export default function getTodoService({ token }: { token: string }) {
  const client = axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  async function getTodos(): Promise<GetTodosResponse> {
    try {
      const response = await client.get<GetTodosResponse>("/todos");
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        if (error.response.status === 401) {
          throw new Error("Sin autorización: token inválido o expirado");
        }
      }
      throw new Error("Error obteniendo las tareas");
    }
  }

  async function createTodo(task: Task): Promise<void> {
    try {
      await client.post("/todos", task);
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        if (error.response.status === 401) {
          throw new Error("Sin autorización: token inválido o expirado");
        }
      }
      throw new Error("Error creando la tarea");
    }
  }

  async function deleteTodo(id: string): Promise<void> {
    try {
      await client.delete(`/todos/${id}`);
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        if (error.response.status === 401) {
          throw new Error("Sin autorización: token inválido o expirado");
        }
      }
      throw new Error("Error eliminando la tarea");
    }
  }

  async function updateTodo(task: Task): Promise<void> {
    try {
      await client.put(`/todos/${task.id}`, task);
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        if (error.response.status === 401) {
          throw new Error("Sin autorización: token inválido o expirado");
        }
      }
      throw new Error("Error actualizando la tarea");
    }
  }

  return {
    getTodos,
    createTodo,
    deleteTodo,
    updateTodo,
  };
}
