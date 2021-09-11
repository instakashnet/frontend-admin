import React from "react";
import { Row, Col, Badge } from "reactstrap";
import { Edit } from "@material-ui/icons";

import { SkeletonComponent } from "../../../../../components/UI/skeleton.component";

export const StatusInfo = ({ details, isLoading, onShowForm }) => {
  return (
    <Row className="mb-3">
      <Col lg="8" className="flex flex-wrap justify-between items-center">
        {isLoading ? (
          <StatusSkeleton />
        ) : (
          <>
            <Badge className="py-2 font-size-15 w-full max-w-xs" style={{ color: "#fff", backgroundColor: details.stateColor }}>
              {`${details.stateNme} ${details.orderNotes ? " - EN REVISIÓN" : ""}`}
            </Badge>
            <div className="flex flex-col items-end">
              <p className="mb-2">
                <span className="text-muted mr-1">Operador asignado: </span> {details.operatorName || "Sin asignar"}
              </p>
              {details.stateId !== 6 && (
                <button type="button" className="mt-1 border-2 border-gray-400 py-2 px-4 text-sm rounded-md" onClick={onShowForm}>
                  <Edit fontSize="small" className="mr-1" /> {details.orderNotes ? "Editar" : "Agregar"} revisión
                </button>
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
