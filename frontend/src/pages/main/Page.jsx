import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import SubCategoriesRow from "../../components/main/page/SubCategoriesRow";
import TrendingProducts from "../../components/main/page/TrendingProducts";
import { getPageBySlug } from "../../services/apiServices";

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
    slidesToScroll: 1
  };

  if (!page) return null;

  return (
    <div>
      <Slider {...settings} className="mb-14">
        {page.images.map((value) => {
          return (
            <div className="h-[500px] overflow-hidden rounded-2xl">
              <img
                className="object-cover h-full w-full rounded-2xl"
                src={value}
                alt=""
              />
            </div>
          );
        })}
      </Slider>
      <div className="flex flex-col gap-12">
        <SubCategoriesRow page={page} />
        <TrendingProducts />
      </div>
    </div>
  );
}

export default Page;
