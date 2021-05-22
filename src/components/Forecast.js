import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Forecasts from "./Forecasts";
import { getWeather } from "./getWeather";

const Forecast = ({ location, id, daily, weekly, error }) => {
  const [isDaily, setIsDaily] = useState(true);
  const dispatch = useDispatch();

  if (error)
    return (
      <h5 className="forecast-wrapper font-weight-normal mb-3 alert alert-warning">
        We could not find such location
      </h5>
    );

  const date = new Date(daily[0].date);
  const year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
  const month = new Intl.DateTimeFormat("en", { month: "short" }).format(date);
  const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);
  const dateDDMMYY = `${day}-${month}-${year}`;

  const saveForecast = () => {
    dispatch({
      type: "SAVE_FORECAST",
      payload: id,
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
      <div className="flex flex-align-top hero">
        <div className="text-left mr-2">
          <h2 className="my-0">
            {location.city}, {location.country}
          </h2>
          <h5 className="font-weight-normal">{dateDDMMYY}</h5>
          <p className="my-2">{getWeather(daily[0].description)}</p>
          <p className="my-2">
            {daily[0].description[0].toUpperCase() +
              daily[0].description.substring(1)}
          </p>
        </div>
        <div className="ml-2">
          <p className="display-1 text-right temperature">
            {daily[0].temp < 0 ? "-" : "+"}
            {Math.trunc(daily[0].temp)}&deg;
          </p>
          <p className="text-right">
            Feels like: {daily[0].temp < 0 ? "-" : "+"}
            {Math.trunc(daily[0].feels_like)}&deg;
          </p>
          <div className="flex flex-right">
            <h5 className="font-weight-bold">
              {daily[0].temp < 0 ? "-" : "+"}
              {Math.trunc(daily[0].temp_max)}&deg; /
            </h5>
            <h5 className=" ">
              {daily[0].temp < 0 ? "-" : "+"}
              {Math.trunc(daily[0].temp_min)}&deg;
            </h5>
          </div>
        </div>
      </div>
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
        <div className="flex">
          {Object.values(daily).map((hour, i) => {
            return (
              <div key={hour.date + 0} className={i % 2 === 0 ? "" : "odd"}>
                <Forecasts
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
        <div className="flex">
          {Object.values(weekly).map((day, i) => {
            return (
              <div key={day.date + 0} className={i % 2 === 0 ? "" : "odd"}>
                <Forecasts
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
      <div className="btn-group btn-group-toggle p-3" data-toggle="buttons">
        <label className="btn btn-primary">
          <input
            type="radio"
            name="options"
            id="option2"
            onClick={saveForecast}
          />{" "}
          Save
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
    </>
  );
};

export default Forecast;
