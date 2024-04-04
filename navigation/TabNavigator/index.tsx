import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainStackNavigator from "../MainStackNavigator";
import VisitedParksStackNavigator from "../VisitedParksStackNavigator";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={MainStackNavigator} />
      <Tab.Screen name="Visited Parks" component={VisitedParksStackNavigator} />
    </Tab.Navigator>
  );
}
