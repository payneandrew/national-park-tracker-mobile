import AsyncStorage from "@react-native-async-storage/async-storage";

export const addToVisitedParks = async (parkCode: string) => {
  try {
    const visitedParksJSON = await AsyncStorage.getItem("visitedParks");
    let visitedParks = visitedParksJSON ? JSON.parse(visitedParksJSON) : [];

    let newVisited: string[];

    if (visitedParks.includes(parkCode)) {
      newVisited = visitedParks.filter((id: string) => id !== parkCode);
    } else {
      newVisited = [...visitedParks, parkCode];
    }

    await AsyncStorage.setItem("visitedParks", JSON.stringify(newVisited));
  } catch (error) {
    console.error("Error adding park to visited parks:", error);
  }
};

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
