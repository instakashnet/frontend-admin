import fileDownload from "js-file-download";
import moment from "moment";
import { all, call, fork, put, takeEvery, takeLatest } from "redux-saga/effects";
import Swal from "sweetalert2";
import { downloadBankConciliationSvc, uploadBankConciliationSvc } from "../../../api/lib/conciliation";
import { getExchangesRelationSvc } from "../../../api/services/auth.service";
import {
  approveExchangeSvc,
  changeOrderStatusSvc,
  ChangeStatusSvc,
  createInvoiceSvc,
  editExchangeSvc,
  getExchangeDetailsSvc,
  reassignOrderSvc,
  setRevisionSvc,
  uploadVoucherSvc,
} from "../../../api/services/exchange.service";
import { getClientExchangesSuccess, setAlert } from "../../actions";
import * as actions from "./actions";
import * as actionTypes from "./actionTypes";

const ORDER_STATUS = {
  3: "VALIDANDO",
  4: "PROCESANDO",
  5: "CANCELADA",
  6: "EXITOSA",
  7: "VALIDAR TASA",
};

// UTILS
function base64ToArrayBuffer(base64) {
  var binaryString = window.atob(base64);
  var binaryLen = binaryString.length;
  var bytes = new Uint8Array(binaryLen);
  for (var i = 0; i < binaryLen; i++) {
    var ascii = binaryString.charCodeAt(i);
    bytes[i] = ascii;
  }
  return bytes;
}

function* getExchangesRelation({ values, excelType }) {
  let start, end;

  if (values.isDay) {
    start = moment(values.start).format("YYYY-MM-DD [00:00:00]");
    end = moment(values.end).format("YYYY-MM-DD [00:00:00]");
  } else {
    start = moment(values.start).format("YYYY-MM-DD hh:mm:ss");
    end = moment(values.end).format("YYYY-MM-DD hh:mm:ss");
  }

  let URL;
  if (excelType === "coupon" && values.couponName) {
    URL = `/users/clients/coupons/${values.couponName.toUpperCase()}/download`;
  } else URL = `/users/clients/orders/download?start=${start}&end=${end}`;

  if (values.bank) URL += `&bank=${values.bank}`;
  if (values.statusId) URL += `&status=${values.statusId}`;
  if (values.isDay && values.balanceFlag)
    URL +=
      `&balanceFlag=${values.balanceFlag}` +
      `&initialAmountPENBCP=${values.initialAmountPENBCP}&initialAmountUSDBCP=${values.initialAmountUSDBCP}` +
      `&initialAmountPENIBK=${values.initialAmountPENIBK}&initialAmountUSDIBK=${values.initialAmountUSDIBK}` +
      `&rateInit=${values.rateInit}&rateEnd=${values.rateEnd}`;

  try {
    const res = yield call(getExchangesRelationSvc, URL);
    yield call(fileDownload, res, `relacion_ordenes_${start}_${end}.xlsx`);
    yield put(actions.getExchangesRelationSuccess());
  } catch (error) {
    if (error?.message) yield put(setAlert("danger", error.message));
    yield put(actions.apiError());
  }
}

function* uploadBankConciliation({ values, setUploaded }) {
  const { conciliationFiles } = values,
    formData = new FormData();
  conciliationFiles.forEach((file) => formData.append(file.name, file));
  try {
    yield call(uploadBankConciliationSvc, formData);
    yield put(setAlert("success", "Todos los archivos fueron cargados correctamente."));
    yield call(setUploaded, true);
    yield put(actions.uploadBankConciliationSuccess());
  } catch (error) {
    yield put(setAlert("danger", "Ha ocurrido un error subiendo los archivos de conciliación"));
    yield put(actions.apiError());
  }
}

function* downloadBankConciliation({ date }) {
  const formattedDate = moment(date).format("YYYY-MM-DD");
  try {
    const res = yield call(downloadBankConciliationSvc, formattedDate);
    const fileArray = base64ToArrayBuffer(res.contentByte);
    yield call(fileDownload, fileArray, res.fileName);
    yield put(actions.downloadBankConciliationSuccess());
  } catch (error) {
    yield put(setAlert("danger", "Ha ocurrido un error descargando la conciliación. Verifica la fecha correcta."));
    yield put(actions.apiError());
  }
}

function* getExchangeDetails({ id }) {
  try {
    const res = yield call(getExchangeDetailsSvc, id);
    yield put(getClientExchangesSuccess([]));
    return yield put(actions.getExchangeDetailsSuccess(res));
  } catch (error) {
    if (error?.message) yield put(setAlert("danger", error.message));
    yield put(actions.apiError());
  }
}

function* editExchange({ id, values, closeModal }) {
  try {
    yield call(editExchangeSvc, id, values);
    yield put(actions.editExchangeSuccess());
    yield call(getExchangeDetails, { id });
    yield call(closeModal);
    yield Swal.fire("Operación editada", "Los datos de la operación han sido editados.", "success");
  } catch (error) {
    if (error?.message) yield put(setAlert("danger", error.message));
    yield put(actions.apiError());
  }
}

