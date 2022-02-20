import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { getAdminsInit, setAdminOnlineInit } from "../../../store/actions";

import { AdministratorsTable } from "./components/administrators-table.component";

export const AdministratorsScreen = () => {
  const dispatch = useDispatch(),
    { isLoading, admins } = useSelector((state) => state.AdminUsers);

  const onSetOnline = (id) => dispatch(setAdminOnlineInit(id));

  useEffect(() => {
    dispatch(getAdminsInit());
  }, [dispatch]);

  return (
    <div className="page-content">
      <Container fluid>
        <Row>
          <Col md="10">
            <AdministratorsTable onSetOnline={onSetOnline} admins={admins} isLoading={isLoading} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
