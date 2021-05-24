import { useDispatch, useSelector } from "react-redux";
import AddForecast from "./AddForecast";
import Forecasts from "./Forecasts";
import Carousel from "react-bootstrap/Carousel";

const Weather = () => {
  const allForecasts = useSelector((state) => state.forecasts);
  const dispatch = useDispatch();

  return (
    <>
      <AddForecast />

      {allForecasts.length > 0 && (
        <Carousel interval={null}>
          {allForecasts
            .slice(0)
            .reverse()
            .map((forecast) => {
              if (forecast.error) {
                dispatch({
                  type: "SET_ERROR",
                  payload: { error: true, location: forecast.location },
                });
                return null;
              } else {
                return (
                  <Carousel.Item key={forecast.id}>
                    <Forecasts
                      key={forecast.id}
                      id={forecast.id}
                      location={forecast.location}
                      daily={forecast.daily}
                      weekly={forecast.weekly}
                    />
                  </Carousel.Item>
                );
              }
            })}
        </Carousel>
      )}
    </>
  );
};

export default Weather;
