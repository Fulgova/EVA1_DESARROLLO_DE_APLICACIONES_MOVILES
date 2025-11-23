import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  type?: "primary" | "outlined" | "success" | "danger" | "warning";
  text: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export default function Button({
  type = "primary",
  text,
  onPress,
  disabled = false,
  loading = false,
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[type],
        (disabled || loading) && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[
          styles.buttonText,
          type === "outlined" && styles.buttonTextOutlined,
        ]}
      >
        {loading ? "Cargando..." : text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    padding: 10,
    backgroundColor: "#007AFF",
    width: 200,
    borderRadius: 20,
    borderColor: "white",
    borderWidth: 1,
  },
  primary: {
    backgroundColor: "#007AFF",
  },
  outlined: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  success: {
    backgroundColor: "#34C759",
  },
  danger: {
    backgroundColor: "#FF3B30",
  },
  warning: {
    backgroundColor: "#FF9500",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  buttonTextOutlined: {
    color: "#007AFF",
  },
  disabled: {
    opacity: 0.6,
  },
});
