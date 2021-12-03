import * as dataApi from "../../services/carts";

const initialState = {
  photos: {},
};

const SET_CARTS = "process/SET_CARTS";
const ADD_MEASURE = "process/ADD_MEASURE";
const UPDATE_LINE_PHOTO = "process/UPDATE_LINE_PHOTO";

const implementMeasure = (measure, cart = {}) => ({
  ...cart,
  id: measure.cartId,
  line: measure.lineNumber,
  number: measure.cartNumber,
  quality: measure.quality,
  qualityLevel: measure.qualityLevel,
  weight: measure.weight,
  measures: [...(cart.measures || []), measure.measureId],
  supplier: {
    ...cart.supplier,
    name: measure.supplierName,
  },
});

const processReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CARTS:
      return {
        ...state,
        carts: action.data,
      };

    case ADD_MEASURE: {
      const index = (state.carts || []).findIndex((cart) => cart.number === action.data.cartNumber);

      return {
        ...state,
        carts:
          index === -1
            ? [...(state.carts || []), implementMeasure(action.data)]
            : [
                ...state.carts.slice(0, index),
                implementMeasure(action.data, state.carts[index]),
                ...state.carts.slice(index + 1),
              ],
      };
    }

    case UPDATE_LINE_PHOTO: {
      return {
        ...state,
        photos: {
          ...state.photos,
          [action.lineNumber]: action.data && URL.createObjectURL(action.data),
        },
      };
    }

    default:
      return state;
  }
};

export const loadCarts = () => async (dispatch) => dispatch({ type: SET_CARTS, data: await dataApi.fetchData() });
export const addMeasure = (data) => ({ type: ADD_MEASURE, data });
export const loadPhoto = (lineNumber, cartId, measureId) => async (dispatch) =>
  dispatch({ type: UPDATE_LINE_PHOTO, lineNumber, data: await dataApi.fetchPhoto(cartId, measureId) });

export default processReducer;
