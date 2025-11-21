import { useAuth } from "@/components/context/auth-context";
import Background from "@/components/ui/background";
import Title from "@/components/ui/tittle";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <Background source={require("../../assets/background.jpg")}>
      <View style={styles.container}>
        {/* Panel principal */}
        <View style={styles.section}>
          <Title>Panel principal de {user?.name}</Title>
        </View>

        {/* Logout */}
        <View style={styles.section}>
          <Pressable style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Cerrar sesión</Text>
          </Pressable>
        </View>
      </View>
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
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
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
