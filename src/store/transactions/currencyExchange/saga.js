import { all, call, takeEvery, takeLatest, put, fork, delay } from "redux-saga/effects";
import * as actions from "./actions";
import * as actionTypes from "./actionTypes";
import Swal from "sweetalert2";
import { exchangeInstance } from "../../../helpers/AuthType/axios";
import { getClientExchanges } from "../../settings/clients/actions";
import history from "../../../helpers/history";
import camelize from "camelize";

function* getExchangeDetails({ id }) {
  try {
    const res = yield exchangeInstance.get(`/order/admin/${id}`);
    console.log(res);
    if (res.status === 200) {
      const exchangeDetails = camelize(res.data);
      yield put(actions.getExchangeDetailsSuccess(exchangeDetails));
      yield put(getClientExchanges(res.data.userId));
    }
  } catch (error) {
    let message = error.message;
    if (error.status === 404) message = "No estas asignado para poder ver esta operación.";

    yield put(actions.apiError(message));
    yield delay(6000);
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
      yield Swal.fire("Operación editada", "Los datos de la operación han sido editados.", "success");
    }
  } catch (error) {
    yield put(actions.apiError("Ha ocurrido un error editando la transacción, Por favor contacte a soporte."));
    yield delay(4000);
    yield put(actions.clearAlert());
  }
}

function* validateExchange({ orderId }) {
  try {
    const result = yield Swal.fire({
      title: `¿Deseas validar esta operación?`,
      text: "Al continuar no podrás revertir este estado.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Si, continuar`,
      cancelButtonText: "No, cancelar",
      cancelButtonColor: "#f46a6a",
    });

    if (result.isConfirmed) {
      const res = yield exchangeInstance.put(`/order/admin/status/${orderId}`, { status: 4 });
      if (res.status === 200) {
        yield call(getExchangeDetails, { id: orderId });
        yield put(actions.validateExchangeSuccess());
        yield Swal.fire("Exitoso", `La operación fue validada correctamente.`, "success");
      }
    } else yield put(actions.apiError());
  } catch (error) {
    yield put(actions.apiError("Ha ocurrido un error validando la operación. Por favor contacta a soporte."));
    yield delay(4000);
    yield put(actions.clearAlert());
  }
}

function* approveExchange({ orderId, closeModal }) {
  try {
    const res = yield exchangeInstance.put(`/order/admin/status/${orderId}`, { status: 6 });
    if (res.status === 200) {
      yield put(actions.approveExchangeSuccess());
      yield call(getExchangeDetails, { id: orderId });
      yield call(closeModal);
      yield Swal.fire("Exitoso", `La operación fue aprobada correctamente.`, "success");
    }
  } catch (error) {
    throw error;
  }
}

function* declineExchange({ orderId }) {
  try {
    const result = yield Swal.fire({
      title: `¿Deseas cancelar esta operación?`,
      text: "Al continuar no podrás revertir este estado.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Si, continuar.`,
      cancelButtonText: "No, cancelar.",
      cancelButtonColor: "#f46a6a",
    });

    if (result.isConfirmed) {
      const res = yield exchangeInstance.put(`/order/admin/status/${orderId}`, { status: 5 });
      if (res.status === 200) {
        yield call(getExchangeDetails, { id: orderId });
        yield put(actions.declineExchangeSuccess());
      }
    } else yield put(actions.apiError());
  } catch (error) {
    yield put(actions.apiError(error.message));
    yield delay(4000);
    yield put(actions.clearAlert());
  }
}

function* uploadVoucher({ orderId, values, closeModal }) {
  const formData = new FormData();
  formData.append("file", values.file);

  try {
    const result = yield Swal.fire({
      title: `¿Deseas aprobar esta operación?`,
      text: "Al continuar no podrás revertir este estado.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Si, continuar`,
      cancelButtonText: "No, cancelar",
      cancelButtonColor: "#f46a6a",
    });

    if (result.isConfirmed) {
      const res = yield exchangeInstance.post(`/bills/admin/order/attach-voucher/${orderId}`, formData);
      if (res.status === 201) {
        yield call(approveExchange, { orderId, closeModal });
      }
    } else yield put(actions.apiError());
  } catch (error) {
    yield put(actions.apiError("Ha ocurrido un error aprobando la orden. Por favor contacta a soporte."));
    yield delay(4000);
    yield put(actions.clearAlert());
  }
}

function* createInvoice({ orderId }) {
  try {
    const res = yield exchangeInstance.post(`/bills/admin/order/${orderId}`);
    if (res.status === 201) {
      yield put(actions.createInvoiceSuccess("Factura generada correctamente."));
      yield call(getExchangeDetails, { id: orderId });
    }
  } catch (error) {
    yield put(actions.apiError(error.data ? error.data.message : "Ha ocurrido un error generando la factura. Por favor contacta a soporte."));
  } finally {
    yield delay(4000);
    yield put(actions.clearAlert());
  }
}

function* reassignOrder({ values, orderId, setState }) {
  const reassignValues = {
    ...values,
    operatorAssigned: +values.operatorAssigned,
  };

  try {
    const res = yield exchangeInstance.put(`/order/admin/assigned/${orderId}`, reassignValues);
    if (res.status === 200) {
      yield put(actions.reassignOrderSuccess());
      yield call(setState, null);
      yield call(getExchangeDetails, { id: orderId });
      yield call([Swal, "fire"], "Exitoso", "Orden reasignada correctamente", "success");
      yield call([history, "goBack"]);
    }
  } catch (error) {
    let message = error.message;

    if (error.data) {
      if (error.data.code === 4008) message = "La moneda de la cuenta seleccionada no corresponde a la moneda del monto a enviar.";
      if (error.data.code === 4007) message = "El operador que se desea asignar no corresponde al banco de la cuenta seleccionada.";
    }

    yield put(actions.apiError(message));
    yield delay(4000);
    yield put(actions.clearAlert());
  }
}

function* setRevision({ values, setState, orderId }) {
  const noteValues = { note: values.note || null };

  try {
    const res = yield exchangeInstance.put(`/order/admin/notes/${orderId}`, noteValues);
    if (res.status === 200) {
      yield put(actions.setRevisionSuccess());
      yield call(getExchangeDetails, { id: orderId });
      yield call(setState, false);
      yield call([Swal, "fire"], "Exitoso", "La revisión de orden ha sido actualizada.", "success");
    }
  } catch (error) {
    yield put(actions.apiError(error.message));
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

export function* watchReassignOrder() {
  yield takeLatest(actionTypes.REASSIGN_ORDER_INIT, reassignOrder);
}

export function* watchSetRevision() {
  yield takeLatest(actionTypes.SET_REVISION_INIT, setRevision);
}

export default function* currencyExchangeSaga() {
  yield all([
    fork(watchExchangeDetails),
    fork(watchApproveExchange),
    fork(watchValidateExchange),
    fork(watchDeclineExchange),
    fork(watchEditExchange),
    fork(watchCreateInvoice),
    fork(watchReassignOrder),
    fork(watchSetRevision),
  ]);
}
