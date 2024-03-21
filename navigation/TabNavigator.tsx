import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import VisitedParksScreen from "../components/VisitedParksScreen";
import MainStackNavigator from "./MainStackNavigator";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={MainStackNavigator} />
      <Tab.Screen name="Visited Parks" component={VisitedParksScreen} />
    </Tab.Navigator>
  );
}
