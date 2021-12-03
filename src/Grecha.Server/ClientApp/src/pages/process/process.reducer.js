import * as cartsApi from "../../services/carts";

const initialState = {
  measurePhotos: {},
  sidePhotos: {},
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
        measurePhotos: {
          ...state.measurePhotos,
          [action.measureId]: {
            ...state.measurePhotos[action.measureId],
            [action.key]: action.data && URL.createObjectURL(action.data),
          },
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

export const loadCarts = () => async (dispatch) => dispatch({ type: SET_CARTS, data: await cartsApi.fetchCarts() });
export const loadCart = (id) => async (dispatch) => {
  dispatch({ type: SET_CART_DETAILS });
  id && dispatch({ type: SET_CART_DETAILS, data: await cartsApi.fetchCart(id) });
};

export const addMeasure = (data) => ({ type: ADD_MEASURE, data });
export const loadMeasurePhoto = (cartId, measureId) => async (dispatch, getState) => {
  if (getState().process.measurePhotos && getState().process.measurePhotos[measureId]) return;

  dispatch({
    type: SET_MEASURE_PHOTO,
    measureId,
    key: "up",
    data: await cartsApi.fetchMeasurePhoto(cartId, measureId),
  });

  dispatch({
    type: SET_MEASURE_PHOTO,
    measureId,
    key: "side",
    data: await cartsApi.fetchSidePhoto(cartId, measureId),
  });
};

export default processReducer;
