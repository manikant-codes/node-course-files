import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import SubCategoriesRow from "../../components/main/page/SubCategoriesRow";
import TrendingProducts from "../../components/main/page/TrendingProducts";
import { getPageBySlug } from "../../services/apiServices";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { IconButton } from "@mui/material";

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

function Page() {
  const { categorySlug } = useParams();
  const [page, setPage] = useState(null);

  useEffect(() => {
    getPageBySlug(categorySlug).then((data) => {
      setPage(data.data);
    });
  }, [categorySlug]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  if (!page) return null;

  return (
    <div>
      <div className="mb-14">
        <Slider {...settings} className="relative">
          {page.images.map((value) => {
            return (
              <div className="h-[500px] overflow-hidden">
                <img
                  className="h-full w-full object-cover"
                  src={value}
                  alt={page.name}
                />
              </div>
            );
          })}
        </Slider>
      </div>
      <div className="flex flex-col gap-12 p-8">
        <SubCategoriesRow page={page} />
        <TrendingProducts />
      </div>
    </div>
  );
}

export default Page;
