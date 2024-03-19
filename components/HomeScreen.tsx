import { useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ParkDetail } from "../types/schemas";

export default function HomeScreen({ navigation }) {
  const [parks, setParks] = useState<ParkDetail[]>();

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
    }
  };

  useEffect(() => {
    getParks();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {parks &&
          parks.map((park) => {
            return (
              <Button
                key={park.id}
                title={park.fullName}
                onPress={() =>
                  navigation.navigate("Park Detail", {
                    parkCode: park.parkCode,
                  })
                }
                color="green"
              />
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
