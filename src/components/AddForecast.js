import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { search } from "./icons/search";

const AddForecast = () => {
  const dispatch = useDispatch();
  const [city, setCity] = useState("");
  const [noCity, setNoCity] = useState(false);

  const handleChange = (e) => {
    setNoCity(false);
    setCity(e.target.value);
  };

  const addForecast = (e) => {
    e.preventDefault();
    if (!city) return setNoCity(true);

    dispatch({
      type: "REQUEST_DATA",
      payload: city,
    });
  };

  return (
    <div className={"title"}>
      <form onSubmit={addForecast}>
        <div className="input-container">
          <input
            onChange={(e) => handleChange(e)}
            name="city"
            placeholder={"Location.."}
            className="form-control form-rounded p-4 shadow-sm input"
          />
          <button
            type="submit"
            className="btn btn-primary form-control form-rounded p-4 shadow-sm search"
            name="city"
          >
            {search}
          </button>
        </div>
        {noCity && <div>Please enter a location</div>}
      </form>
    </div>
  );
};

export default AddForecast;
