import React, { useEffect, useState } from "react";
import moment from "moment-timezone";
import { connect } from "react-redux";
import { getAdvanceDetails, approveCashAdvance } from "../../store/actions";
import { convertHexToRGBA } from "../../helpers/functions";
import { Card, CardBody, Spinner, Badge, Row, Col, Button } from "reactstrap";

import ApproveForm from "../../components/Transactions/ApproveForm";
import DeclineForm from "../../components/Transactions/CancelForm";

const TransactionDetails = (props) => {
  const [decline, setDecline] = useState(false);
  const [approve, setApprove] = useState(false);

  const { id, getAdvanceDetails, advanceDetails, isLoading, approveCashAdvance, close, connection } = props;

  useEffect(() => {
    if (!isNaN(id)) getAdvanceDetails(id);
  }, [getAdvanceDetails, id]);

  const closeApprove = () => setApprove(false);

  const approveAdvance = (invoice) => approveCashAdvance(id, advanceDetails, connection, close, closeApprove, invoice);
  const declineAdvance = (message) => console.log(message);

  const setApproveState = (status) => (status === 7 ? approveAdvance(status) : setApprove(true));
  const setDeclineState = () => {
    setApprove(false);
    setDecline(true);
  };

  let Details = null;

  if (isLoading) Details = <Spinner color='#fff' />;

  if (!isLoading && advanceDetails) {
    Details = (
      <>
        <div className='invoice-title d-flex justify-content-between align-items-center mb-4'>
          <h4 className='font-size-16'>
            <span>Solicitud # {advanceDetails.operacion}</span>
          </h4>
          <Badge className='btn py-2 font-size-12' style={{ color: "#FFF", backgroundColor: convertHexToRGBA(advanceDetails.estado.color, 75) }} pill>
            {advanceDetails.estado.estado}
          </Badge>
        </div>
        <Row>
          <Col md='6 text-left'>
            <h5 style={{ color: "#a6b0cf" }}>Datos de la operación</h5>
            <p style={{ lineHeight: 2.5 }}>
              <span className='mr-2'>
                <b>Fecha:</b>
              </span>
              {moment(advanceDetails.fecha).format("llll")}
              <br />
              <span className='mr-2'>
                <b>Nro. de operación:</b>
              </span>
              {advanceDetails.id ? advanceDetails.id : "Sin recibir"}
              <br />
              <span className='mr-2'>
                <b>Monto a recibir:</b>
              </span>
              {advanceDetails.montoEnvia}
              <br />
              <span className='mr-2'>
                <b>Método de pago:</b>
              </span>
              <span>
                {advanceDetails.metodoPago.nombre}
                <img className='ml-2' src={`data:image/png;base64, ${advanceDetails.metodoPago.imagen}`} alt={advanceDetails.metodoPago.nombre} width={20} />
              </span>
              <br />
              <span className='mr-2'>
                <b>Factura generada:</b>
              </span>
              <span className={`badge font-size-12 text-uppercase text-${advanceDetails.factura ? "success" : "warning"}`}>{advanceDetails.factura ? "Creada" : "Sin crear"}</span>
            </p>
          </Col>
          <Col className='text-right' md='6'>
            <h5 style={{ color: "#a6b0cf" }}>Datos del cliente</h5>
            <p style={{ lineHeight: 2.5 }}>
              <span className='mr-2'>
                <b>Nombre del usuario:</b>
              </span>
              {advanceDetails.cliente}
              <br />
              <span className='mr-2'>
                <b>Documento:</b>
              </span>
              {advanceDetails.documento}
              <br />
              <span className='mr-2'>
                <b>Teléfono:</b>
              </span>
              {advanceDetails.telefono}
              <br />
              <span className='mr-2'>
                <b>Correo electrónico:</b>
              </span>
              {advanceDetails.correo}
              <br />
              <span className='mr-2'>
                <b>Banco a enviar:</b>
              </span>
              <span>
                {advanceDetails.cuentaRecibe.nombre}
                <img className='ml-2' src={`data:image/png;base64, ${advanceDetails.cuentaRecibe.imagen}`} alt={advanceDetails.cuentaRecibe.nombre} width={20} />
              </span>
              <br />
              <span className='mr-2'>
                <b>Tipo de cuenta:</b>
              </span>
              {advanceDetails.tipoCuenta}
              <br />
              <span className='mr-2'>
                <b>Número de cuenta:</b>
              </span>
              {advanceDetails.numCuenta}
              <br />
              <span className='mr-2'>
                <b>Monto a enviar:</b>
              </span>
              {advanceDetails.montoRecibe}
            </p>
          </Col>
          <ButtonsComponent
            status={advanceDetails.estado.id}
            invoiceState={advanceDetails.factura}
            decline={setDeclineState}
            approve={setApproveState.bind(this, advanceDetails.estado.id)}
          />
          {approve && <ApproveForm approve={approveAdvance} />}
          {decline && <DeclineForm decline={declineAdvance} />}
        </Row>
      </>
    );
  }

  return (
    <Card>
      <CardBody className='text-center'>{Details}</CardBody>
    </Card>
  );
};

const ButtonsComponent = (props) => {
  const { status, invoiceState, approve, decline } = props;

  const ApproveButton =
    status === 1 || status === 7 ? (
      <Button color='success' className='mr-2' onClick={approve}>
        {status === 7 ? "Validar" : "Aprobar"}
      </Button>
    ) : null;

  const DeclineButton =
    status === 7 || status === 2 ? (
      <Button color='danger' onClick={decline}>
        Cancelar
      </Button>
    ) : null;
  const InvoiceButton = status === 3 && invoiceState ? <Button color='primary'>Generar factura</Button> : null;

  return (
    <Col className='mt-3 d-flex items-center justify-content-between'>
      {InvoiceButton}
      <div>
        {ApproveButton}
        {DeclineButton}
      </div>
    </Col>
  );
};

const mapStateToProps = (state) => {
  const { advanceDetails } = state.CashAdvance;
  return { advanceDetails };
};

export default connect(mapStateToProps, { getAdvanceDetails, approveCashAdvance })(TransactionDetails);
