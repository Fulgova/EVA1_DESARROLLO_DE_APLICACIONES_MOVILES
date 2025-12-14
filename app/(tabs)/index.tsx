import { useAuth } from "@/components/context/auth-context";
import Background from "@/components/ui/background";
import { IconSymbol } from "@/components/ui/icon-symbol";
import NewTask from "@/components/ui/new-task";
import TaskItem from "@/components/ui/task-item";
import Title from "@/components/ui/tittle";
import getTodoService from "@/services/todo-service";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Task } from "../../constants/types";

export default function HomeScreen() {
  const { user } = useAuth();
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
      const response = await todoService.getTodos();
      setTodos(response.data);
    } catch (error) {
      Alert.alert("Error", (error as Error).message);
    } finally {
      setLoading(false);
    }
  }, [user, todoService]);

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

  if (creatingNew) {
    return (
      <Background source={require("../../assets/background.jpg")}>
        <SafeAreaView style={styles.container}>
          <NewTask onClose={handleNewTaskClose} onTaskCreated={onTaskCreated} />
        </SafeAreaView>
      </Background>
    );
  }

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

  return (
    <Background source={require("../../assets/background.jpg")}>
      <SafeAreaView style={styles.container}>
        {/* Tareas */}
        <View style={styles.section}>
          <Title style={{ color: "white" }}>Tareas de {user?.email}</Title>
          {loading && <Title>Cargando tareas...</Title>}
          {todos.map((todo) => (
            <TaskItem
              key={todo.id}
              task={todo}
              onToggle={toggleTodo}
              onRemove={removeTodo}
              loading={loading}
            />
          ))}
          <TouchableOpacity
            style={styles.newTaskButton}
            onPress={() => setCreatingNew(true)}
          >
            <IconSymbol name="plus" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.newTaskButton} onPress={fetchTodos}>
            <IconSymbol name="arrow.clockwise" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  section: {
    marginVertical: 20,
    alignItems: "center",
  },
  input: {
    width: 220,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 20,
    padding: 8,
    marginBottom: 12,
    backgroundColor: "white",
  },
  newTaskButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "#4CAF50",
    borderRadius: 25,
    borderColor: "white",
    borderWidth: 1,
  },
});
