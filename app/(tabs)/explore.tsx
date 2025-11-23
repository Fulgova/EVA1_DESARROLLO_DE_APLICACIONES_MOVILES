import Background from "@/components/ui/background";
import Title from "@/components/ui/tittle";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabTwoScreen() {
  return (
    <Background source={require("../../assets/background.jpg")}>
      <SafeAreaView style={styles.container}>
        <View>
          <Title>Segunda pestaña</Title>
        </View>
      </SafeAreaView>
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
