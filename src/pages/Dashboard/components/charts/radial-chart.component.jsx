import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

export const RadialChart = ({ percentage }) => {
  const [options] = useState({
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        dataLabels: {
          name: {
            fontSize: "13px",
            color: void 0,
            offsetY: 60,
          },
          value: {
            offsetY: 22,
            fontSize: "16px",
            fontWeight: "bold",
            color: "#ccc",
            formatter: (e) => e + "%",
          },
        },
      },
    },
    colors: ["#20A2A5"],
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        shadeIntensity: 0.15,
        inverseColors: !1,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 65, 91],
      },
    },
    stroke: {
      dashArray: 4,
    },
    labels: ["Cobertura de gasto"],
  });

  const [series, setSeries] = useState([0]);

  useEffect(() => {
    if (percentage) setSeries([percentage]);
  }, [percentage]);

  return <ReactApexChart options={options} series={series} type="radialBar" height="163" />;
};
