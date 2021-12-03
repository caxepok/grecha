import * as suppliersApi from "../../services/suppliers";

const initialState = {};

const SET_SUPPLIERS = "analytics/SET_SUPPLIERS";
const SET_SUPPLIER_DETAILS = "analytics/SET_SUPPLIER_DETAILS";

const analyticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SUPPLIERS:
      return {
        ...state,
        suppliers: action.data,
      };

    case SET_SUPPLIER_DETAILS:
      return {
        ...state,
        details: action.data,
      };

    default:
      return state;
  }
};

export const loadSuppliers = () => async (dispatch) =>
  dispatch({ type: SET_SUPPLIERS, data: await suppliersApi.fetchSuppliers() });

export const loadSupplier = (id) => async (dispatch) => {
  dispatch({ type: SET_SUPPLIER_DETAILS });
  dispatch({ type: SET_SUPPLIER_DETAILS, data: await suppliersApi.fetchSupplier(id) });
};

export default analyticsReducer;
