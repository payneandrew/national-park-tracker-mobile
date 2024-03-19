import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ParkDetail } from "../types/schemas";

// interface ParkDetailScreenProps {
//   route: RouteProp<{ params: { post?: string } }, "params">;
// }
export default function ParkDetailScreen({ route }) {
  const { parkCode } = route.params;

  const [park, setPark] = useState<ParkDetail[]>();

  const apiKey = "FedT7DCR1sq9g1l5ZMGdjcikT2GcbXOjdrhehvKj";

  const getPark = async () => {
    try {
      const response = await fetch(
        `https://developer.nps.gov/api/v1/parks?limit=500&api_key=${apiKey}&parkCode=${parkCode}`
      );
      const json = await response.json();
      setPark(json.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPark();
  }, []);

  console.log(park);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text>{park && park[0].fullName}</Text>
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
