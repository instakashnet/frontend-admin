import * as types from './types'

export const createBankOrder = (values, getData, closeModal) => ({
  type: types.CREATE_BANK_ORDER_INIT,
  values,
  getData,
  closeModal
})

export const createBankOrderSuccess = () => ({
  type: types.CREATE_BANK_ORDER_SUCCESS
})

export const getBankOrderDetails = (id) => ({
  type: types.GET_BANK_ORDER_DETAILS_INIT,
  id
})

export const getBankOrderDetailsSuccess = (details) => ({
  type: types.GET_BANK_ORDER_DETAILS_SUCCESS,
  details
})

export const changeBankOrderStatus = (id, statusId, values, setModal) => ({
  type: types.CHANGE_BANK_ORDER_STATUS_INIT,
  id,
  statusId,
  values,
  setModal
})

export const changeBankOrderStatusSuccess = () => ({
  type: types.CHANGE_BANK_ORDER_STATUS_SUCCESS
})

export const apiError = () => ({
  type: types.API_ERROR
})
