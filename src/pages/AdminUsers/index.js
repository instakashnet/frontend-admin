import React, { useEffect, useState } from "react";
import { Container, Row, Col, Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../store/actions";

import UsersTable from "./UsersTable";

const AdminUsers = (props) => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.AdminUsers);

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal((prev) => !prev);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <>
      <div className='page-content'>
        <Container fluid>
          <Row>
            <Col lg='12'>
              <UsersTable users={users} delete={() => {}} toggleModal={toggleModal} />
            </Col>
          </Row>
        </Container>
      </div>
      <Modal isOpen={modal} role='dialog' autoFocus={true} centered={true} tabIndex='-1' toggle={toggleModal}>
        <div className='modal-content'>
          <ModalHeader toggle={toggleModal}>Formulario de usuario</ModalHeader>
          <ModalBody>{/* <UserForm roles={roles} userData={userData} add={addUser} edit={editUser} toggleModal={toggleModal} /> */}</ModalBody>
          <ModalFooter>
            <Button type='button' color='secondary' onClick={toggleModal}>
              Cerrar
            </Button>
          </ModalFooter>
        </div>
      </Modal>
    </>
  );
};

export default AdminUsers;
