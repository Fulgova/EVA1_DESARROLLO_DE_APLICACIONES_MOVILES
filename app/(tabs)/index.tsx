import { useAuth } from "@/components/context/auth-context";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const [count, setCount] = useState(0);
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleIncrement = () => {
    setCount(count + 1);
  }

  const handleLogout = () => {
    logout();
    router.replace('/login');
  }

  return (
    <View style={styles.container}>

      {/* Panel principal */}
      <View style={styles.section}>
        <Text style={styles.title}>Panel principal de {user?.name}</Text>
      </View>

      {/* Contador */}
      <View style={styles.section}>
        <Text style={styles.text}>Esto es un contador: {count}</Text>
        <Pressable style={styles.button} onPress={handleIncrement}>
          <Text style={styles.buttonText}>Incrementar</Text>
        </Pressable>
      </View>

      {/* Modal */}
      <View style={styles.section}>
        <Text style={styles.text}>Modal</Text>
        <Link href="/modal" style={styles.button}>
          <Text style={styles.buttonText}>Abrir modal</Text>
        </Link>
      </View>

      {/* Logout */}
      <View style={styles.section}>
        <Pressable style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Cerrar sesión</Text>
        </Pressable>
      </View>

    </View>
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
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    padding: 10,
    backgroundColor: "#007AFF",
    borderRadius: 20,
    width: 200,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
  },
});
