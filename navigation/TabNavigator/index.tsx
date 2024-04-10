import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TripPlannerScreen from "../../components/screens/TripPlanner";
import { colors } from "../../theme";
import MainStackNavigator from "../MainStackNavigator";
import VisitedParksStackNavigator from "../VisitedParksStackNavigator";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string | undefined;

          if (route.name === "Home") {
            iconName = focused ? "md-home" : "md-home-outline";
          } else if (route.name === "Visited Parks") {
            iconName = focused ? "star" : "star-outline";
          } else if (route.name === "Trip Planner") {
            iconName = focused ? "map" : "map-outline";
          }
          //@ts-ignore
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.copperBrown,
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={MainStackNavigator} />
      <Tab.Screen name="Visited Parks" component={VisitedParksStackNavigator} />
      <Tab.Screen name="Trip Planner" component={TripPlannerScreen} />
    </Tab.Navigator>
  );
}
