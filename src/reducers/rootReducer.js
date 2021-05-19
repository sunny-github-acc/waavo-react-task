import { combineReducers } from "redux";
import forecastsReducer from "./forecastsReducer";

const rootReducer = combineReducers({
  forecasts: forecastsReducer,
});

export default rootReducer;
