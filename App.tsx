import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./components/HomeScreen";
import ParkDetailScreen from "./components/ParkDetail";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
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
          name="Home"
          component={HomeScreen}
          options={{ title: "Home" }}
        />
        <Stack.Screen
          name="Park Detail"
          component={ParkDetailScreen}
          options={{ title: "Park Detail" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
