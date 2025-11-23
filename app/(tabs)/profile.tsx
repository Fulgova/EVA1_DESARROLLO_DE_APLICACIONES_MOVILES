import { useAuth } from "@/components/context/auth-context";
import Background from "@/components/ui/background";
import Button from "@/components/ui/button";
import Title from "@/components/ui/tittle";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <Background source={require("../../assets/background.jpg")}>
      <SafeAreaView style={styles.container}>
        {/* Panel principal */}
        <View style={styles.section}>
          <Title>Panel de configuración de {user?.name}</Title>
        </View>

        {/* Logout */}
        <View style={styles.section}>
          <Button type="danger" text="Cerrar sesión" onPress={handleLogout} />
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
});
