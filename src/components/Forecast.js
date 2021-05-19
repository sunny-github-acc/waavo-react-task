import React, { useState } from "react";
import { useDispatch } from "react-redux";

const Forecast = (props) => {
  const [isDaily, setIsDaily] = useState(true);
  const dispatch = useDispatch();
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weatherConditions = {
    rain: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        fill="currentColor"
        className="bi bi-cloud-drizzle"
        viewBox="0 0 16 16"
      >
        <path d="M4.158 12.025a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm6 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm-3.5 1.5a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm6 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm.747-8.498a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 11H13a3 3 0 0 0 .405-5.973zM8.5 2a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1 0 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4.002 4.002 0 0 1 8.5 2z" />
      </svg>
    ),
    cloud: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        fill="currentColor"
        className="bi bi-cloud"
        viewBox="0 0 16 16"
      >
        <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
      </svg>
    ),
    sky: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        fill="currentColor"
        className="bi bi-brightness-high"
        viewBox="0 0 16 16"
      >
        <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
      </svg>
    ),
    snow: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        fill="currentColor"
        className="bi bi-cloud-snow"
        viewBox="0 0 16 16"
      >
        <path d="M13.405 4.277a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 10.25H13a3 3 0 0 0 .405-5.973zM8.5 1.25a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1-.001 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4.002 4.002 0 0 1 8.5 1.25zM2.625 11.5a.25.25 0 0 1 .25.25v.57l.501-.287a.25.25 0 0 1 .248.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25zm2.75 2a.25.25 0 0 1 .25.25v.57l.501-.287a.25.25 0 0 1 .248.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25zm5.5 0a.25.25 0 0 1 .25.25v.57l.501-.287a.25.25 0 0 1 .248.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25zm-2.75-2a.25.25 0 0 1 .25.25v.57l.501-.287a.25.25 0 0 1 .248.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25zm5.5 0a.25.25 0 0 1 .25.25v.57l.501-.287a.25.25 0 0 1 .248.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25z" />
      </svg>
    ),
  };
  let currentWeatherConditions;

  switch (true) {
    case props.weekly.days.day_1.description.includes("cloud"):
      currentWeatherConditions = weatherConditions["cloud"];
      break;
    case props.weekly.days.day_1.description.includes("rain"):
      currentWeatherConditions = weatherConditions["rain"];
      break;
    case props.weekly.days.day_1.description.includes("sky"):
      currentWeatherConditions = weatherConditions["sky"];
      break;
    case props.weekly.days.day_1.description.includes("snow"):
      currentWeatherConditions = weatherConditions["snow"];
      break;
    default:
      currentWeatherConditions = "";
  }

  const deleteForecast = () => {
    dispatch({
      type: "DELETE_FORECAST",
      payload: {
        id: props.id,
      },
    });
  };

  return (
    <div className={"forecast-wrapper   my-5"}>
      <div className="forecasts text-center title">
        <p className=" ">{props.daily.city}</p>
        {isDaily && (
          <div className="daily">
            <p className="  condition-temp">
              Temperature: {props.daily.temp < 0 ? "-" : "+"}
              {Math.trunc(props.daily.temp)}
            </p>
            <p className="daily">
              Feels like: {props.daily.temp < 0 ? "-" : "+"}
              {Math.trunc(props.daily.feels_like)}
            </p>
            <p className="low">
              Min temperature: {props.daily.temp < 0 ? "-" : "+"}
              {Math.trunc(props.daily.temp_min)}
            </p>
            <p className="high">
              Max temperature: {props.daily.temp < 0 ? "-" : "+"}
              {Math.trunc(props.daily.temp_max)}
            </p>
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
                <p>{currentWeatherConditions}</p>
                <div className="min-max">
                  <p>
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
      <button className=" btn btn-primary" onClick={() => setIsDaily(!isDaily)}>
        {isDaily ? "See weekly" : "See daily"}
      </button>
      <button className=" btn btn-primary" onClick={deleteForecast}>
        Delete
      </button>
    </div>
  );
};

export default Forecast;
