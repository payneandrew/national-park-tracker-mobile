import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { colors } from "../../../theme";
import { ParkDetail } from "../../../types/schemas";
import { getVisitedParks } from "../../../utils/GetVisitedParks";
import ImageButton from "../../ImageButton";

interface VisitedParksScreenProps {
  navigation: any;
}

export default function VisitedParksScreen({
  navigation,
}: VisitedParksScreenProps) {
  const [parks, setParks] = useState<ParkDetail[]>();
  const [loading, setLoading] = useState(true);

  const fetchVisitedParksData = async () => {
    try {
      const visitedParks = await getVisitedParks();

      const shouldFetchData = visitedParks && visitedParks.length !== 0;

      if (shouldFetchData) {
        const response = await fetch(
          `https://developer.nps.gov/api/v1/parks?api_key=${
            process.env.EXPO_PUBLIC_NPS_API_KEY
          }&parkCode=${visitedParks.join(",")}`
        );
        const json = await response.json();
        setParks(json.data);
      } else {
        setParks([]);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchVisitedParksData();
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.copperBrown} />
        </View>
      ) : parks && parks.length ? (
        parks.map((park) => (
          <ImageButton key={park.id} park={park} navigation={navigation} />
        ))
      ) : (
        <View style={styles.emptyState}>
          <Text>No visited parks yet!</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  loadingContainer: {
    height: Dimensions.get("window").height,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyState: {
    justifyContent: "center",
    alignItems: "center",
  },
});
