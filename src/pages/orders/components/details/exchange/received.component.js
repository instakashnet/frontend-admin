import moment from "moment-timezone";
import { memo } from "react";
import { Card, CardBody, Col } from "reactstrap";
// HELPERS
import { formatAmount } from "../../../../../helpers/functions";
// COMPONENTS
import CopyButton from "../../../../../components/UI/CopyButton";
import { SkeletonComponent } from "../../../../../components/UI/skeleton.component";

const Received = ({ details, isLoading, onShowForm }) => {
  return (
    <Col lg="5" xl="4">
      <Card>
        {isLoading ? (
          <ReceivedSkeleton />
        ) : (
          <>
            <CardBody className="relative">
              <h5>
                Pedido {details.uuid} <CopyButton textToCopy={details.uuid} />
              </h5>
              <p className="text-muted mb-1">Creada: {moment(details.created).format("DD/MM/YYYY HH:mm a")}</p>
              {details.completedAt && <p className="text-muted mb-1">En proceso desde: {moment(details.completedAt).format("DD/MM/YYYY HH:mm a")}</p>}
              {details.finalizedAt && <p className="text-muted mb-1">Procesada en: {moment(details.finalizedAt).format("DD/MM/YYYY HH:mm a")}</p>}
              {details.fundsOrigin && <p className="text-muted mb-0">Origen de fondos: {details.fundsOrigin}</p>}
            </CardBody>
            <CardBody className="flex flex-wrap justify-between items-center">
              <div>
                <div className="flex justify-between">
                  <p className="text-muted mb-2">Nro. de transferencia</p>
                  {details.stateInfo.stateId !== 6 && details.stateInfo.stateId !== 5 && (
                    <button className="edit-button ml-3" onClick={() => onShowForm("edit", "transferNumber")}>
                      <i className="bx bx-edit" />
                    </button>
                  )}
                </div>
                {details.amountSent > 0 ? (
                  <h5>
                    {details.transactionCode ? (
                      <>
                        {details.transactionCode} <CopyButton textToCopy={details.transactionCode} />
                      </>
                    ) : (
                      "Sin nro. de transferencia"
                    )}
                  </h5>
                ) : (
                  <h5>KASH usados</h5>
                )}
              </div>
              <div>
                <div className="flex justify-between">
                  <p className="text-muted mb-2">Monto recibido</p>
                  {details.stateInfo.stateId !== 6 && details.stateInfo.stateId !== 5 && (
                    <button className="edit-button ml-3" onClick={() => onShowForm("edit", "amountReceived")}>
                      <i className="bx bx-edit" />
                    </button>
                  )}
                </div>
                {details.kashInfo.kashUsed > 0 && (
                  <div className="mt-4 mt-sm-0">
                    <h5>{details.kashInfo.kashUsed} KASH</h5>
                  </div>
                )}
                {details.amountSent > 0 && <h5>{`${details.currencyInfo.currencySentSymbol} ${formatAmount(details.amountSent)}`}</h5>}
              </div>
              <div className="mt-4 w-50">
                <p className="text-muted mb-2">Envía desde</p>
                <h5 className="flex items-center">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/banks/${details.amountSent > 0 ? details.banksInfo.bankFromName.toLowerCase() : "kash"}.svg`}
                    alt={details.banksInfo.bankFromName}
                    width={details.amountSent > 0 ? 80 : 50}
                  />
                  <span className="ml-2 text-muted">{details.amountSent > 0 ? details.currencyInfo.currencySentSymbol : "KASH"}</span>
                </h5>
              </div>
              {details.couponName && (
                <div className="mt-4">
                  <p className="text-muted mb-2">Cupón usado</p>
                  <h5>{details.couponName}</h5>
                </div>
              )}
            </CardBody>
          </>
        )}
      </Card>
    </Col>
  );
};

const ReceivedSkeleton = () => {
  return (
    <div className="p-3">
      <SkeletonComponent height={35} width={190} />
      <SkeletonComponent height={35} width={230} />
      <SkeletonComponent height={35} width={260} />
      <div className="flex items-center my-4 justify-between">
        <SkeletonComponent height={35} width={120} />
        <SkeletonComponent height={35} width={80} />
      </div>
      <SkeletonComponent height={35} width={100} />
    </div>
  );
};

export default memo(Received);
