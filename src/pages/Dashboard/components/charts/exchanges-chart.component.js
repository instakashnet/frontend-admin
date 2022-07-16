import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useDispatch } from "react-redux";
import { Button, Card, CardBody, CardTitle, Spinner } from "reactstrap";
import { getCurrencyBarChart } from "../../../../store/charts/actions";

const StackedColumnChart = ({ data, title, isLoading }) => {
  const dispatch = useDispatch(),
    { buy, sell, qtyBuy, qtySell } = data,
    [type, setType] = useState("week"),
    [categories, setCategories] = useState([]);

  useEffect(() => {
    dispatch(getCurrencyBarChart(type));
  }, [dispatch, type]);

  useEffect(() => {
    if (qtyBuy?.length && qtySell?.length) {
      if (type === "week") {
        setCategories([
          { date: 0, label: "Lunes" },
          { date: 1, label: "Martes" },
          { date: 2, label: "Miercoles" },
          { date: 3, label: "Jueves" },
          { date: 4, label: "Viernes" },
          { date: 5, label: "Sábado" },
          { date: 6, label: "Domingo" },
        ]);
      }

      if (type === "month") {
        setCategories([
          { date: 0, label: "Ene" },
          { date: 1, label: "Feb" },
          { date: 2, label: "Mar" },
          { date: 3, label: "Abr" },
          { date: 4, label: "May" },
          { date: 5, label: "Jun" },
          { date: 6, label: "Jul" },
          { date: 7, label: "Ago" },
          { date: 8, label: "Sep" },
          { date: 9, label: "Oct" },
          { date: 10, label: "Nov" },
          { date: 11, label: "Dic" },
        ]);
      }
    }
  }, [type, qtyBuy, qtySell]);

  const handleGetDataByType = (type) => {
    setType(type);
    dispatch(getCurrencyBarChart(type));
  };

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "45%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },

    colors: ["#34c38f", "#556ee6"],
    xaxis: {
      type: "category",
      categories,
      labels: {
        formatter: function (value) {
          return `${value.label} C${qtyBuy ? qtyBuy[value.date] : 0} - V${qtySell ? qtySell[value.date] : 0}`;
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (value) => {
          return Number(value).toFixed(2);
        },
      },
    },
    grid: {
      borderColor: "#f1f1f1",
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex }) {
        return `<div style="padding: 7px">$ ${series[seriesIndex][dataPointIndex]}</div>`;
      },
    },
  };

  const [series, setSeries] = useState([]);

  useEffect(() => {
    if (buy || sell) {
      setSeries([
        { name: "Compras", data: buy || [] },
        { name: "Ventas", data: sell || [] },
      ]);
    }
  }, [buy, sell]);

  return (
    <Card>
      <CardBody>
        <div className="d-flex justify-content-end">
          <CardTitle className="mb-4 mr-auto float-sm-left">{title}</CardTitle>
          <Button className="mr-3" onClick={() => handleGetDataByType("week")}>
            Semana
          </Button>
          {/* <Button onClick={() => setType("month")}>Mes</Button> */}
        </div>
        {isLoading ? <Spinner size="large" color="primary" /> : <ReactApexChart options={options} series={series} type="bar" height="359" />}
      </CardBody>
    </Card>
  );
};

export default React.memo(StackedColumnChart);
