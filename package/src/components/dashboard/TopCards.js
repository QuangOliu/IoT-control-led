import { Card, CardBody } from "reactstrap";

const TopCards = (props) => {

  const calculateColor = (value) => {
    let gradientColors = "";

    if (value >= 70) {
      gradientColors = `rgba(255, 0, 0, ${(value - 70) / 30}), rgba(255, 0, 0, 1)`;
    } else if (value > 30) {
      gradientColors = `rgba(255, 123, 0, ${(value - 40) / 30}), rgba(255, 123, 0, 1)`;
    } else {
      gradientColors = `rgba(0, 123, 0, ${value / 30}), rgba(0, 123, 0, 1)`;
    }

    return gradientColors;
  };

  const calculateBG = (value) => {
    let bgColor = "";

    if (value >= 70) {
      bgColor = "bg-light-danger text-danger";
    } else if (value > 30) {
      bgColor = "bg-light-warning text-warning";
    } else {
      bgColor = "bg-light-success text-success";
    }

    // setBg(bgColor);
    return bgColor;
  };

  const earningColor = calculateColor(props?.earning);
  const gradientStyle = {
    backgroundImage: `linear-gradient(to bottom, ${earningColor})`,
  };
  const isBlinking = props?.earning >= 100;

  return (
    <Card className={`${isBlinking ? "blinking" : ""}`} style={!isBlinking ? gradientStyle : {}}>
      <CardBody>
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
