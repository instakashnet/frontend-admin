import React, { useState, useEffect } from "react";
import { Card, CardBody, Row, Col, Button } from "reactstrap";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { formatAmount, convertRate, checkInterplaza } from "../../../../../helpers/functions";
import { editInterplazaInit } from "../../../../../store/actions";

import CopyButton from "../../../../../components/UI/CopyButton";
import Radio from "../../../../../components/UI/FormItems/Radio";
import { SkeletonComponent } from "../../../../../components/UI/skeleton.component";

const Sent = ({ details, isLoading, isProcessing, onShowForm }) => {
  const dispatch = useDispatch(),
    [editState, setEditState] = useState(false),
    [interplaza, setInterplaza] = useState(false);

  // EFFECTS
  useEffect(() => {
    setInterplaza(!!Number(details.accToInterbank));
  }, [details]);

  // FORMIK
  const formik = useFormik({
    initialValues: { interbank: null, accountId: details.accountToId },
    enableReinitialize: true,
    onSubmit: (values) => dispatch(editInterplazaInit(values, "exchange", details.id, setEditState)),
  });

  return (
    <Col lg="5" xl="4">
      <Card>
        {isLoading ? (
          <ToSendSkeleton />
        ) : (
          <>
            <CardBody className="relative">
              <h5>Datos para enviar</h5>
              <div className="flex items-center justify-between">
                <div className="mb-2 flex items-center">
                  <img src={`${process.env.PUBLIC_URL}/images/banks/${details.bankSent?.toLowerCase()}.svg`} alt={details.bankSent} width={80} className="mr-2" />
                  <span className="text-muted">
                    {details.currencyReceivedSymbol} - {details.accTypeTo === "savings" ? "ahorros" : "corriente"}
                  </span>
                </div>
              </div>
              <button className="edit-button absolute top-3.5 right-3.5" onClick={() => onShowForm("reassign")}>
                <i className="bx bx-user-pin" />
              </button>
            </CardBody>
            <CardBody>
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
                      {`${details.currencyReceivedSymbol} ${formatAmount(details.amountReceived)}`} <CopyButton textToCopy={details.amountReceived?.toFixed(2)} />
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
                    {checkInterplaza(details.bankReceive, details.accountToRaw) && !interplaza && (
                      <small className="text-danger">* Parece ser que esta cuenta es de provincia.</small>
                    )}
                    {interplaza && <small className="text-danger">* Esta cuenta es de provincia.</small>}
                    {(checkInterplaza(details.bankReceive, details.accountToRaw) || interplaza) && (
                      <button className="text-success mt-1 block ml-auto" onClick={() => setEditState((prev) => !prev)}>
                        editar <i className="fas fa-edit" />
                      </button>
                    )}
                  </div>
                </Col>
                {details.thirdParty && (
                  <>
                    <Col sm="6" className="mt-3">
                      <p className="text-muted mb-2">Nombre del titular</p>
                      <h5>{details.thirdParty.name || details.thirdParty.razonSocial}</h5>
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
              {details.transactionCodeFinalized && (
                <Row>
                  <Col>
                    <p className="text-muted mb-2">Nro. de operación saliente</p>
                    <h5>{details.transactionCodeFinalized}</h5>
                  </Col>
                </Row>
              )}
            </CardBody>
          </>
        )}
      </Card>
    </Col>
  );
};

const ToSendSkeleton = () => {
  return (
    <div className="p-3">
      <SkeletonComponent width={150} height={35} />
      <div className="flex items-center mt-12 mb-2 justify-between">
        <SkeletonComponent width={90} height={35} />
        <SkeletonComponent width={90} height={35} />
      </div>
      <div className="flex items-center justify-between">
        <SkeletonComponent width={100} height={35} />
        <SkeletonComponent width={100} height={35} />
      </div>
    </div>
  );
};

export default React.memo(Sent);
