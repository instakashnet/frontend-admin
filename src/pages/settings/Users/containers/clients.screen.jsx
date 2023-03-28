import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import Breadcrumbs from "../../../../components/Common/Breadcrumb";
import SendNotification from "../components/forms/send-notification.component";
import CompletedUsers from "../components/tables/completed-clients.component";
import NotCompletedUsers from "../components/tables/not-completed-clients.component";


export const ClientsScreen = () => {
  // HOOKS
  const dispatch = useDispatch(),
    { isProcessing } = useSelector((state) => state.Clients);

  // STATE
  const [modal, setModal] = useState(false),
    [modalType, setModalType] = useState(null);

  // HANDLERS
  const openModal = (modalType) => {
    setModalType(modalType);
    setModal(true);
  };

  const closeModal = () => setModal(false);

  // MODAL SETTINGS
  let ModalComponent;
  if (modalType === "notification") ModalComponent = <SendNotification dispatch={dispatch} isProcessing={isProcessing} closeModal={closeModal} />;

  return (
    <div className="page-content">
      <div className="container-fluid">
        <Breadcrumbs title="Usuarios" breadcrumbItem="Usuarios registrados" />
        <Row>
          <Col>
            <CompletedUsers dispatch={dispatch} openModal={openModal} />
          </Col>
          <Col>
            <NotCompletedUsers dispatch={dispatch} />
          </Col>
        </Row>
      </div>

      <Modal isOpen={modal} role="dialog" autoFocus={true} centered={true} tabIndex="-1" toggle={closeModal}>
        <ModalHeader toggle={closeModal}>Enviar notificación</ModalHeader>
        <ModalBody>{ModalComponent}</ModalBody>
      </Modal>
    </div>
  );
};