function* changeOrderStatus({ status, id }) {
  try {
    yield call(changeOrderStatusSvc, id, status);
    yield call(getExchangeDetails, { id });
    yield Swal.fire("Exitoso", `La operación ha cambiado de estado.`, "success");
    yield put(actions.changeOrderStatusSuccess());
  } catch (error) {
    if (error?.message) yield put(setAlert("danger", error.message));
    yield put(actions.apiError());
  }
}

function* changeStatus({ orderId, statusId }) {
  try {
    const result = yield Swal.fire({
      title: `¿Deseas pasar esta operación a: ${ORDER_STATUS[statusId]}?`,
      text: "Al continuar no podrás revertir este estado.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Sí, continuar`,
      cancelButtonText: "No, regresar",
      cancelButtonColor: "#f46a6a",
    });
    if (result.isConfirmed) {
      yield call(ChangeStatusSvc, orderId, statusId);
      yield call(getExchangeDetails, { id: orderId });
      yield Swal.fire("Exitoso", `La operación pasó a ${ORDER_STATUS[statusId]} correctamente.`, "success");
      yield put(actions.changeStatusSuccess());
    } else yield put(actions.changeStatusCancelled());
  } catch (error) {
    if (error?.message) yield put(setAlert("danger", error.message));
    yield put(actions.apiError());
  }
}

function* processOrder({ orderId, values, closeModal }) {
  const formData = new FormData();
  formData.append("file", values.file);
  try {
    const result = yield Swal.fire({
      title: `¿Deseas aprobar esta operación?`,
      text: "Al continuar no podrás revertir este estado.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Sí, continuar`,
      cancelButtonText: "No, cancelar",
      cancelButtonColor: "#f46a6a",
    });
    if (result.isConfirmed) {
      yield call(uploadVoucherSvc, orderId, formData);
      yield call(approveExchangeSvc, orderId, values.transactionCodeFinalized);
      yield call(closeModal);
      yield call(getExchangeDetails, { id: orderId });

      yield Swal.fire("Exitoso", `La operación fue aprobada correctamente.`, "success");
      yield put(actions.processOrderSuccess());
    } else yield put(actions.apiError());
  } catch (error) {
    if (error?.message) yield put(setAlert("danger", error.message));
    yield put(actions.apiError());
  }
}

function* createInvoice({ orderId }) {
  try {
    yield call(createInvoiceSvc, orderId);
    yield call(getExchangeDetails, { id: orderId });
    yield put(setAlert("success", "La factura se ha generado correctamente."));
    yield put(actions.createInvoiceSuccess());
  } catch (error) {
    if (error?.message) yield put(setAlert("danger", error.message));
    yield put(actions.apiError());
  }
}

function* reassignOrder({ values, orderId, closeModal }) {
  const reassignValues = {
    ...values,
    operatorAssigned: +values.operatorAssigned,
  };
  try {
    yield call(reassignOrderSvc, orderId, reassignValues);
    yield call(getExchangeDetails, { id: orderId });
    yield call(closeModal);
    yield call([Swal, "fire"], "Exitoso", "Orden reasignada correctamente", "success");
    yield put(actions.reassignOrderSuccess());
  } catch (error) {
    if (error?.message) yield put(setAlert("danger", error.message));
    yield put(actions.apiError());
  }
}

function* setRevision({ values, closeModal, orderId }) {
  const modalMessage = closeModal ? "La nota de la orden ha sido actualizada." : "La revisión de orden ha sido actualizada.",
    noteValues = { note: values.note || null, inReview: values.inReview };

  try {
    yield call(setRevisionSvc, orderId, noteValues);
    yield call(getExchangeDetails, { id: orderId });
    if (closeModal) yield call(closeModal);
    yield call([Swal, "fire"], "Exitoso", modalMessage, "success");
    yield put(actions.setRevisionSuccess());
  } catch (error) {
    if (error?.message) yield put(setAlert("danger", error.message));
    yield put(actions.apiError());
  }
}

export function* watchEditExchange() {
  yield takeEvery(actionTypes.EDIT_EXCHANGE, editExchange);
}

export function* watchExchangesRelation() {
  yield takeEvery(actionTypes.GET_EXCHANGES_RELATION_INIT, getExchangesRelation);
}

export function* watchUploadBankConciliation() {
  yield takeLatest(actionTypes.UPLOAD_CONCILIATION.INIT, uploadBankConciliation);
}

export function* watchDownloadBankConciliation() {
  yield takeLatest(actionTypes.DOWNLOAD_CONCILIATION.INIT, downloadBankConciliation);
}

export function* watchExchangeDetails() {
  yield takeEvery(actionTypes.GET_EXCHANGE_DETAILS, getExchangeDetails);
}

export function* watchChangeOrderStatus() {
  yield takeLatest(actionTypes.CHANGE_ORDER_STATUS_INIT, changeOrderStatus);
}

export function* watchChangeStatus() {
  yield takeEvery(actionTypes.CHANGE_STATUS.INIT, changeStatus);
}

export function* watchProcessOrder() {
  yield takeEvery(actionTypes.PROCESS_ORDER.INIT, processOrder);
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
    fork(watchUploadBankConciliation),
    fork(watchDownloadBankConciliation),
    fork(watchProcessOrder),
    fork(watchChangeStatus),
    fork(watchChangeOrderStatus),
    fork(watchEditExchange),
    fork(watchCreateInvoice),
    fork(watchReassignOrder),
    fork(watchSetRevision),
  ]);
}
