import React from 'react';
import { Row, Col } from 'reactstrap';

import Breadcrumbs from '../../../components/Common/Breadcrumb';
import Completed from './Completed';
import NotCompleted from './NotCompleted';

const UsersTable = () => {
  return (
    <div className='page-content'>
      <div className='container-fluid'>
        <Breadcrumbs title='Usuarios' breadcrumbItem='Usuarios registrados' />
        <Row>
          <Col className='col-12'>
            <h3 className='ml-2 mb-3'>Perfil completo</h3>
            <Completed />
          </Col>
          <Col className='col-12'>
            <h3 className='ml-2 mb-3'>Perfil incompleto</h3>
            <NotCompleted />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default UsersTable;
