import React from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import moment from "moment-timezone";
import { formatAmount } from "../../../../../helpers/functions";

import CopyButton from "../../../../../components/UI/CopyButton";

const Received = ({ isLoading, details, onShowForm }) => {
  return (
    <Card>
      <CardBody>
        <Row>
          {details && (
            <>
              <Col sm="8">
                <div>
                  <div>
                    <h5>
                      Pedido {details.uuid} <CopyButton textToCopy={details.uuid} />
                    </h5>
                    <p className="text-muted mb-1">Creada el: {moment(details.created).format("DD/MM/YYYY HH:mm a")}</p>
                    {details.completedAt && <p className="text-muted mb-1">En proceso desde: {moment(details.completedAt).format("DD/MM/YYYY HH:mm a")}</p>}
                    {details.fundsOrigin && <p className="text-muted mb-0">Origen de fondos: {details.fundsOrigin}</p>}
                  </div>
                </div>
              </Col>
              {details.stateId !== 6 && details.stateId !== 5 && (
                <Col sm="4" className="d-flex justify-content-end align-items-start">
                  <button className="text-success" onClick={() => onShowForm("edit")}>
                    <i className="fas fa-edit" /> Editar
                  </button>
                </Col>
              )}
            </>
          )}
        </Row>
      </CardBody>
      <CardBody>
        {!isLoading && details && (
          <Row>
            <Col sm="6">
              <div>
                <p className="text-muted mb-2">Nro. de transferencia</p>
                <h5>
                  {details.amountSent > 0 ? (
                    details.transactionCode ? (
                      <>
                        {details.transactionCode} <CopyButton textToCopy={details.transactionCode} />
                      </>
                    ) : (
                      "Sin nro. de transferencia"
                    )
                  ) : (
                    "Kash usados"
                  )}
                </h5>
              </div>
            </Col>
          </Row>
        )}
        {!isLoading && details && (
          <Row>
            <Col sm="6">
              <div>
                <p className="text-muted mb-2">Monto recibido</p>
                {details.kashUsed > 0 && (
                  <div className="mt-4 mt-sm-0">
                    <h5>{details.kashUsed} KASH</h5>
                  </div>
                )}
                {details.amountSent > 0 && <h5>{`${details.currencySentSymbol} ${formatAmount(details.amountSent)}`}</h5>}
              </div>
            </Col>
            <Col sm="6">
              <div className="text-sm-right mt-4 mt-sm-0">
                <p className="text-muted mb-2">Envía desde</p>
                <h5 className="flex items-center justify-end">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/banks/${details.amountSent > 0 ? details.bankReceive.toLowerCase() : "kash"}.svg`}
                    alt={details.bankReceive}
                    width={details.amountSent > 0 ? 80 : 50}
                  />
                  <span className="ml-2 text-muted">{details.amountSent > 0 ? `${details.bankReceive} ${details.currencySentSymbol}` : "KASH"}</span>
                </h5>
              </div>
            </Col>
            {details.couponName && (
              <Col sm="6">
                <div className="mt-4 mt-sm-0">
                  <p className="text-muted mb-2">Cupón usado</p>
                  <h5>{details.couponName}</h5>
                </div>
              </Col>
            )}
          </Row>
        )}
      </CardBody>
    </Card>
  );
};

export default React.memo(Received);
