import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StatesScreen from "../components/HomeScreen";
import ParkDetailScreen from "../components/ParkDetail";

const Stack = createNativeStackNavigator();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#C56C39",
        },
        headerTintColor: "white",
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="States"
        component={StatesScreen}
        options={{ title: "States" }}
      />
      <Stack.Screen
        name="Park Detail"
        component={ParkDetailScreen}
        options={{ title: "Park Detail" }}
      />
    </Stack.Navigator>
  );
}
