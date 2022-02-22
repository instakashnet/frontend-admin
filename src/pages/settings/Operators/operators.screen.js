import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { getOperatorsInit, setOperatorOnlineInit } from "../../../store/actions";

import { OperatorsTable } from "./components/operators-table.component";

export const OperatorsScreen = () => {
  const dispatch = useDispatch(),
    { isLoading, operators } = useSelector((state) => state.AdminUsers);

  const onSetOnline = (id) => dispatch(setOperatorOnlineInit(id));

  useEffect(() => {
    dispatch(getOperatorsInit(false));
  }, [dispatch]);

  return (
    <div className="page-content">
      <Container fluid>
        <Row>
          <Col md="10">
            <OperatorsTable onSetOnline={onSetOnline} operators={operators} isLoading={isLoading} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
