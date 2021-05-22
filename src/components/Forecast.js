import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { weatherConditions } from "./icons/weatherConditions";

const Forecast = (props) => {
  const [isDaily, setIsDaily] = useState(true);
  const dispatch = useDispatch();

  if (!props.daily)
    return (
      <div className={"forecast-wrapper   my-4"}>
        <div className="forecasts text-center title">
          We could not find such location
        </div>
      </div>
    );

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const date = new Date(props.weekly.days.day_1.date);
  const year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
  const month = new Intl.DateTimeFormat("en", { month: "short" }).format(date);
  const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);
  const dateDDMMYY = `${day}-${month}-${year}`;

  function weeklyWeather(day) {
    let currentWeather;

    switch (true) {
      case props.weekly.days[`day_${day}`].description.includes("cloud"):
        currentWeather = weatherConditions["cloud"];
        break;
      case props.weekly.days[`day_${day}`].description.includes("rain"):
        currentWeather = weatherConditions["rain"];
        break;
      case props.weekly.days[`day_${day}`].description.includes("sky"):
        currentWeather = weatherConditions["sky"];
        break;
      case props.weekly.days[`day_${day}`].description.includes("snow"):
        currentWeather = weatherConditions["snow"];
        break;
      default:
        currentWeather = "";
    }

    return currentWeather;
  }

  const saveForecast = () => {
    dispatch({
      type: "SAVE_FORECAST",
      payload: {
        id: props.id,
      },
    });
  };

  const deleteForecast = () => {
    dispatch({
      type: "DELETE_FORECAST",
      payload: {
        id: props.id,
      },
    });
  };

  return (
    <div className={"forecast-wrapper"}>
      <div className="forecasts text-center title">
        <p className=" ">{props.daily.city}</p>
        <p className=" ">{dateDDMMYY}</p>
        {isDaily && (
          <div className="daily">
            <p className="  condition-temp">
              {props.daily.temp < 0 ? "-" : "+"}
              {Math.trunc(props.daily.temp)}&deg; {weeklyWeather(1)}
            </p>
            <p className="daily">
              Feels like: {props.daily.temp < 0 ? "-" : "+"}
              {Math.trunc(props.daily.feels_like)}&deg;
            </p>
            <div className="min-max">
              <p className="max">
                Max: {props.daily.temp < 0 ? "-" : "+"}
                {Math.trunc(props.daily.temp_max)}&deg;
              </p>
              <p className="min">
                Min: {props.daily.temp < 0 ? "-" : "+"}
                {Math.trunc(props.daily.temp_min)}&deg;
              </p>
            </div>
          </div>
        )}
        {!isDaily && (
          <div className="weekly">
            {Array.apply(null, Array(5)).map((x, i) => (
              <div className={`day ${i % 2 === 0 ? "" : "odd"}`} key={i}>
                <p>
                  {
                    weekDays[
                      new Date(props.weekly.days[`day_${i + 1}`].date).getDay()
                    ]
                  }
                </p>
                <p>{weeklyWeather(i + 1)}</p>
                <div className="min-max">
                  <p className="max">
                    {props.daily.temp < 0 ? "-" : "+"}
                    {Math.trunc(props.weekly.days[`day_${i + 1}`].temp_max)}
                    &deg;
                  </p>
                  <p className="min">
                    {props.daily.temp < 0 ? "-" : "+"}
                    {Math.trunc(props.weekly.days[`day_${i + 1}`].temp_min)}
                    &deg;
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="btn-group btn-group-toggle p-3" data-toggle="buttons">
        <label className="btn btn-primary  ">
          <input
            type="radio"
            name="options"
            id="option1"
            onClick={() => setIsDaily(!isDaily)}
          />
          {isDaily ? "See weekly" : "See daily"}
        </label>
        <label className="btn btn-primary">
          <input
            type="radio"
            name="options"
            id="option2"
            onClick={saveForecast}
          />{" "}
          Save
        </label>
        <label className="btn btn-danger">
          <input
            type="radio"
            name="options"
            id="option3"
            onClick={deleteForecast}
          />{" "}
          Delete
        </label>
      </div>
    </div>
  );
};

export default Forecast;
