import React, { useState } from "react";
import { Card, CardBody, Row, Col, Button } from "reactstrap";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { formatAmount, checkInterplaza, convertRate } from "../../../../../helpers/functions";
import { editInterplazaInit } from "../../../../../store/actions";

import CopyButton from "../../../../../components/UI/CopyButton";
import Radio from "../../../../../components/UI/FormItems/Radio";

const Sent = ({ details, isLoading, isProcessing, onShowForm }) => {
  const dispatch = useDispatch();
  const [editState, setEditState] = useState(false);
  let interplaza;
  let accToInterbank;
  if (details) {
    if (checkInterplaza(details.bankSent, details.accountToRaw)) interplaza = true;
    accToInterbank = !!+details.accToInterbank;
  }

  const formik = useFormik({
    initialValues: { interbank: null, accountId: details && details.accountToId },
    enableReinitialize: true,
    onSubmit: (values) => dispatch(editInterplazaInit(values, "exchange", details.id, setEditState)),
  });

  return (
    <Card>
      <CardBody>
        <div className="flex items-center justify-between">
          <h5>Datos para enviar</h5>
          <button className="text-success" onClick={() => onShowForm("reassign")}>
            <i className="fas fa-edit" /> Reasignar
          </button>
        </div>
        {details && (
          <div className="flex items-center justify-between">
            <div className="mb-2 flex items-center">
              <img src={`${process.env.PUBLIC_URL}/images/banks/${details.bankSent.toLowerCase()}.svg`} alt={details.bankSent} width={80} className="mr-2" />
              <span className="ml-2 text-muted">
                {details.bankSent} <br />
                {details.accTypeTo === "savings" ? "Ahorros" : "Corriente"} {details.currencyReceivedSymbol}
              </span>
            </div>
          </div>
        )}
      </CardBody>
      <CardBody>
        {!isLoading && details && (
          <>
            <Row>
              <Col sm="6">
                <div>
                  <p className="text-muted mb-2">Tasa ofrecida</p>
                  <h5>{convertRate(details.rate)}</h5>
                </div>
              </Col>
              <Col sm="6">
                <div className="text-sm-right mt-4 mt-sm-0">
                  <p className="text-muted mb-2">Factura generada</p>
                  <h5 className={`${details.billAssigned ? "text-success" : "text-warning"}`}>{details.billAssigned ? "Generada" : "No generada"}</h5>
                </div>
              </Col>
            </Row>
            <Row>
              <Col sm="6">
                <div>
                  <p className="text-muted mb-2">Monto a enviar</p>
                  <h5>
                    {`${details.currencyReceivedSymbol} ${formatAmount(details.amountReceived)}`} <CopyButton textToCopy={details.amountReceived.toFixed(2)} />
                  </h5>
                </div>
              </Col>
              <Col sm="6">
                <div className="text-sm-right mt-4 mt-sm-0">
                  <p className="text-muted mb-2">Cuenta {details.thirdParty ? "de tercero" : ""} no.</p>
                  <h5>
                    {details.accountToRaw} <CopyButton textToCopy={details.accountToRaw} />
                  </h5>
                  {editState && (
                    <form onSubmit={formik.handleSubmit}>
                      <p className="text-danger">¿Esta cuenta es interplaza?</p>
                      <div className="flex justify-end">
                        <Radio name="interbank" value={"1"} onChange={formik.handleChange} label="SI" />
                        <Radio name="interbank" value={"0"} onChange={formik.handleChange} label="NO" />
                      </div>
                      <Button type="submit" className={`btn-primary ld-ext-right ${isProcessing ? "running" : ""}`} disabled={!formik.values.interbank || isProcessing}>
                        <span className="ld ld-ring ld-spin" />
                        Actualizar cuenta
                      </Button>
                    </form>
                  )}
                  {interplaza && (
                    <>
                      {!editState && details.accToInterbank === null && <small className="text-danger">* Parece que esta es una cuenta interplaza.</small>}
                      {!editState && accToInterbank && <small className="text-danger">* Cuenta interplaza.</small>}
                      <br />
                      <button className="text-success mt-2" onClick={() => setEditState((prev) => !prev)}>
                        <i className="fas fa-edit" /> Editar cuenta
                      </button>
                    </>
                  )}
                </div>
              </Col>
              {details.thirdParty && (
                <>
                  <Col sm="6" className="mt-3">
                    <p className="text-muted mb-2">Nombre del titular</p>
                    <h5>{details.thirdParty.name}</h5>
                  </Col>
                  <Col sm="6" className="mt-3">
                    <div className="text-sm-right">
                      <p className="text-muted mb-2">Documento</p>
                      <h5>
                        {details.thirdParty.documentType} {details.thirdParty.documentNumber}
                      </h5>
                    </div>
                  </Col>
                  <Col className="mt-3">
                    <p className="text-muted mb-2">Correo de contacto</p>
                    <h5>{details.thirdParty.email}</h5>
                  </Col>
                </>
              )}
            </Row>
          </>
        )}
      </CardBody>
    </Card>
  );
};

export default React.memo(Sent);
