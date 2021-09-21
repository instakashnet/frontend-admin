import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Row, Col, Card, CardBody, CardTitle, Spinner, Button } from "reactstrap";
import { getRevenue } from "../../../store/actions";

import { RadialChart } from "./charts/radial-chart.component";
import Input from "../../../components/UI/FormItems/Input";

export const DailyEarning = ({ dispatch }) => {
  const [closinRate, setClosingRate] = useState(0.0);
  const [percentage, setPercetange] = useState(0);
  const { revenueData, isLoading } = useSelector((state) => state.revenueReducer);

  const onGetRevenue = () => {
    if (closinRate <= 0) return;
    dispatch(getRevenue(closinRate));
  };

  useEffect(() => {
    if (revenueData.totalUSD) {
      setPercetange(Math.floor((+revenueData.totalUSD / 360) * 100));
    }
  }, [revenueData]);

  return (
    <Card>
      <CardBody>
        <CardTitle className="mb-4">Ganancia generada</CardTitle>
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Spinner style={{ width: 80, height: 80 }} />
          </div>
        ) : (
          <Row>
            <Col sm="6">
              <p className="text-muted mb-1">Saldo cierre</p>
              <div className="flex flex-wrap items-center justify-between">
                <p>S/. {revenueData.initialCapitalPEN || 0}</p>
                <p>$ {revenueData.initialCapitalUSD || 0}</p>
              </div>
              <p className="text-muted mb-1">Ganancia hasta ahora</p>
              <div className="flex flex-wrap items-center justify-between">
                <p>S/. {revenueData.totalPEN || 0}</p>
                <p>$ {revenueData.totalUSD || 0}</p>
              </div>
              <p className="text-muted mb-1">Tasa de cierre</p>
              <Input name="closingRate" value={closinRate} onChange={(e) => setClosingRate(e.target.value)} />
              <Button type="button" className="btn-primary" onClick={onGetRevenue}>
                Mostrar datos
              </Button>
            </Col>
            <Col sm="6" className="mt-4 md:mt-0">
              <RadialChart percentage={percentage} />
            </Col>
          </Row>
        )}
      </CardBody>
    </Card>
  );
};
