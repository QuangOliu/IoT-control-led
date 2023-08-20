import { Card, CardBody } from "reactstrap";

const TopCards = (props) => {
  const calculateColor = (value) => {
    if (value >= 70) {
      return `rgba(255, 0, 0,${(value - 70) / 30}) ,rgba(255, 0, 0, 1) `; 
    } else if (value > 30) {
      return `rgba(255, 123, 0,${(value - 40) / 30}) ,rgba(255, 123, 0, 1) `;
    } else {
      return `rgba(0, 123, 0,${(value) / 30}) ,rgba(0, 123, 0, 1) `;
    }
  };

  const earningColor = calculateColor(props?.earning);
  const gradientStyle = {
    backgroundImage: `linear-gradient(to bottom, ${earningColor})`
  };
  return (
    <Card style={gradientStyle}>
      <CardBody>
        <div className='d-flex'>
          <div className={`circle-box lg-box d-inline-block ${props.bg}`}>
            <i className={props.icon}></i>
          </div>
          <div className='ms-3'>
            <h3 className='mb-0 font-weight-bold'>{props.earning}</h3>
            <small className='text-muted'>{props.subtitle}</small>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default TopCards;
