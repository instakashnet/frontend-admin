import { Edit } from "@material-ui/icons";
import { Badge, Col, Row, Spinner } from "reactstrap";

import { SkeletonComponent } from "../../../../../components/UI/skeleton.component";

export const StatusInfo = ({ status, inReview, operator, note, isProcessing, isLoading, onShowForm, onSetReview }) => {
  return (
    <Row className="mb-3">
      <Col lg="8" className="flex flex-wrap justify-between items-center">
        {isLoading ? (
          <StatusSkeleton />
        ) : (
          <>
            <Badge className="py-2 font-size-15 w-full max-w-xs" style={{ color: "#fff", backgroundColor: status.stateColor }}>
              {`${status.stateName} ${inReview ? " - EN REVISIÓN" : ""}`}
            </Badge>
            <div className="flex flex-col items-end">
              <p className="mb-2">
                <span className="text-muted mr-1">Operador asignado: </span> {operator.operatorName || "Sin asignar"}
              </p>
              {status.stateId !== 6 && (
                <>
                  <button type="button" className="mt-1 border-2 border-gray-400 py-2 px-4 text-sm rounded-md" onClick={onShowForm}>
                    <Edit fontSize="small" className="mr-1" /> {note ? "Editar" : "Agregar"} nota
                  </button>
                  <button type="button" disabled={isProcessing} className={`btn btn-${inReview ? "danger" : "blue"} mt-1.5 py-2 px-4 text-sm rounded-md`} onClick={onSetReview}>
                    {isProcessing ? (
                      <Spinner size="sm" />
                    ) : (
                      <>
                        <i className="fas fa-pen-square mr-1.5"></i> {inReview ? "Eliminar de revisión" : "Agregar a revisión"}
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </Col>
    </Row>
  );
};

const StatusSkeleton = () => {
  return (
    <>
      <SkeletonComponent width={250} height={45} />
      <SkeletonComponent width={140} height={45} />
    </>
  );
};
