import React from "react";
import { Spinner } from "reactstrap";

export const ActionButtons = ({ goBack, statusId, billCreated, onDecline, onCreateInvoice, onChangeStatus, isProcessing, hasInvoice = false }) => {
  return (
    <div className="d-flex align-items-center justify-content-between">
      <button type="button" onClick={goBack} className="btn btn-blue waves-effect btn-label waves-light">
        <i className="fas fa-arrow-left label-icon"></i> Regresar
      </button>
      <div>
        {(statusId === 2 || statusId === 3 || statusId === 4) && (
          <button type="button" disabled={isProcessing} onClick={onDecline} className="btn btn-danger waves-effect btn-label waves-light">
            <ButtonInfo icon="fa-times" info="Cancelar" isProcessing={isProcessing} />
          </button>
        )}
        {(statusId === 3 || statusId === 4) && (
          <button type="button" disabled={isProcessing} onClick={onChangeStatus} className="btn btn-success waves-effect ml-3 btn-label waves-light">
            <ButtonInfo icon="fa-check" info={statusId === 3 ? "Validar" : "Aprobar"} isProcessing={isProcessing} />
          </button>
        )}
        {statusId === 6 && !billCreated && hasInvoice && (
          <button type="button" disabled={isProcessing} onClick={onCreateInvoice} className="btn btn-success waves-effect btn-label waves-light">
            <ButtonInfo icon="fa-file-invoice" info="Generar factura" isProcessing={isProcessing} />
          </button>
        )}
      </div>
    </div>
  );
};

const ButtonInfo = ({ icon, info, isProcessing }) =>
  isProcessing ? (
    <Spinner size="sm" />
  ) : (
    <>
      <i className={`fas ${icon} label-icon`} /> {info}
    </>
  );
