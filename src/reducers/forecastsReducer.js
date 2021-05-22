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

    case "SET_PENDING":
      const pendingState = [...state];
      pendingState[0].pending = payload;

      return pendingState;

    case "CREATE_FORECAST":
      if (!payload) return state;

      if (payload.error)
        return [
          ...state.filter((s) => s.saved === true),
          {
            id: uuid(),
            error: true,
            saved: false,
          },
        ];

      return [
        ...state.filter((s) => s.saved === true),
        {
          id: uuid(),
          daily: payload.daily,
          weekly: payload.weekly,
          saved: payload.daily.saved,
        },
      ];

    case "SAVE_FORECAST":
      const savedStateCopy = [...state];

      savedStateCopy.map((i, index) => {
        if (i.id === payload.id) {
          return (savedStateCopy[index].saved = true);
        }
        return i;
      });

      return [...savedStateCopy];

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
