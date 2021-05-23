import axios from "axios";

export const getData = async (city) => {
  let location,
    daily = {},
    weekly = {},
    error = false;

  const API = "fe9a370dc20ad36fad8f9a1d94ae25c9";
  const URL =
    "http://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&units=metric&appid=" +
    API;

  const getData = async () => {
    await axios
      .get(URL)
      .then((response) => {
        response = response.data;

        location = {
          country: response.city.country,
          city: response.city.name,
        };

        Array.apply(null, Array(5)).map((x, i) => {
          daily[i] = {
            date: response.list[i].dt_txt,
            temp: response.list[i].main.temp,
            feels_like: response.list[i].main.feels_like,
            temp_max: response.list[i].main.temp_max,
            temp_min: response.list[i].main.temp_min,
            description: response.list[i].weather[0].description,
            saved: false,
          };
          weekly[i] = {
            date: response.list[i * 8].dt_txt,
            temp_max: response.list[i * 8].main.temp_max,
            temp_min: response.list[i * 8].main.temp_min,
            description: response.list[i * 8].weather[0].description,
          };
          return null;
        });

        return null;
      })
      .catch(() => {
        console.log("response: ", city);
        error = true;
        location = city;
      });
  };

  await getData();

  return { location, daily, weekly, error };
};
