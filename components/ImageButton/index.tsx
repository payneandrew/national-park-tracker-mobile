import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { ParkDetail } from "../../types/schemas";

interface ImageButtonProps {
  navigation: any;
  park: ParkDetail;
}
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

export default function ImageButton({ navigation, park }: ImageButtonProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Pressable
      style={styles.button}
      onPress={() => {
        navigation.navigate("Park Detail", {
          parkCode: park.parkCode,
          name: park.name,
        });
      }}
    >
      <View style={styles.container}>
        <Image
          source={{ uri: park.images ? park.images[0].url : "" }}
          style={styles.imageBackground}
          transition={200}
          contentFit="cover"
          onLoad={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <View style={StyleSheet.absoluteFill}>
            <ShimmerPlaceholder
              style={styles.imageBackground}
              duration={1000}
            />
          </View>
        )}
        <View style={styles.overlay}>
          <Text style={styles.buttonText}>{park.fullName}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    elevation: 3,
    overflow: "hidden",
  },
  container: {
    position: "relative",
    borderRadius: 10,
    overflow: "hidden",
    height: 200,
  },
  imageBackground: {
    flex: 1,
    borderRadius: 10,
    width: "auto",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    padding: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
