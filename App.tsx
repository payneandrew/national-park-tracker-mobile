import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { RootSiblingParent } from "react-native-root-siblings";
import TabNavigator from "./navigation/TabNavigator";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <RootSiblingParent>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </RootSiblingParent>
  );
}
