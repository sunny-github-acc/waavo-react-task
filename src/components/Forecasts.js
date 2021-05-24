import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Forecast from "./Forecast";

const Forecasts = ({ id, location, daily, weekly }) => {
  const [isDaily, setIsDaily] = useState(true);
  const dispatch = useDispatch();

  const date = new Date(daily[0].date);
  const month = new Intl.DateTimeFormat("en", { month: "short" }).format(date);
  const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);
  const lastDay = day[day.length - 1];
  const suffixes = ["th", "st", "nd", "rd"];
  const suffix = lastDay > 3 ? "th" : suffixes[lastDay];
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weekDay = weekDays[new Date(date).getDay()];
  const currentDate = `${weekDay}, ${month} ${day}${suffix}`;

  const saveForecast = () => {
    dispatch({
      type: "SAVE_FORECAST",
      payload: id,
    });
  };

  const refreshForecast = () => {
    dispatch({
      type: "SET_PENDING",
      payload: true,
    });

    dispatch({
      type: "UPDATE_FORECAST",
    });

    dispatch({
      type: "REFRESH_FORECAST",
      payload: { id, location: location.city },
    });
  };

  const deleteForecast = () => {
    dispatch({
      type: "DELETE_FORECAST",
      payload: id,
    });
  };

  return (
    <>
      <section className="flex flex-column pt-3 main">
        <div className="mr-2">
          <h2 className="my-0 font-weight-normal mb-2">
            {location.city}, {location.country}
          </h2>
          <h5 className="font-weight-light mb-1">{currentDate}</h5>
          <p className="font-weight-light mb-0">
            {new Date().toLocaleTimeString()}
          </p>
        </div>
        <div className="ml-2">
          <p className="display-1 temperature">
            {daily[0].temp < 0 ? "-" : "+"}
            {Math.trunc(daily[0].temp)}&deg;
          </p>
          <p className="mb-0">
            Feels like: {daily[0].temp < 0 ? "-" : "+"}
            {Math.trunc(daily[0].feels_like)}&deg;
          </p>
          <p>
            {daily[0].description[0].toUpperCase() +
              daily[0].description.substring(1)}
          </p>
        </div>
      </section>
      <section>
        <h3>
          <button
            className="disable-btn-style my-4"
            onClick={() => setIsDaily(!isDaily)}
          >
            <span
              className={`${
                isDaily ? "font-weight-bold border-bottom" : null
              } px-4`}
            >
              Hours
            </span>
            <span
              className={`${
                !isDaily ? "font-weight-bold border-bottom" : null
              } px-4`}
            >
              Days
            </span>
          </button>
        </h3>
        {isDaily && (
          <div className="flex flex-wrap">
            {Object.values(daily).map((hour, i) => {
              return (
                <div key={hour.date + 0} className={i % 2 === 0 ? "" : "odd"}>
                  <Forecast
                    key={hour.date + 1}
                    date={hour.date}
                    temp={hour.temp}
                    temp_min={hour.temp_min}
                    temp_max={hour.temp_max}
                    description={hour.description}
                    daily={true}
                  />
                </div>
              );
            })}
          </div>
        )}
        {!isDaily && (
          <div className="flex flex-wrap">
            {Object.values(weekly).map((day, i) => {
              return (
                <div key={day.date + 0} className={i % 2 === 0 ? "" : "odd"}>
                  <Forecast
                    key={day.date + 1}
                    date={day.date}
                    temp={day.temp}
                    temp_min={day.temp_min}
                    temp_max={day.temp_max}
                    description={day.description}
                    daily={false}
                  />
                </div>
              );
            })}
          </div>
        )}
        <div
          className="btn-group btn-group-toggle p-3 mb-4"
          data-toggle="buttons"
        >
          <label className="btn btn-primary">
            <input
              type="radio"
              name="options"
              id="option1"
              onClick={saveForecast}
            />
            Save
          </label>
          <label className="btn btn-primary">
            <input
              type="radio"
              name="options"
              id="option2"
              onClick={refreshForecast}
            />
            Refresh
          </label>
          <label className="btn btn-secondary">
            <input
              type="radio"
              name="options"
              id="option3"
              onClick={deleteForecast}
            />
            Close
          </label>
        </div>
      </section>
    </>
  );
};

export default Forecasts;
