import AsyncStorage from "@react-native-async-storage/async-storage";

export const getVisitedParks = async (): Promise<string[]> => {
  try {
    const visitedParksJSON = await AsyncStorage.getItem("visitedParks");
    const visitedParks = visitedParksJSON ? JSON.parse(visitedParksJSON) : [];
    return visitedParks;
  } catch (error) {
    console.log(error);
    return [];
  }
};
