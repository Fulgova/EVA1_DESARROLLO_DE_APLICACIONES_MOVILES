import { useAuth } from "@/components/context/auth-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function LoginScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const { login } = useAuth();

    const headleUsernameChange = (text: string) => {
        setUsername(text.toLowerCase());
    }

    const handlePasswordChange = (text: string) => {
        setPassword(text.toLowerCase());
    }

    const handleLogin = () => {
        try {
            login(username, password);
            router.replace('/(tabs)');
        } catch (error) {
            Alert.alert('Login failed', (error as Error).message);
        }
    }

    return (
        <View style={styles.container}>
            <Text>Pantalla de inicio de sesión</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Nombre de usuario:</Text>
                <TextInput style={styles.input} placeholder="Nombre de usuario" autoCapitalize="none" value={username} onChangeText={headleUsernameChange} />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Contraseña:</Text>
                <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry autoCapitalize="none" value={password} onChangeText={handlePasswordChange} />
            </View>
            <Pressable style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Iniciar sesión</Text>
            </Pressable>
        </View>
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
        width: '80%',
        marginTop: 16,
    },
    label: {
        marginTop: 8,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginTop: 8,
        width: '100%',
        borderRadius: 20,
    },
    button: {
        marginTop: 20,
        padding: 10,
        backgroundColor: "#007AFF",
        width: '80%',
        borderRadius: 20,
    },
    buttonText: {
        color: "white",
        textAlign: "center",
    }
});