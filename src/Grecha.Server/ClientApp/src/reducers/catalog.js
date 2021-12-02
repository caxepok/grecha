import * as dataApi from "../services/catalog";

const initialState = {};

const SET_DATA = "catalog/SET_DATA";

const catalogReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        data: action.data,
      };

    default:
      return state
  }
};

export const loadData = () => async (dispatch) => dispatch({ type: SET_DATA, data: await dataApi.fetchData() });

export default catalogReducer;
