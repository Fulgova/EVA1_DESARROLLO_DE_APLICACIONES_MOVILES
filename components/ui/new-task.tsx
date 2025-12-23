import { useAuth } from "@/components/context/auth-context";
import getImageUploadService from "@/services/image-upload-service";
import getTodoService from "@/services/todo-service";
import { Image } from "expo-image";
import {
  launchCameraAsync,
  requestCameraPermissionsAsync,
} from "expo-image-picker";
import {
  Accuracy,
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Task } from "../../constants/types";
import Button from "./button";
import Title from "./tittle";

interface NewTaskProps {
  onClose: () => void;
  onTaskCreated: () => void;
}

export default function NewTask({ onClose, onTaskCreated }: NewTaskProps) {
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [isCapturingPhoto, setIsCapturingPhoto] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const { user } = useAuth();

  async function handleTakePhoto() {
    if (isCapturingPhoto) return; // Prevenir múltiples capturas simultáneas

    try {
      setIsCapturingPhoto(true);

      const { status } = await requestCameraPermissionsAsync();

      if (status !== "granted") {
        alert("Se requieren permisos de cámara para tomar una foto.");
        setIsCapturingPhoto(false);
        return;
      }

      const result = await launchCameraAsync({
        mediaTypes: ["images"],
        quality: 0.7,
        allowsEditing: false,
        exif: false,
      });

      if (!result.canceled && result.assets.length > 0) {
        const uploadService = getImageUploadService({ token: user!.token });
        const formData = new FormData();
        formData.append("image", {
          uri: result.assets[0].uri,
          name: `photo.jpg`,
          type: "image/jpeg",
        } as any);
        const remoteUrl = await uploadService.uploadImage(formData);
        setPhotoUri(remoteUrl);
      }
    } catch (error) {
      console.error("Error tomando foto:", error);
      alert("Error tomando foto. Por favor, inténtalo de nuevo.");
    } finally {
      setIsCapturingPhoto(false);
    }
  }

  async function handleSaveTask() {
    if (isSaving) return; // Prevenir múltiples guardados simultáneos
    let location = null;

    try {
      setIsSaving(true);

      const { status } = await requestForegroundPermissionsAsync();

      if (status === "granted") {
        const locationResult = await getCurrentPositionAsync({
          accuracy: Accuracy.Balanced,
        });
        location = {
          latitude: Number(locationResult.coords.latitude.toFixed(6)),
          longitude: Number(locationResult.coords.longitude.toFixed(6)),
        };
      }

      const newTask: Task = {
        id: Date.now().toString(),
        title: taskTitle,
        completed: false,
        photoUri: photoUri || undefined,
        location: location || undefined,
        userId: user ? user.id : "",
      };
      const todoService = getTodoService({ token: user!.token });
      await todoService.createTodo(newTask);
      onTaskCreated();
    } catch (error) {
      console.error("Error guardando tarea:", error);
      alert("Error guardando tarea. Por favor, inténtalo de nuevo.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <View style={styles.container}>
      <Title>Agregar nueva tarea</Title>
      <View>
        <Text style={styles.label}>Titulo de la tarea</Text>
        <TextInput
          style={styles.input}
          value={taskTitle}
          onChangeText={setTaskTitle}
        />
      </View>
      {photoUri ? (
        <View style={{ marginBottom: 0, marginTop: 16 }}>
          <Image
            source={{ uri: photoUri }}
            style={{ width: 200, height: 200 }}
            contentFit="contain"
          />
        </View>
      ) : (
        <View style={styles.emtyPhotoContainer}>
          <Text style={styles.emptyPhotoIcon}>📸</Text>
          <Text style={styles.emtyPhotoText}>Tomar foto para tu tarea</Text>
        </View>
      )}
      <Button
        type="success"
        text={photoUri ? "Volver a tomar foto" : "Tomar foto"}
        onPress={handleTakePhoto}
      />
      <View style={{ flexDirection: "column" }}>
        <Button
          type="primary"
          text="Agregar tarea"
          onPress={handleSaveTask}
          disabled={!taskTitle.trim() || isSaving}
          loading={isSaving}
        />
        <Button type="danger" text="Volver" onPress={onClose} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  label: {
    marginTop: 10,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    height: 20,
  },
  input: {
    height: 40,
    borderColor: "white",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginTop: 8,
    width: 200,
    borderRadius: 20,
    backgroundColor: "rgba(128, 128, 128, 0.5)",
    textAlign: "center",
    color: "white",
  },
  emtyPhotoContainer: {
    width: 200,
    height: 60,
    borderRadius: 10,
    backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  emptyPhotoIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  emtyPhotoText: {
    color: "white",
  },
});
