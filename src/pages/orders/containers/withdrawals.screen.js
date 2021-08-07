import React, { useEffect, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { setAlert } from "../../../store/actions";
import { getAllWithdrawals } from "../../../services/orders/withdrawals.service";
import { withdrawalsColumns } from "../../../helpers/tables/columns";

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
        const withdrawals = await getAllWithdrawals({ search, pageCount });
        setData(withdrawals);
      } catch (error) {
        dispatch(setAlert("danger", "Ha ocurrido un nerror obteniendo los retiros. Por favor intente más tarde."));
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
