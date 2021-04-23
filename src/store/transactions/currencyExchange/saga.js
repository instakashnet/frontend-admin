import { all, call, takeEvery, put, fork, delay } from 'redux-saga/effects';
import * as actions from './actions';
import * as actionTypes from './actionTypes';
import Swal from 'sweetalert2';
import { exchangeInstance } from '../../../helpers/AuthType/axios';
import { getClientExchanges } from '../../settings/clients/actions';

function* getExchangeDetails({ id }) {
  try {
    const res = yield exchangeInstance.get(`/order/admin/${id}`);
    if (res.status === 200) {
      yield put(actions.getExchangeDetailsSuccess(res.data));
      yield put(getClientExchanges(res.data.userId));
    }
  } catch (error) {
    yield put(actions.apiError(error.message));
    yield delay(4000);
    yield put(actions.clearAlert());
  }
}

function* editExchange({ id, values, setState }) {
  try {
    const res = yield exchangeInstance.put(`/order/admin/${id}`, values);
    if (res.status === 200) {
      yield put(actions.editExchangeSuccess());
      yield call(getExchangeDetails, { id });
      yield call(setState, false);
      yield Swal.fire('Operación editada', 'Los datos de la operación han sido editados.', 'success');
    }
  } catch (error) {
    yield put(actions.apiError('Ha ocurrido un error editando la transacción, Por favor contacte a soporte.'));
    yield delay(4000);
    yield put(actions.clearAlert());
  }
}

function* validateExchange({ orderId, history }) {
  try {
    const result = yield Swal.fire({
      title: `¿Deseas validar esta operación?`,
      text: 'Al continuar no podrás revertir este estado.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Si, continuar`,
      cancelButtonText: 'No, cancelar',
      cancelButtonColor: '#f46a6a',
    });

    if (result.isConfirmed) {
      const res = yield exchangeInstance.put(`/order/admin/status/${orderId}`, { status: 4 });
      if (res.status === 201) {
        yield call(getExchangeDetails, { id: orderId });
        yield put(actions.approveExchangeSuccess());
        yield Swal.fire('Exitoso', `La operación fue validada correctamente.`, 'success');
      }
    } else yield put(actions.apiError());
  } catch (error) {
    yield put(actions.apiError('Ha ocurrido un error validando la operación. Por favor contacta a soporte.'));
    yield delay(4000);
    yield put(actions.clearAlert());
  }
}

function* approveExchange({ orderId, closeModal }) {
  try {
    const res = yield exchangeInstance.put(`/order/admin/status/${orderId}`, { status: 6 });
    if (res.status === 201) {
      yield put(actions.approveExchangeSuccess());
      yield call(getExchangeDetails, { id: orderId });
      yield call(closeModal);
      yield Swal.fire('Exitoso', `La operación fue aprobada correctamente.`, 'success');
    }
  } catch (error) {
    throw error;
  }
}

function* declineExchange({ orderId }) {
  try {
    const result = yield Swal.fire({
      title: `¿Deseas cancelar esta operación?`,
      text: 'Al continuar no podrás revertir este estado.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Si, continuar.`,
      cancelButtonText: 'No, cancelar.',
      cancelButtonColor: '#f46a6a',
    });

    if (result.isConfirmed) {
      const res = yield exchangeInstance.put(`/order/admin/status/${orderId}`, { status: 5 });
      if (res.status === 201) {
        yield call(getExchangeDetails, { id: orderId });
        yield put(actions.declineExchangeSuccess());
      }
    } else put(actions.apiError());
  } catch (error) {
    yield put(actions.apiError(error.message));
    yield delay(4000);
    yield put(actions.clearAlert());
  }
}

function* uploadVoucher({ orderId, values, closeModal }) {
  const formData = new FormData();
  formData.append('file', values.file);

  try {
    const result = yield Swal.fire({
      title: `¿Deseas aprobar esta operación?`,
      text: 'Al continuar no podrás revertir este estado.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Si, continuar`,
      cancelButtonText: 'No, cancelar',
      cancelButtonColor: '#f46a6a',
    });

    if (result.isConfirmed) {
      const res = yield exchangeInstance.post(`/bills/admin/order/attach-voucher/${orderId}`, formData);
      if (res.status === 201) {
        yield call(approveExchange, { orderId, closeModal });
      }
    } else yield put(actions.apiError());
  } catch (error) {
    yield put(actions.apiError('Ha ocurrido un error aprobando la orden. Por favor contacta a soporte.'));
    yield delay(4000);
    yield put(actions.clearAlert());
  }
}

function* createInvoice({ orderId }) {
  try {
    const res = yield exchangeInstance.post(`/bills/admin/order/${orderId}`);
    if (res.status === 201) {
      yield put(actions.createInvoiceSuccess('Factura generada correctamente.'));
      yield call(getExchangeDetails, { id: orderId });
    }
  } catch (error) {
    yield put(actions.apiError(error.data ? error.data.message : 'Ha ocurrido un error generando la factura. Por favor contacta a soporte.'));
  } finally {
    yield delay(4000);
    yield put(actions.clearAlert());
  }
}

export function* watchEditExchange() {
  yield takeEvery(actionTypes.EDIT_EXCHANGE, editExchange);
}

export function* watchExchangeDetails() {
  yield takeEvery(actionTypes.GET_EXCHANGE_DETAILS, getExchangeDetails);
}

export function* watchValidateExchange() {
  yield takeEvery(actionTypes.VALIDATE_EXCHANGE, validateExchange);
}

export function* watchApproveExchange() {
  yield takeEvery(actionTypes.APPROVE_EXCHANGE, uploadVoucher);
}

export function* watchDeclineExchange() {
  yield takeEvery(actionTypes.DECLINE_EXCHANGE, declineExchange);
}

export function* watchCreateInvoice() {
  yield takeEvery(actionTypes.CREATE_INVOICE, createInvoice);
}

export default function* currencyExchangeSaga() {
  yield all([fork(watchExchangeDetails), fork(watchApproveExchange), fork(watchValidateExchange), fork(watchDeclineExchange), fork(watchEditExchange), fork(watchCreateInvoice)]);
}
