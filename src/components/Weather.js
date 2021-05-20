import Forecast from "./Forecast";
import { useSelector } from "react-redux";
import AddForecast from "./AddForecast";

const Forecasts = () => {
  const allForecasts = useSelector((state) => state.forecasts);

  return (
    <div>
      <h2 className="main-title p-2">Forecasts</h2> <AddForecast />
      {allForecasts
        .slice(0)
        .reverse()
        .map((forecast) => {
          if (forecast.id !== 1)
            return (
              <Forecast
                key={forecast.id}
                id={forecast.id}
                daily={forecast.daily}
                weekly={forecast.weekly}
                saved={forecast.saved}
              />
            );
          return null;
        })}
    </div>
  );
};

export default Forecasts;
