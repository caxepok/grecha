const initialState = {
  steel: {
    high: 98,
    medium: 94,
    low: 90,
  },
  aluminium: {
    high: 98,
    medium: 94,
    low: 90,
  },
  copper: {
    high: 98,
    medium: 94,
    low: 90,
  },
  iron: {
    high: 98,
    medium: 94,
    low: 90,
  },
};

const SET_PARAMS = "settings/SET_PARAMS";

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PARAMS:
      return { ...action.data };

    default:
      return state;
  }
};

export const saveParams = (data) => ({ type: SET_PARAMS, data });

export default settingsReducer;
