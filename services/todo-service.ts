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
    baseURL: `${API_URL}/todos`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  async function getTodos(): Promise<GetTodosResponse> {
    try {
      const response = await client.get<GetTodosResponse>(`${API_URL}/todos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        if (error.response.status === 401) {
          throw new Error("Unauthorized: Invalid or expired token");
        }
      }
      throw new Error("Failed to fetch todos");
    }
  }

  return {
    getTodos,
  };
}
