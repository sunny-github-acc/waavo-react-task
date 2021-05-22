import { getWeather } from "./getWeather";

const Forecasts = ({ date, temp, temp_min, temp_max, description, daily }) => {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="flex flex-column">
      <p>{weekDays[new Date(date).getDay()]}</p>
      {daily && <p>{new Date(date).getHours()}:00</p>}
      <p>{getWeather(description)}</p>
      <div className="flex">
        <p className="font-weight-bold">
          {temp < 0 ? "-" : "+"}
          {Math.trunc(temp_max)}
          &deg;
        </p>
        <p className=" ">
          {temp < 0 ? "-" : "+"}
          {Math.trunc(temp_min)}
          &deg;
        </p>
      </div>
    </div>
  );
};

export default Forecasts;
