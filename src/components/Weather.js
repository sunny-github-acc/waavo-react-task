import Forecast from "./Forecast";
import { useSelector } from "react-redux";
import AddForecast from "./AddForecast";

const Forecasts = () => {
  const allForecasts = useSelector((state) => state.forecasts);

  return (
    <>
      <h2 className="mt-4">Forecasts</h2>{" "}
      <AddForecast pending={allForecasts[0].pending} />
      {allForecasts
        .slice(0)
        .reverse()
        .map((forecast) => {
          if (forecast.id !== 1)
            return (
              <Forecast
                key={forecast.id}
                id={forecast.id}
                location={forecast.location}
                daily={forecast.daily}
                weekly={forecast.weekly}
                saved={forecast.saved}
                error={forecast.error}
              />
            );
          return null;
        })}
    </>
  );
};

export default Forecasts;
