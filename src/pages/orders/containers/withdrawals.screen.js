import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { getAllWithdrawals } from "../../../api/services/exchange.service";
import { withdrawalsColumns } from "../../../helpers/tables/columns";
import { setAlert } from "../../../store/actions";

import { Table } from "../../../components/UI/tables/table.component";

const PAGE_SIZE = 20;

export const WithdrawalsScreen = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getTableData = useCallback(
    async (search = null, pageCount = 1) => {
      setIsLoading(true);

      try {
        const tableData = await getAllWithdrawals(pageCount, search),
          withdrawals = tableData.map((withdrawal) => ({
            id: withdrawal.id,
            pedidoId: withdrawal.uuid,
            date: moment(withdrawal.createdAt).format("DD-MM-YYYY HH:mm"),
            user: withdrawal.firstName + " " + withdrawal.lastName,
            destinationBank: withdrawal.bankName.toLowerCase(),
            statusColor: withdrawal.statusColor,
            statusName: withdrawal.statusName,
            kashQty: withdrawal.kashQty + " KASH",
          }));

        setData(withdrawals);
      } catch (error) {
        dispatch(setAlert("danger", "Ha ocurrido un error obteniendo los retiros. Por favor intente más tarde."));
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    getTableData();
  }, [getTableData]);

  return (
    <div className="page-content">
      <Container fluid>
        <Row>
          <Col lg="12">
            <Card>
              <CardBody>
                <div className="table-responsive">
                  <Table
                    title="Retiros recibidos"
                    pagination={{ pageSize: PAGE_SIZE, async: true }}
                    columns={withdrawalsColumns}
                    data={data}
                    search
                    getData={getTableData}
                    isLoading={isLoading}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
