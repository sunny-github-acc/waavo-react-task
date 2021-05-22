import { weatherConditions } from "./icons/weatherConditions";

export const getWeather = (description) => {
  let currentWeather;

  switch (true) {
    case description.includes("cloud"):
      currentWeather = weatherConditions["cloud"];
      break;
    case description.includes("rain"):
      currentWeather = weatherConditions["rain"];
      break;
    case description.includes("sky"):
      currentWeather = weatherConditions["sky"];
      break;
    case description.includes("snow"):
      currentWeather = weatherConditions["snow"];
      break;
    default:
      currentWeather = "";
  }

  return currentWeather;
};
