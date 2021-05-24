const initalState = {
  pending: false,
  error: false,
  location: "",
};

const stateReducer = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_PENDING":
      const pendingState = state;
      pendingState.pending = payload;
      return pendingState;

    case "SET_ERROR":
      const errorState = state;
      errorState.error = payload.error;
      errorState.location = payload.location;
      return errorState;

    default:
      return state;
  }
};

export default stateReducer;
