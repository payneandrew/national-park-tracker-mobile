import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { USStates } from "../../../data/states";
import { colors } from "../../../theme";
import { ParkDetail } from "../../../types/schemas";

interface StatesScreenProps {
  navigation: any;
}

export default function HomeScreen({ navigation }: StatesScreenProps) {
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
    <ScrollView style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer} testID="loading-indicator">
          <ActivityIndicator size="large" color={colors.copperBrown} />
        </View>
      ) : (
        parks &&
        Object.entries(USStates).map(([stateCode, stateName]) => {
          return (
            <Pressable
              key={stateCode}
              style={styles.button}
              onPress={() => {
                navigation.navigate("State Detail", {
                  stateCode: stateCode,
                  name: stateName,
                });
              }}
            >
              <Text style={styles.buttonText}>{stateName}</Text>
            </Pressable>
          );
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
  button: {
    backgroundColor: colors.blackLeatherJacket,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 20,
    elevation: 3,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
