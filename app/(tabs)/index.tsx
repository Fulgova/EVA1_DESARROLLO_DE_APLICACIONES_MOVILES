import { useAuth } from "@/components/context/auth-context";
import Background from "@/components/ui/background";
import { IconSymbol } from "@/components/ui/icon-symbol";
import TaskItem from "@/components/ui/task-item";
import Title from "@/components/ui/tittle";
import { generateRandomId } from "@/utils/generate-random-id";
import { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Task } from "../../constants/types";

const initialTodos = [
  { id: generateRandomId(), title: "Comprar víveres", completed: false },
  { id: generateRandomId(), title: "Lavar el coche", completed: true },
  {
    id: generateRandomId(),
    title: "Estudiar para el examen",
    completed: false,
  },
];

export default function HomeScreen() {
  const { user } = useAuth();
  const [todos, setTodos] = useState<Task[]>(initialTodos);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const toggleTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const addTodo = (title: string) => {
    if (title.trim() === "") return; // Prevenir agregar tareas vacías

    const newTodo: Task = {
      id: generateRandomId(),
      title,
      completed: false,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setNewTaskTitle(""); // Limpiar el campo de entrada después de agregar la tarea
  };

  return (
    <Background source={require("../../assets/background.jpg")}>
      <SafeAreaView style={styles.container}>
        {/* Tareas */}
        <View style={styles.section}>
          <Title style={{ color: "white" }}>Tareas de {user?.name}</Title>
          {todos.map((todo) => (
            <TaskItem
              key={todo.id}
              task={todo}
              onToggle={toggleTodo}
              onRemove={removeTodo}
            />
          ))}
          <View style={{ height: 16, flexDirection: "row" }} />
          <TextInput
            style={styles.input}
            placeholder="Nueva tarea"
            placeholderTextColor="gray" // Cambia el color del texto del placeholder
            value={newTaskTitle}
            onChangeText={(text) => setNewTaskTitle(text)} // Actualiza el estado cuando el texto cambia
            onSubmitEditing={() => addTodo(newTaskTitle)} // Agrega la tarea al presionar "Enter"
            textAlign="center"
          />
          <TouchableOpacity onPress={() => addTodo(newTaskTitle)}>
            <IconSymbol name="plus.circle.fill" size={32} color="green" />
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
});
