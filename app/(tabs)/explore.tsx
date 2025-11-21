import Background from "@/components/ui/background";
import Title from "@/components/ui/tittle";
import { StyleSheet, View } from "react-native";

export default function TabTwoScreen() {
  return (
    <Background source={require("../../assets/background.jpg")}>
      <View style={styles.container}>
        <Title>Segunda pestaña</Title>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
