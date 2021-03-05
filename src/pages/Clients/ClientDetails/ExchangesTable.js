import React, { useEffect } from "react";
import { Card, CardBody, Badge } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { convertHexToRGBA } from "../../../helpers/functions";
import { getClientExchanges } from "../../../store/actions";
import moment from "moment";

import Table from "../../../components/UI/Table";

const ExchangesTable = (props) => {
  const { id } = props;
  const dispatch = useDispatch();

  const { exchanges, isLoading } = useSelector((state) => state.Clients);
  console.log(exchanges);

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
        title: "Envía",
      },
      {
        field: "amountReceive",
        title: "Recibe",
      },
      {
        field: "bankReceive",
        title: "Destino",
        render: (rowData) => <img height={20} src={`data:image/png;base64, ${rowData.bankReceive}`} alt='Imagen' />,
      },
      {
        field: "statusName",
        title: "Estado",
        render: (rowData) => (
          <Badge className='btn py-2 font-size-12' style={{ color: "#FFF", backgroundColor: convertHexToRGBA(rowData.statusColor, 75) }} pill>
            {rowData.statusName}
          </Badge>
        ),
      },
    ],
    rows: [],
  };

  return (
    <Card>
      <CardBody>
        <Table columns={data.columns} rows={data.rows} options={{ loadingType: "linear" }} isLoading={isLoading} />
      </CardBody>
    </Card>
  );
};

export default React.memo(ExchangesTable);
