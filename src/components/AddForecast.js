import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { search } from "./icons/search";
import { weatherConditions } from "./icons/weatherConditions";

const AddForecast = ({ pending }) => {
  const dispatch = useDispatch();
  const [city, setCity] = useState("");
  const [noCity, setNoCity] = useState(false);

  const handleChange = (e) => {
    setNoCity(false);

    dispatch({
      type: "CLEAR_ERROR",
    });

    setCity(e.target.value);
  };

  const addForecast = (e) => {
    e.preventDefault();

    if (!city) return setNoCity(true);

    dispatch({
      type: "SET_PENDING",
      payload: true,
    });

    dispatch({
      type: "REQUEST_DATA",
      payload: city,
    });
  };

  return (
    <nav className="position-fixed" style={{ zIndex: 1 }}>
      <form onSubmit={addForecast} className="py-2 shadow-sm">
        <div className="flex mx-4">
          <span className={`mr-3 ${pending ? "spin" : ""}`}>
            {weatherConditions.sky}
          </span>
          <input
            onChange={(e) => handleChange(e)}
            name="city"
            placeholder={"Location.."}
            className="form-control rounded-element p-4 shadow-sm input"
          />
          <button
            type="submit"
            className="form-control rounded-element p-4 shadow-sm submit"
            name="city"
            disabled={pending}
          >
            {search}
          </button>
        </div>
      </form>
      {noCity && (
        <h5 className="mb-4   alert-info font-weight-normal" key="no-city">
          Please enter a location
        </h5>
      )}
    </nav>
  );
};

export default AddForecast;
