import { all, call, takeEvery, takeLatest, put, fork } from "redux-saga/effects";
import Swal from "sweetalert2";
import camelize from "camelize";
import fileDownload from "js-file-download";
import moment from "moment";

import * as actions from "./actions";
import * as actionTypes from "./actionTypes";
import { setAlert, getClientExchangesSuccess } from "../../actions";
import { exchangeInstance, authInstance } from "../../../helpers/AuthType/axios";

function* getExchangesRelation({ values, excelType }) {
  let URL;

  if (excelType === "coupon" && values.couponName) {
    URL = `/users/clients/coupons/${values.couponName.toUpperCase()}/download`;
  } else URL = `/users/clients/orders/download?start=${values.start}&end=${values.end}`;

  if (values.bank) URL += `&bank=${values.bank}`;
  if (values.statusId) URL += `&status=${values.statusId}`;

  try {
    const res = yield authInstance.get(URL, { responseType: "arraybuffer" });

    yield call(fileDownload, res.data, `relacion_ordenes_${moment(values.start).format("DD-MM-YYYY HH:mm")}_${moment(values.end).format("DD-MM-YYYY HH:mm")}.xlsx`);
    yield put(actions.getExchangesRelationSuccess());
  } catch (error) {
    yield put(setAlert("danger", error.message));
    yield put(actions.apiError());
  }
}

function* getExchangeDetails({ id }) {
  try {
    const res = yield exchangeInstance.get(`/order/${id}`);
    if (res.status === 200) {
      const exchangeDetails = camelize(res.data);
      yield put(getClientExchangesSuccess([]));
      yield put(actions.getExchangeDetailsSuccess(exchangeDetails));
    }
  } catch (error) {
    yield put(setAlert("danger", error.message));
    yield put(actions.apiError());
  }
}

function* editExchange({ id, values, closeModal }) {
  try {
    const res = yield exchangeInstance.put(`/order/${id}`, values);
    if (res.status === 200) {
      yield put(actions.editExchangeSuccess());
      yield call(getExchangeDetails, { id });
      yield call(closeModal);
      yield Swal.fire("Operación editada", "Los datos de la operación han sido editados.", "success");
    }
  } catch (error) {
    yield put(setAlert("danger", error.message));
    yield put(actions.apiError());
  }
}

function* changeOrderStatus({ status, id }) {
  try {
    const res = yield exchangeInstance.put(`/order/update-status/${id}`, { status });

    if (res.status === 200) {
      yield call(getExchangeDetails, { id });
      yield Swal.fire("Exitoso", `La operación ha cambiado de estado.`, "success");
      yield put(actions.changeOrderStatusSuccess());
    }
  } catch (error) {
    yield put(setAlert("danger", error.message));
    yield put(actions.apiError());
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
      const res = yield exchangeInstance.put(`/order/status/${orderId}`, { status: 4 });
      if (res.status === 200) {
        yield call(getExchangeDetails, { id: orderId });
        yield Swal.fire("Exitoso", `La operación fue validada correctamente.`, "success");
        yield put(actions.validateExchangeSuccess());
      }
    } else yield put(actions.apiError());
  } catch (error) {
    yield put(setAlert("danger", error.message));
    yield put(actions.apiError());
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
      const res = yield exchangeInstance.put(`/order/status/${orderId}`, { status: 5 });
      if (res.status === 200) {
        yield call(getExchangeDetails, { id: orderId });
        yield put(actions.declineExchangeSuccess());
      }
    } else yield put(actions.apiError());
  } catch (error) {
    yield put(setAlert("danger", error.message));
    yield put(actions.apiError());
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
      const res = yield exchangeInstance.post(`/bills/order/attach-voucher/${orderId}`, formData);
      if (res.status === 201) yield call(approveExchange, { orderId, transactionCode: values.transactionCodeFinalized, closeModal });
    } else yield put(actions.apiError());
  } catch (error) {
    yield put(setAlert("danger", error.message));
    yield put(actions.apiError());
  }
}

function* approveExchange({ orderId, transactionCode, closeModal }) {
  try {
    const res = yield exchangeInstance.put(`/order/status/${orderId}`, { status: 6, transactionCodeFinalized: transactionCode, finalizedAt: new Date() });
    if (res.status === 200) {
      yield call(getExchangeDetails, { id: orderId });
      yield call(closeModal);
      yield Swal.fire("Exitoso", `La operación fue aprobada correctamente.`, "success");
      yield put(actions.approveExchangeSuccess());
    }
  } catch (error) {
    throw error;
  }
}

function* createInvoice({ orderId }) {
  try {
    const res = yield exchangeInstance.post(`/bills/order/${orderId}`);
    if (res.status === 201) {
      yield call(getExchangeDetails, { id: orderId });
      yield put(setAlert("success", "La factura se ha generado correctamente."));
      yield put(actions.createInvoiceSuccess());
    }
  } catch (error) {
    yield put(setAlert("danger", error.message));
    yield put(actions.apiError());
  }
}

function* reassignOrder({ values, orderId, closeModal }) {
  const reassignValues = {
    ...values,
    operatorAssigned: +values.operatorAssigned,
  };

  try {
    const res = yield exchangeInstance.put(`/order/assigned/${orderId}`, reassignValues);
    if (res.status === 200) {
      yield call(getExchangeDetails, { id: orderId });
      yield call(closeModal);
      yield call([Swal, "fire"], "Exitoso", "Orden reasignada correctamente", "success");
      yield put(actions.reassignOrderSuccess());
    }
  } catch (error) {
    yield put(setAlert("danger", error.message));
    yield put(actions.apiError());
  }
}

function* setRevision({ values, closeModal, orderId }) {
  const noteValues = { note: values.note || null };

  try {
    const res = yield exchangeInstance.put(`/order/notes/${orderId}`, noteValues);
    if (res.status === 200) {
      yield call(getExchangeDetails, { id: orderId });
      yield call(closeModal);
      yield call([Swal, "fire"], "Exitoso", "La revisión de orden ha sido actualizada.", "success");
      yield put(actions.setRevisionSuccess());
    }
  } catch (error) {
    yield put(setAlert("danger", error.message));
    yield put(actions.apiError());
  }
}

export function* watchEditExchange() {
  yield takeEvery(actionTypes.EDIT_EXCHANGE, editExchange);
}

export function* watchExchangesRelation() {
  yield takeEvery(actionTypes.GET_EXCHANGES_RELATION_INIT, getExchangesRelation);
}

export function* watchExchangeDetails() {
  yield takeEvery(actionTypes.GET_EXCHANGE_DETAILS, getExchangeDetails);
}

export function* watchChangeOrderStatus() {
  yield takeLatest(actionTypes.CHANGE_ORDER_STATUS_INIT, changeOrderStatus);
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
    fork(watchExchangesRelation),
    fork(watchApproveExchange),
    fork(watchValidateExchange),
    fork(watchDeclineExchange),
    fork(watchChangeOrderStatus),
    fork(watchEditExchange),
    fork(watchCreateInvoice),
    fork(watchReassignOrder),
    fork(watchSetRevision),
  ]);
}
