import { ReactNode } from "react";
import {
  ImageBackground,
  ImageStyle,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";

interface BackgroundProps {
  source: any; // la imagen de fondo
  style?: StyleProp<ViewStyle>; // estilo del contenedor
  imageStyle?: StyleProp<ImageStyle>; // estilo de la imagen
  children: ReactNode;
}

export default function Background({
  source,
  style,
  imageStyle,
  children,
}: BackgroundProps) {
  return (
    <ImageBackground
      source={source}
      style={[styles.container, style]}
      imageStyle={imageStyle}
      resizeMode="cover"
    >
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
