import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const StackedColumnChart = (props) => {
  const { soles, dolares } = props.data;

  const [options] = useState({
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
      categories: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
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
  });

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

  return <ReactApexChart options={options} series={series} type='bar' height='359' />;
};

export default React.memo(StackedColumnChart);
