import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrencyBarChart } from "../../store/charts/actions";
import ReactApexChart from "react-apexcharts";
import { Button, Card, CardBody, CardTitle } from "reactstrap";

const StackedColumnChart = (props) => {
  const dispatch = useDispatch();
  const { soles, dolares } = props.data;
  const [type, setType] = useState("week");
  const [categories, setCategories] = useState(["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"]);

  useEffect(() => {
    dispatch(getCurrencyBarChart(type));
  }, [dispatch, type]);

  useEffect(() => {
    type === "week"
      ? setCategories(["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"])
      : setCategories(["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]);
  }, [type]);

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

    colors: ["#34c38f", "#556ee6", "#f46a6a"],
    xaxis: {
      categories,
    },
    yaxis: {
      title: {
        text: "Montos cambiados",
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
        return `<div style="padding: 7px">${seriesIndex === 1 ? "$ " : "s/. "} ${series[seriesIndex][dataPointIndex]}</div>`;
      },
    },
  };

  const [series, setSeries] = useState([]);

  useEffect(() => {
    if (soles || dolares) {
      setSeries([
        {
          name: "Soles",
          data: soles || [],
        },
        {
          name: "Dólares",
          data: dolares || [],
        },
      ]);
    }
  }, [soles, dolares]);

  return (
    <Card>
      <CardBody>
        <div className='d-flex justify-content-end'>
          <CardTitle className='mb-4 mr-auto float-sm-left'>{props.title}</CardTitle>
          <Button className='mr-3' onClick={() => setType("week")}>
            Semana
          </Button>
          <Button onClick={() => setType("month")}>Mes</Button>
        </div>
        <ReactApexChart options={options} series={series} type='bar' height='359' />
      </CardBody>
    </Card>
  );
};

export default React.memo(StackedColumnChart);
