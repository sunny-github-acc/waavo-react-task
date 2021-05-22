import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { weatherConditions } from "./icons/weatherConditions";

const Forecast = (props) => {
  const [isDaily, setIsDaily] = useState(true);
  const dispatch = useDispatch();

  if (!props.daily)
    return (
      <h5 className="forecast-wrapper font-weight-normal my-1">
        We could not find such location
      </h5>
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
    <>
      <div className="flex">
        <div className="text-left mr-2">
          <h2 className="my-0">{props.daily.city}</h2>
          <h5 className="font-weight-normal">{dateDDMMYY}</h5>
          <p className="my-2">{weeklyWeather(1)}</p>
          <p className="my-2">
            {props.daily.clouds[0].toUpperCase() +
              props.daily.clouds.substring(1)}
          </p>
        </div>
        {isDaily && (
          <div className="ml-2">
            <p className="display-1 text-right temperature">
              {props.daily.temp < 0 ? "-" : "+"}
              {Math.trunc(props.daily.temp)}&deg;
            </p>
            {/* <p className="daily">
                Feels like: {props.daily.temp < 0 ? "-" : "+"}
                {Math.trunc(props.daily.feels_like)}&deg;
              </p> */}
            <div className="flex flex-right">
              <h5 className="font-weight-bold">
                {props.daily.temp < 0 ? "-" : "+"}
                {Math.trunc(props.daily.temp_max)}&deg; /
              </h5>
              <h5 className=" ">
                {props.daily.temp < 0 ? "-" : "+"}
                {Math.trunc(props.daily.temp_min)}&deg;
              </h5>
            </div>
          </div>
        )}
      </div>
      {isDaily && (
        <div className="flex">
          {Array.apply(null, Array(5)).map((x, i) => (
            <div className={i % 2 === 0 ? "" : "odd"} key={i}>
              <p>
                {
                  weekDays[
                    new Date(props.weekly.days[`day_${i + 1}`].date).getDay()
                  ]
                }
              </p>
              <p>{weeklyWeather(i + 1)}</p>
              <div className="flex">
                <p className="font-weight-bold">
                  {props.daily.temp < 0 ? "-" : "+"}
                  {Math.trunc(props.weekly.days[`day_${i + 1}`].temp_max)}
                  &deg;
                </p>
                <p className=" ">
                  {props.daily.temp < 0 ? "-" : "+"}
                  {Math.trunc(props.weekly.days[`day_${i + 1}`].temp_min)}
                  &deg;
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
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
      {/* <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
        <li className="nav-item">
          <a
            className="nav-link active"
            id="pills-home-tab"
            data-toggle="pill"
            href="#pills-home"
            role="tab"
            aria-controls="pills-home"
            aria-selected="true"
          >
            Home
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="pills-profile-tab"
            data-toggle="pill"
            href="#pills-profile"
            role="tab"
            aria-controls="pills-profile"
            aria-selected="false"
          >
            Profile
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="pills-contact-tab"
            data-toggle="pill"
            href="#pills-contact"
            role="tab"
            aria-controls="pills-contact"
            aria-selected="false"
          >
            Contact
          </a>
        </li>
      </ul>
      <div className="tab-content" id="pills-tabContent">
        <div
          className="tab-pane fade show active"
          id="pills-home"
          role="tabpanel"
          aria-labelledby="pills-home-tab"
        >
          abs
        </div>
        <div
          className="tab-pane fade"
          id="pills-profile"
          role="tabpanel"
          aria-labelledby="pills-profile-tab"
        >
          123
        </div>
        <div
          className="tab-pane fade"
          id="pills-contact"
          role="tabpanel"
          aria-labelledby="pills-contact-tab"
        >
          zxc
        </div>
      </div> */}
    </>
  );
};

export default Forecast;
