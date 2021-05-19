import React from "react";
import { useDispatch } from "react-redux";

const Forecast = (props) => {
  const dispatch = useDispatch();

  const deleteForecast = () => {
    dispatch({
      type: "DELETE_FORECAST",
      payload: {
        id: props.id,
      },
    });
  };
  return (
    <div className={"forecast-wrapper container my-5"}>
      <div className="forecasts text-center title">
        <p className="card rounded my-3 shadow-lg d-none back-card my-3">
          {props.daily.city}
        </p>
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
        <div className="weekly"></div>
      </div>
      <button onClick={deleteForecast}>Delete</button>
    </div>
  );
};

export default Forecast;
