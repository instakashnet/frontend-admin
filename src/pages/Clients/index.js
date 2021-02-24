import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClientsInit } from "../../store/actions";
import { Container, Row, Col } from "reactstrap";

import UsersTable from "./ClientsTable";

const Users = () => {
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.Clients.clients);

  useEffect(() => {
    dispatch(getClientsInit());
  }, [dispatch]);

  return (
    <div className='page-content'>
      <Container fluid>
        <Row>
          <Col lg='12'>
            <UsersTable clients={clients} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Users;
