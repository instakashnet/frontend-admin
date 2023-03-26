import React, { useState, useEffect } from "react";
import { Card, CardBody } from "reactstrap";
import moment from "moment-timezone";
import { convertRate } from "../../../helpers/functions";
import { pricesColumns } from "../../../helpers/tables/columns";
//Components
import { Table } from "../../../components/UI/tables/table.component";

const PAGE_SIZE = 5;

const Prices = ({ rates, isLoading }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (rates.length > 0) {
      setData(
        rates.map((rate) => ({
          forex: rate.currencyOne + "/" + rate.currencyTwo,
          buy: convertRate(rate.buy),
          sell: convertRate(rate.sell),
          date: moment(rate.createdAt).format("DD/MM/YYYY HH:mm a"),
          active: !!rate.active,
        }))
      );
    }
  }, [rates]);

  return (
    <Card>
      <CardBody>
        <div className="table-responsive">
          <Table title="Lista de precios" columns={pricesColumns} data={data} isLoading={isLoading} pagination={{ pageSize: PAGE_SIZE }} />
        </div>
      </CardBody>
    </Card>
  );
};

export default Prices;
