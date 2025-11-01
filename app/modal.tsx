import { Link } from 'expo-router';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';

export default function ModalScreen() {
  return (
    <ImageBackground source={require('../assets/modal-background.jpg')} style={styles.background}>
    <View style={styles.container}>
      <Text style={styles.title}>Esto es una modal</Text>
      <Link href="/" dismissTo style={styles.link}>
        <Text>Cerrar</Text>
      </Link>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  link: {
    marginTop: 20,
    color: '#007AFF',
  },
    background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
