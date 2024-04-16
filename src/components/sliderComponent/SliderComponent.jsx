
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Image } from 'antd';

const SliderComponents = ({ arrImg }) => {
  const settings = {
    dots: true,
    infinite: true, // chạy liên tục
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  };

  return (
    <div>
      <div style={{ width: '100%' }}>
        <Slider {...settings}>
          {arrImg.map((item, index) => (
            <div key={index}>
              <Image src={item} alt="slider" preview={false} width='100%'  />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default SliderComponents;