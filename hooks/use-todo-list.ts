import { useAuth } from "@/components/context/auth-context";
import getTodoService from "@/services/todo-service";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Alert } from "react-native";
import { Task } from "../constants/types";

export default function useTodoList() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [todos, setTodos] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [creatingNew, setCreatingNew] = useState<boolean>(false);

  const todoService = useMemo(
    () => (user ? getTodoService({ token: user.token }) : null),
    [user]
  );

  const fetchTodos = useCallback(async () => {
    if (!user || !todoService) return;
    setLoading(true);
    try {
      //throw new Error("Sin autorización"); // Descomentar para simular error de autorización
      const response = await todoService.getTodos(); // Comentar para simular error de autorización
      setTodos(response.data); // Comentar para simular error de autorización
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes("Sin autorización")
      ) {
        Alert.alert(
          "Error, Sesión expirada. Por favor, inicia sesión de nuevo."
        );
        logout();
        router.replace("/login");
      }
    } finally {
      setLoading(false);
    }
  }, [user, todoService, logout, router]);

  useEffect(() => {
    if (user) {
      fetchTodos();
    }
  }, [user, fetchTodos]);

  const onTaskCreated = () => {
    fetchTodos();
    setCreatingNew(false);
  };

  const removeTodo = async (id: string) => {
    setLoading(true);
    await todoService?.deleteTodo(id);
    await fetchTodos();
  };

  const handleNewTaskClose = () => {
    setCreatingNew(false);
  };

  const toggleTodo = async (id: string) => {
    setLoading(true);
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    const updatedTodos = todos.find((todo) => todo.id === id);
    if (todoService && updatedTodos !== undefined) {
      updatedTodos.completed = !updatedTodos.completed;
      try {
        await todoService.updateTodo(updatedTodos);
        await fetchTodos();
      } catch (error) {
        Alert.alert("Error", (error as Error).message);
      }
    }
  };
  return {
    todos,
    loading,
    creatingNew,
    setCreatingNew,
    toggleTodo,
    removeTodo,
    onTaskCreated,
    handleNewTaskClose,
    fetchTodos,
  };
}
