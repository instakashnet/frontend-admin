import React from "react";
import { Row, Col, Card, CardBody, Badge } from "reactstrap";
import moment from "moment";
import { convertHexToRGBA } from "../../../helpers/functions";

import Breadcrumbs from "../../../components/Common/Breadcrumb";
import Table from "../../../components/UI/Table";

const AdvancesTable = (props) => {
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
        title: "Paga",
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
        field: "status",
        title: "Estado",
        render: (rowData) => (
          <Badge className='btn py-2 font-size-12' style={{ color: "#FFF", backgroundColor: convertHexToRGBA(rowData.statusColor, 75) }} pill>
            {rowData.statusName}
          </Badge>
        ),
      },
    ],
    rows:
      props.data && props.data.length > 0
        ? props.data.map((data) => ({
            pedidoId: data.pedidoId,
            date: moment(data.paymentDate).format("DD/MM/YYYY hh:mm a"),
            amountSent: data.currencyType.symbol + " " + data.amountSell,
            amountReceive: data.currencyType.symbol + " " + data.amountReceive,
            bankReceive: data.bankAccount.image,
            statusName: data.transactionState.description,
            statusColor: data.transactionState.hexaColor,
          }))
        : [],
  };

  return (
    <div className='container-fluid'>
      <Breadcrumbs title='Cliente' breadcrumbItem='Avances registrados' />

      <Row>
        <Col className='col-12'>
          <Card>
            <CardBody>
              <Table columns={data.columns} rows={data.rows} options={{ loadingType: "linear" }} isLoading={props.isLoading} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdvancesTable;
