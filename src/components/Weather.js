import { useSelector } from "react-redux";
import AddForecast from "./AddForecast";
import Forecasts from "./Forecasts";
import Carousel from "react-bootstrap/Carousel";

const Weather = () => {
  const allForecasts = useSelector((state) => state.forecasts);

  return (
    <>
      <AddForecast pending={allForecasts[0].pending} />

      {allForecasts.length > 1 && (
        <Carousel interval={null}>
          {allForecasts
            .slice(0)
            .reverse()
            .map((forecast) => {
              if (forecast.id !== 1)
                return (
                  <Carousel.Item key={forecast.id}>
                    <Forecasts
                      key={forecast.id}
                      id={forecast.id}
                      location={forecast.location}
                      daily={forecast.daily}
                      weekly={forecast.weekly}
                      error={forecast.error}
                    />
                  </Carousel.Item>
                );
              return null;
            })}
        </Carousel>
      )}
    </>
  );
};

export default Weather;
