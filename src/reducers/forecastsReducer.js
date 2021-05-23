import { v4 as uuid } from "uuid";

const initalState = [
  {
    id: 1,
    saved: true,
    pending: false,
  },
];

const forecastsReducer = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "REQUEST_DATA":
      return state;

    case "CREATE_FORECAST":
      if (payload.error) {
        return [
          ...state.filter((s) => s.saved === true),
          {
            id: uuid(),
            error: true,
            location: payload.location,
          },
        ];
      } else {
        return [
          ...state.filter((s) => s.saved === true),
          {
            id: uuid(),
            location: payload.location,
            daily: payload.daily,
            weekly: payload.weekly,
            saved: false,
          },
        ];
      }

    case "SAVE_FORECAST":
      const savedState = [...state];
      savedState.map((state, index) => {
        if (state.id === payload) {
          return (savedState[index].saved = true);
        }
        return state;
      });
      return [...savedState];

    case "REFRESH_FORECAST_ASYNC":
      const refreshedState = [...state];
      refreshedState.map((state, index) => {
        if (state.id === payload.id) {
          refreshedState[index].daily = payload.results.daily;
          refreshedState[index].weekly = payload.results.weekly;
        }
        return state;
      });
      return [...refreshedState];

    case "DELETE_FORECAST":
      const copyState = [...state];
      const id = copyState.findIndex((x) => x.id === payload);
      copyState.splice(id, 1);
      return [...copyState];

    case "SET_PENDING":
      const pendingState = [...state];
      pendingState[0].pending = payload;
      return pendingState;

    case "CLEAR_ERROR":
      return [...state.filter((s) => s.saved === true)];

    default:
      return state;
  }
};

export default forecastsReducer;
