import { Card, CardBody } from "reactstrap";

const TopCards = (props) => {

  const low = props?.low || 30;
  const mid = props?.mid || 60;
  const hight = props?.hight || 90;
  
  const isBlinking = props?.earning >= hight;

  // CALCULA COLOR FOR EACH VALUE
  const calculateColor = (value) => {
    let gradientColors = "";

    if (value > mid) {
      gradientColors = `rgba(255, 0, 0, ${(value - mid) / low}), rgba(255, 0, 0, 1)`;
    } else if (value > low) {
      gradientColors = `rgba(255, 123, 0, ${(value - low) / low}), rgba(255, 123, 0, 1)`;
    } else {
      gradientColors = `rgba(0, 123, 0, ${value / low}), rgba(0, 123, 0, 1)`;
    }

    return gradientColors;
  };
  
  const calculateBG = (value) => {
    let bgColor = "";

    if (value > mid) {
      bgColor = "bg-light-danger text-danger";
    } else if (value > low) {
      bgColor = "bg-light-warning text-warning";
    } else {
      bgColor = "bg-light-success text-success";
    }
    return bgColor;
  };
  
  const earningColor = calculateColor(props?.earning);
  const gradientStyle = {
    backgroundImage: `linear-gradient(to bottom, ${earningColor})`,
  };

  return (
    
    <Card className={`${isBlinking ? "blinking" : ""}`} style={!isBlinking ? gradientStyle : {}}>
      <CardBody  height="100%" >
        <div className='d-flex'>
          <div className={`circle-box lg-box d-inline-block ${calculateBG(props?.earning)}`}>
            <i className={props.icon}></i>
          </div>
          <div className='ms-3'>
            <span>{props.earning}</span>
            <span className='text-muted m-1'>{props.subtitle}</span>
            <h6  className='mb-0 font-weight-bold'>{props.title}</h6>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default TopCards;
