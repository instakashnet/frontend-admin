import React from "react";
import { Col, Badge } from "reactstrap";
import { SkeletonComponent } from "../../../../../components/UI/skeleton.component";

export const StatusInfo = ({ isLoading, details }) => {
  return (
    <Col lg="8" className="d-flex flex-wrap justify-content-between items-center">
      {isLoading ? (
        <SkeletonComponent width={250} />
      ) : (
        <Badge className="py-2 font-size-15 w-full max-w-xs" style={{ color: "#fff", backgroundColor: details.stateColor }}>
          {details.stateName}
        </Badge>
      )}
    </Col>
  );
};
