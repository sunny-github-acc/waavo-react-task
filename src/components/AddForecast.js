import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { search } from "./icons/search";

const AddForecast = () => {
  const dispatch = useDispatch();
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState();
  const [message, setMessage] = useState("");
  const [messageDisplay, setMessageDisplay] = useState(false);
  const [error, setError] = useState(false);

  const getData = () => {
    setError(false);
    setMessage("");
    setMessageDisplay(false);

    if (!city) return setMessage("Enter a city name");

    const API = "fe9a370dc20ad36fad8f9a1d94ae25c9";
    const URL =
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=metric&appid=" +
      API;
    const weekURL =
      "http://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&units=metric&appid=" +
      API;

    const fetchData = async () => {
      await fetch(URL)
        .then((res) => res.json())
        .then((data) => {
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
                saved: false,
              },
            }));
          }
        })
        .catch((error) => {
          setError(true);
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
          } else if (parseInt(data.cod) === 404) {
            setMessage("We could not find such city");
          }
        })
        .catch((error) => {
          setError(true);
        });
    };

    fetchData();
    fetchDataWeek();
  };

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const addForecast = (e) => {
    e.preventDefault();

    getData();
    setMessageDisplay(true);
  };

  useEffect(() => {
    if (!weather) return;
    if (!weather.weekly || !weather.weekly) return;

    const dispatchForecast = () => {
      dispatch({
        type: "CREATE_FORECAST",
        payload: weather,
      });
    };
    dispatchForecast();
  }, [weather, dispatch]);

  return (
    <div className={"title"}>
      <form onSubmit={addForecast}>
        <div className="input-container">
          <input
            onChange={(e) => handleChange(e)}
            name="city"
            placeholder={"City.."}
            className="form-control form-rounded p-4 shadow-sm input"
          />
          <button
            type="submit"
            className="btn btn-primary form-control form-rounded p-4 shadow-sm search"
            name="city"
          >
            {search}
          </button>
        </div>
        {messageDisplay && <p>{message}</p>}
        {error && <p>There has been an error</p>}
      </form>
    </div>
  );
};

export default AddForecast;
