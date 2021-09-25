import React from "react";
import { CardBody, Card, Col } from "reactstrap";
import { formatAmount } from "../../../../../helpers/functions";

import { SkeletonComponent } from "../../../../../components/UI/skeleton.component";

export const ToSend = ({ details, isLoading }) => {
  return (
    <Col lg="5" xl="4">
      <Card>
        {isLoading ? (
          <ToSendLoading />
        ) : (
          <CardBody>
            <h5>Datos de envio</h5>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted mb-2">Monto a enviar</p>
                <h5>{`${details.currencyReceivedSymbol} ${formatAmount(details.amountReceived)}`}</h5>
              </div>
              <div>
                <p className="text-muted mb-2">Caja</p>
                <h5>{details.transactionCode.toUpperCase()}</h5>
              </div>
            </div>
            <div className="mt-5">
              <p className="text-muted mb-2">Banco que envia</p>
              <div className="mb-2 flex items-center">
                <img src={`${process.env.PUBLIC_URL}/images/banks/${details.accFromBankName.toLowerCase()}.svg`} alt={details.accFromBankName} width={80} className="mr-2" />
                <span className="text-muted">{details.currencyReceivedSymbol}</span>
              </div>
            </div>
          </CardBody>
        )}
      </Card>
    </Col>
  );
};

const ToSendLoading = () => {
  return (
    <CardBody>
      <SkeletonComponent type="text" width={200} />
      <div className="flex items-center justify-between my-6">
        <SkeletonComponent height={35} width={120} />
        <SkeletonComponent height={35} width={100} />
      </div>
      <SkeletonComponent height={35} width={180} />
    </CardBody>
  );
};
