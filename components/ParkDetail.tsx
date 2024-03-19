import * as Speech from "expo-speech";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { colors } from "../theme";
import { ParkDetail } from "../types/schemas";

export default function ParkDetailScreen({ route }) {
  const { parkCode } = route.params;

  const [park, setPark] = useState<ParkDetail>();
  const [loading, setLoading] = useState(true);

  //TODO remove api key
  const apiKey = "FedT7DCR1sq9g1l5ZMGdjcikT2GcbXOjdrhehvKj";

  const getPark = async () => {
    try {
      const response = await fetch(
        `https://developer.nps.gov/api/v1/parks?limit=500&api_key=${apiKey}&parkCode=${parkCode}`
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

  return (
    <ScrollView>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.copperBrown} />
        </View>
      ) : (
        <View style={{ flex: 1, margin: 10 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  color: colors.copperBrown,
                }}
              >
                {park && park.fullName}
              </Text>
              <Button title="Speak" onPress={speak} />
            </View>
          </View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: colors.copperBrown,
              marginTop: 10,
            }}
          >
            Description
          </Text>
          <Text style={{ fontSize: 16, color: "#666" }}>
            {park && park.description}
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: colors.copperBrown,
              marginTop: 10,
            }}
          >
            Weather Information
          </Text>
          <Text style={{ fontSize: 16, color: "#666" }}>
            {park && park.weatherInfo}
          </Text>
          {park && park.activities && park.activities.length > 0 && (
            <>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: colors.copperBrown,
                  marginTop: 10,
                }}
              >
                Activities
              </Text>
              <View
                style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 5 }}
              >
                {park &&
                  park.activities.map((activity, index) => (
                    <View
                      key={index}
                      style={{
                        backgroundColor: "#000",
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        borderRadius: 20,
                        margin: 5,
                      }}
                    >
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
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: colors.copperBrown,
              marginTop: 10,
            }}
          >
            Directions
          </Text>
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
                  park.images.map((image, index) => (
                    <Image
                      key={index}
                      source={{ uri: image.url }}
                      style={styles.image}
                    />
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
  container: {
    flex: 1,
    margin: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: Dimensions.get("window").height,
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 5,
  },
  image: {
    width: Dimensions.get("window").width - 20,
    height: 200,
    margin: 5,
  },
});
