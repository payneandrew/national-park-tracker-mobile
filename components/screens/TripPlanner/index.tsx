import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { colors } from "../../../theme";
import { ParkDetail } from "../../../types/schemas";

interface TripPlannerScreenProps {
  navigation: any;
}

export default function TripPlannerScreen({
  navigation,
}: TripPlannerScreenProps) {
  const [parks, setParks] = useState<ParkDetail[]>();
  const [loading, setLoading] = useState(true);

  const getParks = async () => {
    try {
      const response = await fetch(
        `https://developer.nps.gov/api/v1/parks?limit=500&api_key=${process.env.EXPO_PUBLIC_NPS_API_KEY}`
      );
      const json = await response.json();
      setParks(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getParks();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.copperBrown} />
        </View>
      ) : parks ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: Number(parks[0].latitude),
            longitude: Number(parks[0].longitude),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {parks.map((park) => {
            return (
              <Marker
                key={park.id}
                coordinate={{
                  latitude: Number(park.latitude),
                  longitude: Number(park.longitude),
                }}
              />
            );
          })}
        </MapView>
      ) : (
        <View>
          <Text>No parks found.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: Dimensions.get("window").height,
  },
});
