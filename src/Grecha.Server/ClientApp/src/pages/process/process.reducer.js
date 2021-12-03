import * as dataApi from "../../services/carts";

const initialState = {};

const SET_DATA = "carts/SET_DATA";

const processReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        data: action.data,
      };

    default:
      return state;
  }
};

export const loadData = () => async (dispatch) => dispatch({ type: SET_DATA, data: await dataApi.fetchData() });

export default processReducer;
