import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { colors } from "../../../theme";
import { ParkDetail } from "../../../types/schemas";
import ImageButton from "../../ImageButton";

interface StateDetailScreenProps {
  navigation: any;
  route: any;
}

export default function StateDetailScreen({
  navigation,
  route,
}: StateDetailScreenProps) {
  const { stateCode } = route.params;
  const [parks, setParks] = useState<ParkDetail[]>();
  const [loading, setLoading] = useState(true);

  const getParks = async () => {
    try {
      const response = await fetch(
        `https://developer.nps.gov/api/v1/parks?limit=500&api_key=${process.env.EXPO_PUBLIC_NPS_API_KEY}&stateCode=${stateCode}`
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
    <ScrollView style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer} testID="loading-indicator">
          <ActivityIndicator size="large" color={colors.copperBrown} />
        </View>
      ) : (
        parks &&
        parks.map((park) => {
          return <ImageButton park={park} navigation={navigation} />;
        })
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
});
