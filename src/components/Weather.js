import { useEffect, useState } from "react";
import Forecast from "./Forecast";
import { useSelector } from "react-redux";
import AddForecast from "./AddForecast";

const Forecasts = () => {
  const allForecasts = useSelector((state) => state.forecasts);

  return (
    <div className={""}>
      <h2>Forecasts</h2> <AddForecast />
      {allForecasts.map((forecast) => {
        if (forecast.id !== 1)
          return (
            <Forecast
              key={forecast.id}
              id={forecast.id}
              daily={forecast.daily}
              weekly={forecast.weekly}
            />
          );
        return null;
      })}
    </div>
  );
};

export default Forecasts;

// const Weather = () => {
//   //   useEffect(() => {
//   //     const getMovies = async (input) => {
//   //       let data = await fetch(input);
//   //       console.log("data: ", data);
//   //     };
//   //     const fetch = async (input) => {
//   //       try {
//   //         const result = await fetch(
//   //           "api.openweathermap.org/data/2.5/weather?q=vilnius&appid=fe9a370dc20ad36fad8f9a1d94ae25c9"
//   //         );
//   //         const data = await result.json();
//   //         console.log("data: ", data);

//   //         return console.log(data.results);
//   //       } catch (error) {
//   //         return console.log(error);
//   //       }
//   //     };
//   //     getMovies(":)");
//   //   }, []);

//   const [error1, setError] = useState(null);
//   const [position1, setPosition] = useState();
//   const [weather, setWeather] = useState([]);

//   useEffect(() => {
//     const URL =
//       "http://api.openweathermap.org/data/2.5/weather?q=vilnius&units=metric&appid=fe9a370dc20ad36fad8f9a1d94ae25c9";

//     const fetchData = async () => {
//       const result = await fetch(URL)
//         .then((res) => res.json())
//         .then((data) => console.log(data));
//       console.log(result);
//     };
//     fetchData();
//   }, []);

//   return (
//     <header className="header">
//       {/* <button onClick={() => fetch()}>:)</button> */}
//     </header>
//   );
// };
