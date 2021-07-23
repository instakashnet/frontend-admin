import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Card, CardBody, Badge, Button } from "reactstrap";
import { useDispatch } from "react-redux";
import moment from "moment";
import { convertHexToRGBA, formatAmount } from "../../../../../helpers/functions";
import { getClientExchanges } from "../../../../../store/actions";

import Table from "../../../../../components/UI/Table";

const ExchangesTable = ({ id, exchanges, isLoading }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClientExchanges(id));
  }, [dispatch, id]);

  const data = {
    columns: [
      {
        field: "pedidoId",
        title: "Operación",
      },
      {
        field: "date",
        title: "Fecha",
      },
      {
        field: "amountSent",
        title: "Envíado",
        render: (rowData) => (
          <div className="d-flex align-items-center">
            <span className="mr-2">{rowData.amountSent}</span>
            <img src={`${process.env.PUBLIC_URL}/images/banks/${rowData.bankReceive.toLowerCase()}.svg`} width={80} alt="banco" />
          </div>
        ),
      },
      {
        field: "amountReceive",
        title: "A recibir",
        render: (rowData) => (
          <div className="d-flex align-items-center">
            <span className="mr-2">{rowData.amountReceive}</span>
            <img src={`${process.env.PUBLIC_URL}/images/banks/${rowData.bankSent.toLowerCase()}.svg`} width={80} alt="banco" />
          </div>
        ),
      },
      {
        field: "statusName",
        title: "Estado",
        render: (rowData) => (
          <Badge className="btn py-2 font-size-12" style={{ color: "#FFF", backgroundColor: convertHexToRGBA(rowData.statusColor, 75) }} pill>
            {rowData.statusName}
          </Badge>
        ),
      },
      {
        field: "action",
        render: (rowData) => (
          <Button className="btn-rounded btn-action" onClick={() => history.push(`/exchange-details/${rowData.id}`)}>
            Ver más
          </Button>
        ),
      },
    ],
    rows: exchanges.map((order) => ({
      id: order.id,
      pedidoId: order.uuid,
      date: moment(order.created).format("DD/MM/YYYY HH:mm a"),
      amountSent: `${order.currencySentSymbol} ${formatAmount(order.amountSent)}`,
      amountReceive: `${order.currencyReceivedSymbol} ${formatAmount(order.amountReceived)}`,
      bankSent: order.bankSent,
      bankReceive: order.bankReceive,
      statusName: order.estateName,
      statusColor: order.stateColor,
    })),
  };

  return (
    <Card>
      <CardBody>
        <Table title="Cambios de divisa realizados" columns={data.columns} rows={data.rows} options={{ loadingType: "linear" }} isLoading={isLoading} />
      </CardBody>
    </Card>
  );
};

export default React.memo(ExchangesTable);