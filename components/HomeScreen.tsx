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
import { colors } from "../theme";
import { ParkDetail } from "../types/schemas";

export default function StatesScreen({ navigation }) {
  const [parks, setParks] = useState<ParkDetail[]>();
  const [loading, setLoading] = useState(true);

  const apiKey = "FedT7DCR1sq9g1l5ZMGdjcikT2GcbXOjdrhehvKj";

  const getParks = async () => {
    try {
      const response = await fetch(
        `https://developer.nps.gov/api/v1/parks?limit=500&api_key=${apiKey}`
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
    <>
      <ScrollView>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.copperBrown} />
          </View>
        ) : (
          parks &&
          parks.map((park) => {
            return (
              <Pressable
                key={park.id}
                style={styles.button}
                onPress={() =>
                  navigation.navigate("Park Detail", {
                    parkCode: park.parkCode,
                  })
                }
              >
                <Text style={styles.buttonText}>{park.fullName}</Text>
              </Pressable>
            );
          })
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 10,
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
