import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import Chart from "react-apexcharts";
import { useEffect, useState } from "react";

const SalesChart = () => {
  const [iphoneData, setIphoneData] = useState([0, 31, 40, 28, 51, 42, 109, 100]);
  const [oneplusData, setOneplusData] = useState([0, 11, 32, 45, 32, 34, 52, 41]);

  useEffect(() => {
    const interval = setInterval(() => {
      // const randomValue = Math.floor(Math.random() * 100) + 1;
      // const randomValue2 = Math.floor(Math.random() * 100) + 1;
      // setIphoneData(prevData => [...prevData, randomValue]);
      // setOneplusData(prevData => [...prevData, randomValue2]);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const chartoptions = {
    series: [
      {
        name: "Iphone 13",
        data: iphoneData,
      },
      {
        name: "Oneplue 9",
        data: oneplusData,
      },
    ],
    options: {
      chart: {
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        strokeDashArray: 3,
      },

      stroke: {
        curve: "smooth",
        width: 1,
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "March",
          "April",
          "May",
          "June",
          "July",
          "Aug",
        ],
      },
    },
  };
  return (
    <Card style={{height:"100%"}}>
      <CardBody>
        <CardTitle tag="h5">Sales Summary</CardTitle>
        <CardSubtitle className="text-muted" tag="h6">
          Yearly Sales Report
        </CardSubtitle>
        <Chart
          type="area"
          width="100%"
          // height="390"
          height="auto"
          options={chartoptions.options}
          series={chartoptions.series}
        ></Chart>
      </CardBody>
    </Card>
  );
};

export default SalesChart;
