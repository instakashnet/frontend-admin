import React, { useState, useEffect } from "react";
import { getUsersChart } from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import { Card, CardBody, CardTitle } from "reactstrap";
import ReactApexChart from "react-apexcharts";

const UsersChart = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.Charts.usersData);

  useEffect(() => {
    dispatch(getUsersChart());
  }, [dispatch]);

  const [options] = useState({
    chart: { zoom: { enabled: !1 }, toolbar: { show: !1 } },
    colors: ["#556ee6", "#34c38f"],
    dataLabels: { enabled: !0 },
    stroke: { width: [3, 3], curve: "straight" },
    grid: { row: { colors: ["transparent", "transparent"], opacity: 0.2 }, borderColor: "#f1f1f1" },
    markers: { style: "inverted", size: 6 },
    xaxis: { categories: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"], title: { text: "Mes" } },
    legend: { position: "top", horizontalAlign: "right", floating: !0, offsetY: -25, offsetX: -5 },
    responsive: [{ breakpoint: 600, options: { chart: { toolbar: { show: !1 } }, legend: { show: !1 } } }],
  });
  const [series, setSeries] = useState([{ name: "Usuarios", data: [] }]);

  useEffect(() => {
    if (data.length > 0) setSeries([{ name: "Usuarios", data }]);
  }, [data]);

  return (
    <Card>
      <CardBody>
        <CardTitle>Usuarios registrados</CardTitle>
        <ReactApexChart options={options} series={series} type='line' height='380' />
      </CardBody>
    </Card>
  );
};

export default React.memo(UsersChart);
