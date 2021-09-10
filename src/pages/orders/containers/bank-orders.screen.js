import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Modal, ModalBody, ModalHeader, Button, Card, CardBody } from "reactstrap";
import { bankOrdersColumns } from "../../../helpers/tables/columns";

import { Table } from "../../../components/UI/tables/table.component";
import { CreateOrder } from "../components/forms/create-order.component";

export const BankOrdersScreen = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState(null);
  const [data, setData] = useState([]);

  const { isProcessing } = useSelector((state) => state.bankOrdersReducer);
  const banks = useSelector((state) => state.Banks.banks);
  const currencies = useSelector((state) => state.Data.currencies);

  return (
    <div className="page-content">
      <Container fluid>
        <Row>
          <Col lg="12">
            <div className="flex items-center justify-between mb-3 mx-3">
              <Button onClick={() => {}} className="btn-primary">
                Actualizar operaciones
              </Button>

              <Button onClick={() => setModal(true)} className="btn-primary">
                Crear pedido <span className="bx bx-plus" />
              </Button>
            </div>
            <Card>
              <CardBody>
                <div className="table-responsive">
                  <Table title="Pedidos a caja" columns={bankOrdersColumns} data={data} isLoading={isLoading} />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <Modal isOpen={modal} role="dialog" autoFocus centered tabIndex="-1" toggle={() => setModal((prev) => !prev)}>
        <ModalHeader>Nuevo pedido</ModalHeader>
        <ModalBody>
          <CreateOrder isProcessing={isProcessing} dispatch={dispatch} currencies={currencies} banks={banks} />
        </ModalBody>
      </Modal>
    </div>
  );
};
