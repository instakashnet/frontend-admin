import { useCallback, useState } from "react";
import { Spinner } from "reactstrap";

// COMPONENTS
import Select from "../../../../components/UI/FormItems/Select";

export const ActionButtons = ({ goBack, statusId, billCreated, role, onCreateInvoice, onChangeStatus, isProcessing, hasInvoice = false }) => {
  const [status, setStatus] = useState(null);

  const statusOptions = [
    {
      label: "Validando",
      value: 3,
    },
    {
      label: "Procesando",
      value: 4,
    },
  ];

  const onChangeStatusHandler = useCallback(() => {
    onChangeStatus(status, "change");
  }, [status, onChangeStatus]);

  return (
    <div>
      {statusId < 5 && (role === "manager" || role === "admin") && (
        <div className="flex mb-4 items-end justify-end">
          <Select options={statusOptions} label="Cambiar estado" onChange={(e) => setStatus(+e.target.value)} />
          <button type="button" onClick={onChangeStatusHandler} disabled={!status} className="btn ml-2 btn-blue waves-effect btn-label waves-light">
            <ButtonInfo icon="fa-check" info="cambiar estado" isProcessing={isProcessing} />
          </button>
        </div>
      )}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <button type="button" onClick={goBack} className="btn btn-blue waves-effect btn-label waves-light">
          <i className="fas fa-arrow-left label-icon"></i> Regresar
        </button>
        <div className="flex flex-wrap items-center justify-end flex-wrap">
          {statusId === 3 && (
            <button type="button" disabled={isProcessing} onClick={() => onChangeStatus(7)} className="btn btn-warning waves-effect btn-label waves-light">
              <ButtonInfo icon="fa-percentage" info="Enviar a tasa" isProcessing={isProcessing} />
            </button>
          )}
          {(statusId === 3 || statusId === 4 || statusId === 7) && (
            <button
              type="button"
              disabled={isProcessing}
              onClick={() => onChangeStatus(statusId === 3 || statusId === 7 ? 4 : 6)}
              className="btn btn-success waves-effect ml-2 btn-label waves-light"
            >
              <ButtonInfo icon="fa-check" info={statusId === 3 || statusId === 7 ? "Validar" : "Aprobar"} isProcessing={isProcessing} />
            </button>
          )}
          {(statusId === 2 || statusId === 3 || statusId === 4 || statusId === 7) && (
            <button type="button" disabled={isProcessing} onClick={() => onChangeStatus(5)} className="btn btn-danger waves-effect ml-2 btn-label waves-light">
              <ButtonInfo icon="fa-times" info="Cancelar" isProcessing={isProcessing} />
            </button>
          )}
          {statusId === 6 && !billCreated && hasInvoice && (
            <button type="button" disabled={isProcessing} onClick={onCreateInvoice} className="btn btn-success waves-effect btn-label waves-light">
              <ButtonInfo icon="fa-file-invoice" info="Generar factura" isProcessing={isProcessing} />
            </button>
          )}
        </div>
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
