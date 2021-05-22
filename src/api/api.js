import axios from "axios";

export const getData = async (city) => {
  let error = null,
    daily = "",
    weekly = "";

  const API = "fe9a370dc20ad36fad8f9a1d94ae25c9";
  const dailyURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=metric&appid=" +
    API;
  const weeklyURL =
    "http://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&units=metric&appid=" +
    API;

  const getDaily = async () => {
    await axios
      .get(dailyURL)
      .then((response) => {
        response = response.data;
        return (daily = {
          city: response.name,
          temp: response.main.temp,
          feels_like: response.main.feels_like,
          temp_max: response.main.temp_max,
          temp_min: response.main.temp_min,
          clouds: response.weather[0].description,
          saved: false,
        });
      })
      .catch((err) => {
        return (error = err);
      });
  };

  const getWeekly = async () => {
    await axios
      .get(weeklyURL)
      .then((response) => {
        response = response.data;
        let days = {},
          currentDay = {};

        Array.apply(null, Array(5)).map(
          (x, i) =>
            (days[`day_${i + 1}`] = {
              date: response.list[i * 8].dt_txt,
              temp_max: response.list[i * 8].main.temp_max,
              temp_min: response.list[i * 8].main.temp_min,
              description: response.list[i * 8].weather[0].description,
            })
        );

        currentDay = { response };

        return (weekly = { days, currentDay });
      })
      .catch((err) => {
        return (error = err);
      });
  };

  await getDaily();
  await getWeekly();

  if (error) return { error };

  return { daily, weekly, error };
};
