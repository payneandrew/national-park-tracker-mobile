import Ionicons from "@expo/vector-icons/Ionicons";
import * as Speech from "expo-speech";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Toast from "react-native-root-toast";
import useVisitedParks from "../../../hooks/UseVisitedParks";
import { colors } from "../../../theme";
import { ParkDetail } from "../../../types/schemas";
import ImageContainer from "../../ImageContainer";

interface ParkDetailScreenProps {
  route: any;
}

export default function ParkDetailScreen({ route }: ParkDetailScreenProps) {
  const { parkCode } = route.params;

  const [park, setPark] = useState<ParkDetail>();
  const [loading, setLoading] = useState(true);

  const { toggleVisited, isParkVisited } = useVisitedParks();

  const getPark = async () => {
    try {
      const response = await fetch(
        `https://developer.nps.gov/api/v1/parks?limit=500&api_key=${process.env.EXPO_PUBLIC_NPS_API_KEY}&parkCode=${parkCode}`
      );
      const json = await response.json();
      setPark(json.data[0]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPark();
  }, []);

  const speak = () => {
    let allText = "";

    allText += park ? park.fullName + ". " : "";
    allText += park && park.description ? park.description + ". " : "";
    allText += park && park.weatherInfo ? park.weatherInfo + ". " : "";
    allText +=
      park && park.activities
        ? "Activities: " +
          park.activities.map((activity) => activity.name).join(", ") +
          ". "
        : "";
    allText +=
      park && park.entranceFees
        ? "Entrance Fees: " +
          park.entranceFees
            .map(
              (fee) =>
                fee.title +
                ", Cost: $" +
                fee.cost +
                ", Description: " +
                fee.description
            )
            .join(". ") +
          ". "
        : "";
    allText += park && park.directionsInfo ? park.directionsInfo + ". " : "";
    Speech.speak(allText);
  };

  const handleToggleVisited = async () => {
    if (park) {
      await toggleVisited(park.parkCode);
      const message = isParkVisited(park.parkCode)
        ? "Park removed from visited parks"
        : "Park added to visited parks";
      Toast.show(message, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
        animation: true,
        shadow: true,
      });
    }
  };

  return (
    <ScrollView>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.copperBrown} />
        </View>
      ) : (
        <View style={{ flex: 1, margin: 10 }}>
          <Text style={styles.header}>{park?.fullName}</Text>
          <View style={{ marginVertical: 10 }}>
            {park && park.images && <ImageContainer image={park.images[0]} />}
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Button title="Speak" onPress={speak} />
            <Ionicons.Button
              name={
                isParkVisited(park?.parkCode || "") ? "star" : "star-outline"
              }
              onPress={handleToggleVisited}
              iconStyle={{
                justifyContent: "center",
                alignContent: "center",
              }}
            />
          </View>
          <Text style={styles.header}>Description</Text>
          <Text style={{ fontSize: 16, color: "#666" }}>
            {park && park.description}
          </Text>
          <Text style={styles.header}>Weather Information</Text>
          <Text style={{ fontSize: 16, color: "#666" }}>
            {park && park.weatherInfo}
          </Text>
          {park && park.activities && park.activities.length > 0 && (
            <>
              <Text style={styles.header}>Activities</Text>
              <View
                style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 5 }}
              >
                {park &&
                  park.activities.map((activity, index) => (
                    <View key={index} style={styles.activities}>
                      <Text style={{ color: "#fff" }}>{activity.name}</Text>
                    </View>
                  ))}
              </View>
            </>
          )}
          {park && park.entranceFees && park.entranceFees.length > 0 && (
            <>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: colors.copperBrown,
                  marginTop: 10,
                }}
              >
                Entrance Fees
              </Text>
              {park &&
                park.entranceFees.map((fee, index) => (
                  <View
                    key={index}
                    style={{
                      backgroundColor: "#f0f0f0",
                      borderRadius: 10,
                      marginTop: 5,
                      padding: 10,
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>{fee.title}</Text>
                    <Text>
                      <Text style={{ fontWeight: "bold" }}>Cost:</Text> $
                      {fee.cost}
                    </Text>
                    <Text>
                      <Text style={{ fontWeight: "bold" }}>Description:</Text>{" "}
                      {fee.description}
                    </Text>
                  </View>
                ))}
            </>
          )}
          <Text style={styles.header}>Directions</Text>
          <Text style={{ fontSize: 16, color: "#666" }}>
            {park && park.directionsInfo}
          </Text>
          {park && park.images && park.images.length > 0 && (
            <>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: colors.copperBrown,
                  marginTop: 10,
                }}
              >
                Images
              </Text>
              <View style={styles.imageContainer}>
                {park &&
                  park.images &&
                  park.images
                    .slice(1)
                    .map((image, index) => (
                      <ImageContainer key={index} image={image} />
                    ))}
              </View>
            </>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.copperBrown,
    marginTop: 10,
  },
  activities: {
    backgroundColor: "#000",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    margin: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: Dimensions.get("window").height,
  },
  imageContainer: {
    gap: 10,
  },
});
