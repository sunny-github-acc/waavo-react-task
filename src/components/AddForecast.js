import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const AddForecast = () => {
  const dispatch = useDispatch();
  const [city, setCity] = useState("klaipeda");

  const [weather, setWeather] = useState();

  useEffect(() => {
    const URL =
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=metric&appid=fe9a370dc20ad36fad8f9a1d94ae25c9";
    const weekURL =
      "http://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&units=metric&appid=fe9a370dc20ad36fad8f9a1d94ae25c9";

    const fetchData = async () => {
      await fetch(URL)
        .then((res) => res.json())
        .then((data) => {
          console.log("data: ", weather);
          if (parseInt(data.cod) === 200) {
            setWeather((prev) => ({
              ...prev,
              daily: {
                city: data.name,
                temp: data.main.temp,
                feels_like: data.main.feels_like,
                temp_max: data.main.temp_max,
                temp_min: data.main.temp_min,
                clouds: data.weather[0].description,
              },
            }));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const fetchDataWeek = async () => {
      await fetch(weekURL)
        .then((res) => res.json())
        .then((data) => {
          if (parseInt(data.cod) === 200) {
            let days = {};
            Array.apply(null, Array(5)).map(
              (x, i) =>
                (days[`day_${i + 1}`] = {
                  date: data.list[i * 8].dt_txt,
                  temp_max: data.list[i * 8].main.temp_max,
                  temp_min: data.list[i * 8].main.temp_min,
                  description: data.list[i * 8].weather[0].description,
                })
            );
            setWeather((prev) => ({
              ...prev,
              weekly: {
                days,
              },
            }));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
    fetchDataWeek();
  }, [city]);

  const handleChange = (e) => {
    e.persist();
    setCity(e.target.value);
  };

  const addForecast = () => {
    dispatch({
      type: "CREATE_FORECAST",
      payload: weather,
    });
  };
  return (
    <div className={"add"}>
      <div className="input-section">
        <input
          onChange={(e) => handleChange(e)}
          name={"city"}
          placeholder={"City.."}
        />
      </div>
      <button onClick={addForecast}>Search</button>
    </div>
  );
};

export default AddForecast;
