import React from "react";
import { Card, CardBody } from "reactstrap";
import moment from "moment-timezone";

//Components
import Table from "../../../components/UI/Table";

const Prices = (props) => {
  const data = {
    columns: [
      {
        title: "Par",
        field: "forex",
        width: 160,
      },
      {
        title: "Compra",
        field: "buy",
        cellStyle: { fontWeight: "bold" },
        width: 130,
      },
      {
        title: "Venta",
        field: "sell",
        cellStyle: { fontWeight: "bold" },
        width: 130,
      },
      {
        title: "Fecha",
        field: "date",
        width: 170,
      },
    ],
    rows: [],
  };

  if (props.rates.length > 0) {
    data.rows = props.rates.map((rate) => ({
      forex: rate.currencyOne + "/" + rate.currencyTwo,
      buy: rate.buy,
      sell: rate.sell,
      date: moment(rate.createdAt).format("DD/MM/YYYY HH:mm a"),
    }));
  }

  return (
    <Card>
      <CardBody>
        <Table columns={data.columns} rows={data.rows} isLoading={props.isLoading} options={{ sorting: true, loadingType: "linear" }} />
      </CardBody>
    </Card>
  );
};

export default Prices;
