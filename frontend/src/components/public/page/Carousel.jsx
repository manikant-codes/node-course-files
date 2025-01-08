import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

function Carousel({ images }) {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <Slider {...settings}>
      {images.map((image, index) => {
        return (
          <div key={index} className="h-[400px] overflow-hidden">
            <img src={image} alt="" className="w-full h-full object-cover" />
          </div>
        );
      })}
    </Slider>
  );
}

export default Carousel;
