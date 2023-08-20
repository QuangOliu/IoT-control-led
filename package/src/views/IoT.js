import { Col, Row } from "reactstrap";
import SalesChart from "../components/dashboard/SalesChart";
import TopCards from "../components/dashboard/TopCards";

const IoT = () => {
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
          <TopCards bg='bg-light-success text-success' title='Profit' subtitle='Yearly Earning' earning='29' icon='bi bi-wallet' />
        </Col>
        <Col lg='4'>
          <TopCards bg='bg-light-danger text-danger' title='Refunds' subtitle='Refund given' earning='41' icon='bi bi-coin' />
        </Col>
        <Col lg='4'>
          <TopCards bg='bg-light-warning text-warning' title='New Project' subtitle='Yearly Project' earning='80' icon='bi bi-basket3' />
        </Col>
      </Row>
      {/***Sales & Feed***/}
      <Row>
        <Col lg='8'>
          <SalesChart />
        </Col>
        <Col lg='4'>
          <Row className='flex-column' style={{ height: "100%" }}>
            <Col lg='12' style={{ flex: 1 }}>
              <TopCards bg='bg-light-success text-success' title='Profit' subtitle='Yearly Earning' earning='21' icon='bi bi-wallet' />
            </Col>
            <Col lg='12' style={{ flex: 1 }}>
              <TopCards bg='bg-light-danger text-danger' title='Refunds' subtitle='Refund given' earning='1' icon='bi bi-coin' />
            </Col>
            <Col lg='12' style={{ flex: 1 }}>
              <TopCards bg='bg-light-warning text-warning' title='New Project' subtitle='Yearly Project' earning='456' icon='bi bi-basket3' />
            </Col>
            <Col lg='12' style={{ flex: 1 }}>
              <TopCards bg='bg-light-warning text-warning' title='New Project' subtitle='Yearly Project' earning='456' icon='bi bi-basket3' />
            </Col>
            <Col lg='12' style={{ flex: 1 }}>
              <TopCards bg='bg-light-warning text-warning' title='New Project' subtitle='Yearly Project' earning='456' icon='bi bi-basket3' />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default IoT;
