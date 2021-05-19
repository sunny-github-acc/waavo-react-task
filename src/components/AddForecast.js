import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const AddForecast = () => {
  const dispatch = useDispatch();
  const [city, setCity] = useState("");
  const [error, setError] = useState(false);

  const [weather, setWeather] = useState();

  useEffect(() => {
    setError(false);
    if (!city) return;

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
          }
        })
        .catch((error) => {
          setError(true);
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
    if (!weather) return;

    dispatch({
      type: "CREATE_FORECAST",
      payload: weather,
    });
  };
  return (
    <div className={"text-center title "}>
      <div className="input-section search-loaction input-container ">
        <input
          onChange={(e) => handleChange(e)}
          name={"city"}
          placeholder={"City.."}
          className="form-control text-muted form-rounded p-4 shadow-sm input"
        />
      </div>
      <button onClick={addForecast} className=" btn btn-primary">
        Search
      </button>
      {error && <p>No such city</p>}
    </div>
  );
};

export default AddForecast;
