import React from "react";

const ActionButtons = ({ history, stateId, role, billCreated, onDecline, onCreateInvoice, onChangeStatus, isProcessing }) => {
  return (
    <div className="d-flex align-items-center justify-content-between">
      <button type="button" onClick={() => history.goBack()} className="btn btn-blue waves-effect btn-label waves-light">
        <i className="fas fa-arrow-left label-icon"></i> Regresar
      </button>
      <div>
        {(stateId === 2 || stateId === 3 || stateId === 4) && role !== "ROLE_OPERATOR" && (
          <button type="button" disabled={isProcessing} onClick={onDecline} className="btn btn-danger waves-effect btn-label waves-light">
            <i className="fas fa-times label-icon"></i> Cancelar
          </button>
        )}
        {(stateId === 3 || stateId === 4) && (
          <button type="button" disabled={isProcessing} onClick={onChangeStatus} className="btn btn-primary waves-effect ml-3 btn-label waves-light">
            <i className="fas fa-check label-icon"></i> {stateId === 3 ? "Validar" : "Aprobar"}
          </button>
        )}
        {stateId === 6 && !billCreated && (
          <button type="button" disabled={isProcessing} onClick={onCreateInvoice} className="btn btn-primary waves-effect btn-label waves-light">
            <i className="fas fa-file-invoice label-icon"></i> Generar factura
          </button>
        )}
      </div>
    </div>
  );
};

export default ActionButtons;
