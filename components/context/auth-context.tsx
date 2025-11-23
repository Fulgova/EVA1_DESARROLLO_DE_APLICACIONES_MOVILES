import {
  clearSessionFromStorage,
  loadSessionFromStorage,
  saveSessionToStorage,
} from "@/utils/storage";
import { router } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";

export interface User {
  id: string;
  name: string;
}

interface AuthContextProps {
  user: User | null;
  login: (username: string, name: string) => void;
  logout: () => void;
}

const EXPECTED_USER = [
  { id: "1", name: "osvaldo", password: "1234" },
  { id: "2", name: "sebastian", password: "1234" },
];

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    loadSessionFromStorage().then((loadedUser) => {
      if (loadedUser) {
        setUser(loadedUser);
      }
    });
  }, []);

  useEffect(() => {
    if (user) router.replace("/(tabs)");
  }, [user]);

  const login = (username: string, password: string) => {
    const foundUser = EXPECTED_USER.find(
      (u) => u.name === username && u.password === password
    );

    if (foundUser) {
      setUser({ id: foundUser.id, name: foundUser.name });
      saveSessionToStorage({ id: foundUser.id, name: foundUser.name });
      Alert.alert(
        "Inicio de sesión exitoso",
        `Bienvenido de nuevo, ${foundUser.name}!`
      );
    } else {
      throw new Error(
        "Error al iniciar sesión: nombre de usuario o contraseña incorrectos."
      );
    }
  };

  const logout = () => {
    setUser(null);
    clearSessionFromStorage();
    Alert.alert(
      "Cierre de sesión exitoso",
      "Has cerrado sesión correctamente."
    );
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
