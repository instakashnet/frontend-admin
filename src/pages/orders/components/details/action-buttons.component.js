import { useCallback, useState } from "react";
import { Spinner } from "reactstrap";

// COMPONENTS
import Select from "../../../../components/UI/FormItems/Select";

export const ActionButtons = ({ goBack, orderUuid, statusId, billCreated, role, onCreateInvoice, onChangeStatus, onSetReview, isProcessing, hasInvoice = false, inReview }) => {
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
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
      <button type="button" onClick={goBack} className="btn btn-blue waves-effect btn-label waves-light">
        <i className="fas fa-arrow-left label-icon"></i> Regresar
      </button>
      <div className="flex items-center flex-wrap">
        {statusId < 5 && (role === "manager" || role === "admin") && (
          <div className="flex mr-3 mt-2 items-end justify-center flex-col">
            <Select options={statusOptions} label="Cambiar estado" onChange={(e) => setStatus(+e.target.value)} />
            <button type="button" onClick={onChangeStatusHandler} disabled={!status} className="btn btn-blue waves-effect btn-label waves-light">
              <ButtonInfo icon="fa-check" info="cambiar" isProcessing={isProcessing} />
            </button>
          </div>
        )}

        {(statusId === 2 || statusId === 3 || statusId === 4) && (
          <button type="button" disabled={isProcessing} onClick={() => onChangeStatus(5)} className="btn btn-danger waves-effect btn-label waves-light">
            <ButtonInfo icon="fa-times" info="Cancelar" isProcessing={isProcessing} />
          </button>
        )}
        {(statusId === 3 || statusId === 4) && (
          <button type="button" disabled={isProcessing} onClick={() => onChangeStatus(statusId === 3 ? 4 : 6)} className="btn btn-success waves-effect ml-2 btn-label waves-light">
            <ButtonInfo icon="fa-check" info={statusId === 3 ? "Validar" : "Aprobar"} isProcessing={isProcessing} />
          </button>
        )}
        {statusId === 6 && !billCreated && hasInvoice && (
          <button type="button" disabled={isProcessing} onClick={onCreateInvoice} className="btn btn-success waves-effect btn-label waves-light">
            <ButtonInfo icon="fa-file-invoice" info="Generar factura" isProcessing={isProcessing} />
          </button>
        )}
        {(orderUuid?.includes("E") && statusId !== 6) && (
          <button type="button" disabled={isProcessing} onClick={onSetReview} className={`btn btn-${inReview ? "danger" : "success"} waves-effect btn-label waves-light ml-2`}>
            <ButtonInfo icon="fa-pen-square" info={inReview ? "Eliminar de revisión" : "Agregar a revisión"} isProcessing={isProcessing} />
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
