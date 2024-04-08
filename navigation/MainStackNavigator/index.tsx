import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../components/screens/HomeScreen";
import ParkDetailScreen from "../../components/screens/ParkDetail";
import StateDetailScreen from "../../components/screens/StateDetailScreen";

const Stack = createNativeStackNavigator();

export default function MainStackNavigator() {
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
        name="Home Stack"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
      <Stack.Screen
        name="State Detail"
        component={StateDetailScreen}
        options={({ route }) => ({
          // @ts-ignore
          title: route.params ? route.params.name : "State Detail",
        })}
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
