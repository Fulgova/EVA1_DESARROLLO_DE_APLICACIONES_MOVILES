import { Image } from "expo-image";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Task } from "../../constants/types";
import { IconSymbol } from "./icon-symbol";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

export default function TaskItem({ task, onToggle, onRemove }: TaskItemProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.circle, task.completed && styles.completeCircle]}
        onPress={() => onToggle(task.id)}
      />
      <View>
        {task.photoUri && (
          <Image
            source={{ uri: task.photoUri }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 8,
              marginBottom: 4,
              marginRight: 10,
            }}
            contentFit="cover"
          />
        )}
      </View>
      <View>
        <Text style={[styles.title, task.completed && styles.completedTitle]}>
          {task.title}
        </Text>
        {task.location && (
          <Text style={{ fontSize: 12, color: "white" }}>
            📍 Lat: {task.location.latitude}, Lon: {task.location.longitude}
          </Text>
        )}
      </View>
      <TouchableOpacity
        onPress={() => onRemove(task.id)}
        style={styles.removeButton}
      >
        <IconSymbol name="trash.circle" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    borderBottomColor: "rgba(255, 255, 255, 1)",
    borderBottomWidth: 1,
    paddingBottom: 8,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#007AFF",
    backgroundColor: "transparent",
    marginRight: 12,
  },
  completeCircle: {
    backgroundColor: "#007AFF",
  },
  title: {
    fontSize: 16,
    color: "white",
  },
  completedTitle: {
    color: "gray",
    textDecorationLine: "line-through",
  },
  removeButton: {
    padding: 5,
  },
});
