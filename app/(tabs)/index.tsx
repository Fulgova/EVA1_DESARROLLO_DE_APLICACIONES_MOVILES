import { useAuth } from "@/components/context/auth-context";
import Background from "@/components/ui/background";
import { IconSymbol } from "@/components/ui/icon-symbol";
import NewTask from "@/components/ui/new-task";
import TaskItem from "@/components/ui/task-item";
import Title from "@/components/ui/tittle";
import getTodoService from "@/services/todo-service";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Task } from "../../constants/types";

export default function HomeScreen() {
  const { user } = useAuth();
  const [todos, setTodos] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [creatingNew, setCreatingNew] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      const fetchTodos = async () => {
        setLoading(true);
        try {
          const todoService = getTodoService({ token: user.token });
          const response = await todoService.getTodos();
          setTodos(response.data);
        } catch (error) {
          Alert.alert("Error", (error as Error).message);
        } finally {
          setLoading(false);
        }
      };
      fetchTodos();
    }
  }, [user]);

  const createTask = (task: Task) => {
    if (task.title.trim().length === 0) return; // Prevenir agregar tareas vacías
    setTodos((prevTodos) => {
      const newTodos = [...prevTodos, task];
      return newTodos;
    });
    setCreatingNew(false);
  };

  const removeTodo = (id: string) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.filter((todo) => todo.id !== id);
      return updatedTodos;
    });
  };

  const handleNewTaskClose = () => {
    setCreatingNew(false);
  };

  if (creatingNew) {
    return (
      <Background source={require("../../assets/background.jpg")}>
        <SafeAreaView style={styles.container}>
          <NewTask onClose={handleNewTaskClose} onTaskSave={createTask} />
        </SafeAreaView>
      </Background>
    );
  }

  const toggleTodo = (id: string) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      return updatedTodos;
    });
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
            />
          ))}
          <TouchableOpacity
            style={styles.newTaskButton}
            onPress={() => setCreatingNew(true)}
          >
            <IconSymbol name="plus" size={24} color="white" />
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
