import { v4 as uuid } from "uuid";

const initalState = [
  {
    id: 1,
  },
];

const forecastsReducer = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "CREATE_FORECAST":
      return [
        ...state,
        {
          id: uuid(),
          daily: payload.daily,
          weekly: payload.weekly,
        },
      ];
    case "DELETE_FORECAST":
      const copyState = [...state];
      const i = copyState.findIndex((x) => x.id === payload.id);
      copyState.splice(i, 1);
      return [...copyState];
    default:
      return state;
  }
};

export default forecastsReducer;
