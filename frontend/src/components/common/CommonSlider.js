import React from "react";
import Slider from "react-slick";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IconButton from "@mui/material/IconButton";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

function NextArrow({ onClick }) {
  return (
    <IconButton
      onClick={onClick}
      className="!absolute !bg-white z-10 top-[50%] right-[20px] translate-y-[-50%]"
    >
      <ArrowForwardIosIcon />
    </IconButton>
  );
}

function PrevArrow({ onClick }) {
  return (
    <IconButton
      onClick={onClick}
      className="!absolute !bg-white top-[50%] left-[20px] translate-y-[-50%] z-10"
    >
      <ArrowBackIosNewIcon />
    </IconButton>
  );
}

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />
};

function CommonSlider({ children }) {
  return (
    <Slider {...settings} className="relative">
      {children}
    </Slider>
  );
}

export default CommonSlider;
