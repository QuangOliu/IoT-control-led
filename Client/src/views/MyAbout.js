import Typed from "react-typed";
import us from "../../src/assets/images/me/hoi.jpg";
function General({ data = {}, id }) {
  const { typing } = data;
  return (
    <div className='home' id={id}>
      <div className='home__content'>
        <div className='home__img'>
          <img src={us} className='rounded-circle' alt='avatar'/>
        </div>
        <div className='home__extra1'>
          <h4 className='home__hello1'>{data.hello}</h4>
          {/* <Typed strings={[...typing]} className={"home__typing"} typeSpeed={100} backSpeed={45} loop /> */}
          <div className='home__box1'></div>
          <p className='home__pagram1'>Mã Sinh Viên: B20DCCN286</p>
          <p className='home__pagram1'>{data.about}</p>
          <ul className='home__list1'>
            
          </ul> 
        </div>
      </div>
    </div>
  );
}
export default General;
