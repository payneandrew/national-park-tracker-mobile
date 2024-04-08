import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import { USStates } from "../../../data/states";
import { colors } from "../../../theme";

interface StatesScreenProps {
  navigation: any;
}

export default function HomeScreen({ navigation }: StatesScreenProps) {
  return (
    <ScrollView style={styles.container}>
      {Object.entries(USStates).map(([stateCode, stateName]) => {
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
      })}
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
