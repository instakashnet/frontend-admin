import React from "react";
import { Col, Card, CardBody } from "reactstrap";
import { formatAmount } from "../../../../../helpers/functions";

import { SkeletonComponent } from "../../../../../components/UI/skeleton.component";

export const Received = ({ details, isLoading }) => {
  return (
    <Col lg="5" xl="4">
      <Card>
        {isLoading ? (
          <ReceivedLoading />
        ) : (
          <CardBody>
            <h5>Datos de recibido</h5>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted mb-2">Monto a recibir</p>
                <h5>{`${details.currencySentSymbol} ${formatAmount(details.amountSent)}`}</h5>
              </div>
              <div>
                <p className="text-muted mb-2">Tasa</p>
                <h5>{details.rate}</h5>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-between">
              <section>
                <p className="text-muted mb-2">Banco a recibir</p>
                <div className="mb-2 flex items-center">
                  <img src={`${process.env.PUBLIC_URL}/images/banks/${details.accToBankName.toLowerCase()}.svg`} alt={details.accToBankName} width={80} className="mr-2" />
                  <span className="text-muted">{details.currencySentSymbol}</span>
                </div>
              </section>
              <section>
                <p className="text-muted mb-2">Nro. de cuenta</p>
                <h5>{details.accountNumberTo}</h5>
              </section>
            </div>
          </CardBody>
        )}
      </Card>
    </Col>
  );
};

const ReceivedLoading = () => {
  return (
    <div className="p-3">
      <SkeletonComponent type="text" width={200} />
      <div className="flex items-center justify-between mt-2">
        <SkeletonComponent height={35} width={120} />
        <SkeletonComponent height={35} width={100} />
      </div>
      <div className="flex items-center justify-between mt-5">
        <SkeletonComponent height={35} width={100} />
        <SkeletonComponent height={35} width={180} />
      </div>
    </div>
  );
};
