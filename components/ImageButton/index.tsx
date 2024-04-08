import { Image } from "expo-image";
import { Pressable, StyleSheet, Text } from "react-native";
import { ParkDetail } from "../../types/schemas";

interface ImageButtonProps {
  navigation: any;
  park: ParkDetail;
}
const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
export default function ImageButton({ navigation, park }: ImageButtonProps) {
  return (
    <Pressable
      key={park.id}
      style={styles.button}
      onPress={() => {
        navigation.navigate("Park Detail", {
          parkCode: park.parkCode,
          name: park.name,
        });
      }}
    >
      <Image
        source={{ uri: park.images ? park.images[0].url : "" }}
        style={styles.imageBackground}
        placeholder={blurhash}
        transition={200}
        contentFit="cover"
      >
        <Text style={styles.buttonText}>{park.fullName}</Text>
      </Image>
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
  imageBackground: {
    height: 200,
    justifyContent: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
