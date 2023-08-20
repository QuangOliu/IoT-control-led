import { Col, Row } from "reactstrap";
import SalesChart from "../components/dashboard/SalesChart";
import TopCards from "../components/dashboard/TopCards";
import Controller from "../components/dashboard/Controller";
import { useEffect, useState } from "react";

const data = [
  {
    name: "Temp",
    data: [0, 31, 40, 28, 51, 42, 109, 100],
  },
  {
    name: "Humidity",
    data: [0, 11, 32, 45, 32, 34, 52, 41],
  },
  {
    name: "Brightness",
    data: [0, 11, 32, 45, 32, 34, 52, 41],
  },
];

const timeLine = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug"];

const IoT = () => {
  const [randomValue1, setRandomValue1] = useState(null);
  const [randomValue2, setRandomValue2] = useState(null);
  const [randomValue3, setRandomValue3] = useState(null);

  useEffect(() => {
    const interval1 = setInterval(() => {
      const random = Math.floor(Math.random() * 100) + 1;
      setRandomValue1(random);
    }, 2000);

    const interval2 = setInterval(() => {
      const random = Math.floor(Math.random() * 100) + 1;
      setRandomValue2(random);
    }, 2000);

    const interval3 = setInterval(() => {
      const random = Math.floor(Math.random() * 100) + 1;
      setRandomValue3(random);
    }, 2000);

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
      clearInterval(interval3);
    };
  }, []);

  return (
    <div>
      {/* Test Color */}
      {/* <Row>
        {Array.from({ length: 100 }, (_, i) => (
          <Col lg='4' key={i}>
            <TopCards
              bg='bg-light-success text-success'
              title='Profit'
              subtitle='Yearly Earning'
              earning={i + 1} // Adding 1 to start from 1 instead of 0
              icon='bi bi-wallet'
            />
          </Col>
        ))}
      </Row> */}

      {/***Top Cards***/}
      <Row>
        <Col lg='4'>
          <TopCards bg='bg-light-success text-success' title='Temp' subtitle='°C' earning={randomValue1} icon='bi bi-thermometer-half' />
        </Col>
        <Col lg='4'>
          <TopCards bg='bg-light-danger text-danger' title='Humidity' subtitle='%' earning={randomValue2} icon='bi bi-moisture' />
        </Col>
        <Col lg='4'>
          <TopCards bg='bg-light-warning text-warning' title='Brightness' subtitle='Lux' earning={randomValue3} icon='bi bi-brightness-high-fill' />
        </Col>
      </Row>
      {/***Sales & Feed***/}
      <Row>
        <Col lg='8'>
          <SalesChart seriesData={data} time={timeLine} />
        </Col>
        <Col lg='4'>
          <Row className='flex-column' style={{ height: "100%" }}>
            <Col lg='12'>
              <Controller animation='text-success' title='Light' icon='bi bi-lightbulb-fill' iconOFF='bi bi-lightbulb-off-fill' />
            </Col>
            <Col lg='12'>
              <Controller animation='text-success rotating' title='Fan' icon='bi bi-fan' />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default IoT;
