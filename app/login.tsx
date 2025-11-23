import { useAuth } from "@/components/context/auth-context";
import Background from "@/components/ui/background";
import Button from "@/components/ui/button";
import Title from "@/components/ui/tittle";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const headleUsernameChange = (text: string) => {
    setUsername(text.toLowerCase());
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text.toLowerCase());
  };

  const handleLogin = () => {
    try {
      login(username, password);
    } catch (error) {
      Alert.alert("Login failed", (error as Error).message);
    }
  };

  return (
    <Background source={require("../assets/background.jpg")}>
      <SafeAreaView style={styles.container}>
        <Title>Pantalla de inicio de sesión</Title>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nombre de usuario:</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre de usuario"
            autoCapitalize="none"
            value={username}
            onChangeText={headleUsernameChange}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Contraseña:</Text>
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            autoCapitalize="none"
            value={password}
            onChangeText={handlePasswordChange}
          />
        </View>
        <Button type="primary" text="Iniciar sesión" onPress={handleLogin} />
      </SafeAreaView>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  inputContainer: {
    width: "80%",
    marginTop: 16,
    alignItems: "center",
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
});
