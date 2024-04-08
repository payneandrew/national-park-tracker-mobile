import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ParkDetailScreen from "../../components/screens/ParkDetail";
import VisitedParksScreen from "../../components/screens/VisitedParksScreen";

const Stack = createNativeStackNavigator();

export default function VisitedParksStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#C56C39",
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="Visited Parks Screen"
        component={VisitedParksScreen}
        options={{ title: "Visited Parks" }}
      />
      <Stack.Screen
        name="Park Detail"
        component={ParkDetailScreen}
        options={({ route }) => ({
          // @ts-ignore
          title: route.params ? route.params.name : "Park Detail",
        })}
      />
    </Stack.Navigator>
  );
}
