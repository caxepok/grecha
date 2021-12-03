import * as dataApi from "../../services/carts";

const initialState = {
  measuresPhoto: {},
};

const SET_CARTS = "process/SET_CARTS";
const ADD_MEASURE = "process/ADD_MEASURE";
const SET_MEASURE_PHOTO = "process/SET_MEASURE_PHOTO";
const SET_CART_DETAILS = "process/SET_CART_DETAILS";

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

    case SET_MEASURE_PHOTO: {
      return {
        ...state,
        measuresPhoto: {
          ...state.measuresPhoto,
          [action.measureId]: action.data && URL.createObjectURL(action.data),
        },
      };
    }

    case SET_CART_DETAILS:
      return {
        ...state,
        details: action.data,
      };

    default:
      return state;
  }
};

export const loadCarts = () => async (dispatch) => dispatch({ type: SET_CARTS, data: await dataApi.fetchCarts() });
export const loadCart = (id) => async (dispatch) => {
  dispatch({ type: SET_CART_DETAILS });
  id && dispatch({ type: SET_CART_DETAILS, data: await dataApi.fetchCart(id) });
};

export const addMeasure = (data) => ({ type: ADD_MEASURE, data });
export const loadPhoto = (cartId, measureId) => async (dispatch) =>
  dispatch({ type: SET_MEASURE_PHOTO, measureId, data: await dataApi.fetchPhoto(cartId, measureId) });

export default processReducer;
