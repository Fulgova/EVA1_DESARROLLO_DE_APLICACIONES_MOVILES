import { useAuth } from "@/components/context/auth-context";
import Background from "@/components/ui/background";
import { IconSymbol } from "@/components/ui/icon-symbol";
import NewTask from "@/components/ui/new-task";
import TaskItem from "@/components/ui/task-item";
import Title from "@/components/ui/tittle";
import useTodoList from "@/hooks/use-todo-list";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const {
    creatingNew,
    handleNewTaskClose,
    onTaskCreated,
    todos,
    loading,
    toggleTodo,
    removeTodo,
    setCreatingNew,
    fetchTodos,
  } = useTodoList();
  const { user } = useAuth();

  if (creatingNew) {
    return (
      <Background source={require("../../assets/background.jpg")}>
        <SafeAreaView style={styles.container}>
          <NewTask onClose={handleNewTaskClose} onTaskCreated={onTaskCreated} />
        </SafeAreaView>
      </Background>
    );
  }

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
