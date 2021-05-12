import React from 'react';
import { Col, Card, CardBody, CardTitle, Button, Table } from 'reactstrap';

const CompanyInfo = ({ company, openModal }) => {
  return (
    <Col lg='6'>
      <Card>
        <CardBody>
          <div className='d-flex align-items-center justify-content-between mb-4'>
            <CardTitle>Información de empresa</CardTitle>
            <Button onClick={() => openModal(company)}>
              <span className='bx bx-edit mr-2' /> Editar
            </Button>
          </div>

          <div className='table-responsive'>
            <Table className='table-nowrap mb-0'>
              <tbody>
                <tr>
                  <th scope='row'>Empresa</th>
                  <td>{company.razon_social}</td>
                </tr>
                <tr>
                  <th scope='row'>RUC</th>
                  <td>{company.ruc}</td>
                </tr>
                <tr>
                  <th scope='row'>Dirección fiscal</th>
                  <td>{company.address}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default CompanyInfo;
