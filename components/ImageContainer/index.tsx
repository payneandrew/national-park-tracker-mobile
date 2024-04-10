import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { ParkImage } from "../../types/schemas";

interface ImageContainerProps {
  image: ParkImage;
}
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

export default function ImageContainer({ image }: ImageContainerProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: image.url }}
        style={styles.imageBackground}
        transition={200}
        contentFit="cover"
        onLoad={() => setImageLoaded(true)}
      />
      {!imageLoaded && (
        <View style={StyleSheet.absoluteFill}>
          <ShimmerPlaceholder style={styles.imageBackground} duration={1000} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    overflow: "hidden",
    height: 200,
    elevation: 3,
  },
  imageBackground: {
    flex: 1,
    width: "auto",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
