import * as actionTypes from "./actionTypes";
import { EDIT_INTERPLAZA_INIT, EDIT_INTERPLAZA_SUCCESS } from "../../settings/clients/actionTypes";

const initialState = {
  allOrders: [],
  details: {},
  isLoading: true,
  isProcessing: false,
};

export default function currencyExchangeReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.VALIDATE_EXCHANGE:
    case actionTypes.APPROVE_EXCHANGE:
    case actionTypes.DECLINE_EXCHANGE:
    case actionTypes.EDIT_EXCHANGE:
    case actionTypes.CREATE_INVOICE:
    case EDIT_INTERPLAZA_INIT:
    case actionTypes.SET_REVISION_INIT:
    case actionTypes.REASSIGN_ORDER_INIT:
    case actionTypes.GET_EXCHANGES_RELATION_INIT:
    case actionTypes.CHANGE_ORDER_STATUS_INIT:
    case actionTypes.UPLOAD_CONCILIATION.INIT:
    case actionTypes.DOWNLOAD_CONCILIATION.INIT:
      return { ...state, isProcessing: true };

    case actionTypes.VALIDATE_EXCHANGE_SUCCESS:
    case actionTypes.APPROVE_EXCHANGE_SUCCESS:
    case actionTypes.DECLINE_EXCHANGE_SUCCESS:
    case actionTypes.EDIT_EXCHANGE_SUCCESS:
    case EDIT_INTERPLAZA_SUCCESS:
    case actionTypes.SET_REVISION_SUCCESS:
    case actionTypes.REASSIGN_ORDER_SUCCESS:
    case actionTypes.GET_EXCHANGES_RELATION_SUCCESS:
    case actionTypes.CHANGE_ORDER_STATUS_SUCCESS:
    case actionTypes.UPLOAD_CONCILIATION.SUCCESS:
    case actionTypes.DOWNLOAD_CONCILIATION.SUCCESS:
      return { ...state, isProcessing: false };

    case actionTypes.GET_EXCHANGE_DETAILS:
      return { ...state, isLoading: true, details: {} };

    case actionTypes.GET_EXCHANGE_DETAILS_SUCCESS:
      return { ...state, details: payload.details, isLoading: false };

    case actionTypes.CREATE_INVOICE_SUCCESS:
      return { ...state, isProcessing: false };

    case actionTypes.API_ERROR:
      return { ...state, isLoading: false, isProcessing: false };

    default:
      return state;
  }
}
