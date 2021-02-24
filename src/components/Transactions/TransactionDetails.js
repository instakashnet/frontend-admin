import React, { useEffect } from "react";
import moment from "moment";
import "moment/min/locales";
import { connect } from "react-redux";
import { getAdvanceDetails, approveCashAdvance } from "../../store/actions";
import { convertHexToRGBA } from "../../helpers/functions";
import { Card, CardBody, Spinner, Badge, Row, Col, Button } from "reactstrap";

moment.locale("es-mx");

const TransactionDetails = (props) => {
  const { id, getAdvanceDetails, advanceDetails, isLoading, approveCashAdvance } = props;

  useEffect(() => {
    if (!isNaN(id)) getAdvanceDetails(id);
  }, [getAdvanceDetails, id]);

  let Details = null;

  if (isLoading) Details = <Spinner color='#fff' />;

  if (!isLoading && advanceDetails) {
    Details = (
      <>
        <div className='invoice-title d-flex justify-content-between align-items-center mb-4'>
          <h4 className='font-size-16'>
            <span>Solicitud # {advanceDetails.operacion}</span>
          </h4>
          <Badge
            className='btn py-2 font-size-12'
            style={{
              color: advanceDetails.estado.color,
              backgroundColor: convertHexToRGBA(advanceDetails.estado.color, 10),
              marginTop: 5,
            }}
            pill
          >
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
            </p>
          </Col>
          <Col className='mt-3 text-right'>
            {(advanceDetails.estado.id === 1 || advanceDetails.estado.id === 7) && (
              <Button color='success' className='mr-2' onClick={approveCashAdvance.bind(null, id)}>
                {advanceDetails.estado.id === 7 ? "Validar" : "Aprobar"}
              </Button>
            )}
            {(advanceDetails.estado.id === 7 || advanceDetails.estado.id === 2) && <Button color='danger'>Cancelar</Button>}
            {advanceDetails.estado.id === 3 && !advanceDetails.factura ? <Button color='primary'>Generar factura</Button> : null}
          </Col>
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

const mapStateToProps = (state) => {
  const { advanceDetails } = state.CashAdvance;
  return { advanceDetails };
};

export default connect(mapStateToProps, { getAdvanceDetails, approveCashAdvance })(TransactionDetails);
