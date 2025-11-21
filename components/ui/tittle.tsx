import { ReactNode } from "react";
import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";

interface TitleProps {
  style?: StyleProp<TextStyle>;
  children: ReactNode;
}

export default function Title({ style, children }: TitleProps) {
  return <Text style={[styles.title, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    color: "white",
  },
});
