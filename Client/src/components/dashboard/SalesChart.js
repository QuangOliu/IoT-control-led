import { useLayoutEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";

const SalesChart = ({ seriesData }) => {
  const [chartData, setChartData] = useState({
    temp: [],
    humi: [],
    brightness: [],
  });

  useLayoutEffect(() => {
    const newChartData = {
      temp: [...chartData.temp, seriesData[0]],
      humi: [...chartData.humi, seriesData[1]],
      brightness: [...chartData.brightness, seriesData[2]],
    };

    // Giới hạn chỉ 10 phần tử gần nhất trong mảng
    for (const key in newChartData) {
      if (newChartData[key].length > 10) {
        newChartData[key] = newChartData[key].slice(-10);
      }
    }

    setChartData(newChartData);
  }, [seriesData]);

  const chartoptions = {
    series: [
      {
        name: "Temp",
        data: chartData.temp,
      },
      {
        name: "Humi",
        data: chartData.humi,
      },
      {
        name: "Bright",
        data: chartData.brightness,
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
        curve: "straight",
        width: 1,
      },
      xaxis: {
        categories: [],
      },
    },
  };
  return (
    <Card style={{ height: "100%" }}>
      <CardBody>
        <CardTitle tag='h5'>Sales Summary</CardTitle>
        <CardSubtitle className='text-muted' tag='h6'>
          Yearly Sales Report
        </CardSubtitle>
        <Chart
          type='area'
          width='100%'
          // height="390"
          height='auto'
          options={chartoptions.options}
          series={chartoptions.series}></Chart>
      </CardBody>
    </Card>
  );
};

export default SalesChart;
