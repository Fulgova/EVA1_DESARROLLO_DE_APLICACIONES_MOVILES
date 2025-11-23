import { User } from "@/components/context/auth-context";
import { Task } from "@/constants/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TODOS_STORAGE_KEY = "@todos_storage";
const SESSION_STORAGE_KEY = "@session_storage";

export const saveTodosToStorage = async (todos: Task[]) => {
  try {
    const stringifiedTodos = JSON.stringify(todos);
    await AsyncStorage.setItem(TODOS_STORAGE_KEY, stringifiedTodos);
  } catch (error) {
    console.error("Error al guardar los todos:", error);
  }
};

export const loadTodosFromStorage = async (): Promise<Task[]> => {
  try {
    const storedTodos = await AsyncStorage.getItem(TODOS_STORAGE_KEY);
    if (storedTodos) {
      return JSON.parse(storedTodos) as Task[];
    }
    return [];
  } catch (error) {
    console.error("Error al cargar los todos:", error);
    return [];
  }
};

export const saveSessionToStorage = async (sessionData: User) => {
  try {
    const stringifiedSessionData = JSON.stringify(sessionData);
    await AsyncStorage.setItem(SESSION_STORAGE_KEY, stringifiedSessionData);
  } catch (error) {
    console.error("Error al guardar la sesión:", error);
  }
};

export const loadSessionFromStorage = async (): Promise<User | null> => {
  try {
    const storedSession = await AsyncStorage.getItem(SESSION_STORAGE_KEY);
    if (storedSession) {
      return JSON.parse(storedSession) as User;
    }
    return null;
  } catch (error) {
    console.error("Error al cargar la sesión:", error);
    return null;
  }
};

export const clearSessionFromStorage = async () => {
  try {
    await AsyncStorage.removeItem(SESSION_STORAGE_KEY);
  } catch (error) {
    console.error("Error al limpiar la sesión:", error);
  }
};
