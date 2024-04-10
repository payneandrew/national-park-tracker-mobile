import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { SafeAreaView } from "react-native-safe-area-context";
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
  const [destination, setDestination] = useState<any>(null);
  const [origin, setOrigin] = useState<any>(null);

  console.log("destination", destination);

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
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.copperBrown} />
        </View>
      ) : parks ? (
        <View style={styles.container}>
          <View style={styles.searchContainer}>
            {/* Origin search */}
            <GooglePlacesAutocomplete
              placeholder="Origin"
              fetchDetails={true}
              onPress={(data, details = null) => {
                if (details && details.geometry && details.geometry.location) {
                  setOrigin({
                    latitude: details.geometry.location.lat,
                    longitude: details.geometry.location.lng,
                  });
                }
              }}
              query={{
                key: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
                language: "en",
              }}
              debounce={200}
              styles={styles.autocompleteContainer}
            />
            {/* Destination search */}
            <GooglePlacesAutocomplete
              placeholder="Destination"
              fetchDetails={true}
              onPress={(data, details = null) => {
                if (details && details.geometry && details.geometry.location) {
                  setDestination({
                    latitude: details.geometry.location.lat,
                    longitude: details.geometry.location.lng,
                  });
                }
              }}
              query={{
                key: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
                language: "en",
              }}
              debounce={200}
              styles={styles.autocompleteContainer}
            />
          </View>
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
                  identifier={park.id}
                  coordinate={{
                    latitude: Number(park.latitude),
                    longitude: Number(park.longitude),
                  }}
                  title={park.name}
                />
              );
            })}
            {process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY && (
              <MapViewDirections
                origin={origin}
                destination={destination}
                apikey={process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}
                strokeWidth={3}
                strokeColor="blue"
                mode={"DRIVING"}
              />
            )}
          </MapView>
        </View>
      ) : (
        <View>
          <Text>No parks found.</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
    zIndex: 1,
  },
  autocompleteContainer: {
    flex: 1,
    backgroundColor: "transparent",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "gray",
  },
});
