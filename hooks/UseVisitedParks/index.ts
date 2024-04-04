import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const useVisitedParks = () => {
  const [visited, setVisited] = useState<string[]>([]);

  useEffect(() => {
    const getVisitedParks = async () => {
      try {
        const visitedParksJSON = await AsyncStorage.getItem("visitedParks");
        const visitedParks = visitedParksJSON
          ? JSON.parse(visitedParksJSON)
          : [];
        setVisited(visitedParks);
      } catch (error) {
        console.error("Error fetching visited parks:", error);
      }
    };

    getVisitedParks();
  }, []);

  const isParkVisited = (parkCode: string) => {
    return visited.includes(parkCode);
  };

  const toggleVisited = async (parkCode: string) => {
    try {
      const visitedParksJSON = await AsyncStorage.getItem("visitedParks");
      let visitedParks = visitedParksJSON ? JSON.parse(visitedParksJSON) : [];

      let newVisited: string[];

      if (visitedParks.includes(parkCode)) {
        newVisited = visitedParks.filter((id: string) => id !== parkCode);
      } else {
        newVisited = [...visitedParks, parkCode];
      }

      setVisited(newVisited);
      await AsyncStorage.setItem("visitedParks", JSON.stringify(newVisited));
    } catch (error) {
      console.error("Error toggling visited park:", error);
    }
  };

  return { isParkVisited, toggleVisited };
};

export default useVisitedParks;
