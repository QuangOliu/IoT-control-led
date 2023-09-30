import { Col, Row } from "reactstrap";
import SalesChart from "../components/dashboard/SalesChart";
import TopCards from "../components/dashboard/TopCards";
import Controller from "../components/dashboard/Controller";
import { useEffect, useState } from "react";

const IoT = () => {
  const [randomValue1, setRandomValue1] = useState(null);
  const [randomValue2, setRandomValue2] = useState(null);
  const [randomValue3, setRandomValue3] = useState(null);

  // useEffect(() => {
  //   const interval1 = setInterval(() => {
  //     const random = Math.floor(Math.random() * 100) + 1;
  //     setRandomValue1(random);
  //   }, 2000);

  //   const interval2 = setInterval(() => {
  //     const random = Math.floor(Math.random() * 100) + 1;
  //     setRandomValue2(random);
  //   }, 2000);

  //   const interval3 = setInterval(() => {
  //     const random = Math.floor(Math.random() * 100) + 1;
  //     setRandomValue3(random);
  //   }, 2000);

  //   return () => {
  //     clearInterval(interval1);
  //     clearInterval(interval2);
  //     clearInterval(interval3);
  //   };
  // }, []);
  const [sensorData, setSensorData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/sensor-data"); // Đảm bảo URL chính xác
        if (!response.ok) {
          throw new Error("Không thể lấy dữ liệu từ máy chủ");
        }
        const data = await response.json();
        setRandomValue1(data.sensorData[0].temperature);
        setRandomValue2(data.sensorData[0].humidity);
        setRandomValue3(data.sensorData[0].light);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    const intervalId = setInterval(() => {
      fetchData();
    }, 2000);

    // Gọi fetchData() lần đầu khi component được render
    fetchData();

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <div style={{ height: "100vh" }}>
      {/* Test Color */}
      {/* <Row>
        {Array.from({ length: 100 }, (_, i) => (
          <Col lg='4' key={i}>
            <TopCards
              title='Profit'
              subtitle='Yearly Earning'
              earning={i + 1}
              icon='bi bi-wallet'
              // low="10" mid ="20" hight="30"
            />
          </Col>
        ))}
      </Row> */}

      {/***Top Cards***/}
      <Row style={{ height: "30%" }}>
        <Col lg='4' className='mb-4'>
          <TopCards title='Temp' subtitle='°C' earning={randomValue1} icon='bi bi-thermometer-half' />
        </Col>
        <Col lg='4' className='mb-4'>
          <TopCards title='Humidity' subtitle='%' earning={randomValue2} icon='bi bi-moisture' />
        </Col>
        <Col lg='4' className='mb-4'>
          <TopCards title='Brightness' subtitle='Lux' earning={randomValue3} icon='bi bi-brightness-high-fill' />
        </Col>
      </Row>
      {/***Sales & Feed***/}
      <Row>
        <Col lg='8'>
          <SalesChart seriesData={[randomValue1, randomValue2, randomValue3]} />
        </Col>
        <Col lg='4'>
          <Row className='flex-column' style={{ height: "100%" }}>
            <Col lg='12' className='h-50'>
              <Controller cusStyle='' animation='text-success' title='Light' icon='bi bi-lightbulb-fill' iconOFF='bi bi-lightbulb-off-fill' />
            </Col>
            <Col lg='12' className='h-50'>
              <Controller cusStyle='' animation='text-success rotating' title='Fan' icon='bi bi-fan' />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default IoT;
