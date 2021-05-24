import { combineReducers } from "redux";
import forecastsReducer from "./forecastsReducer";
import stateReducer from "./stateReducer";

const rootReducer = combineReducers({
  forecasts: forecastsReducer,
  state: stateReducer,
});

export default rootReducer;
