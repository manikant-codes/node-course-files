import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams } from "react-router-dom";
import { getPageBySlug } from "../../services/apiServices";
import { Paper } from "@mui/material";
import SubCategoryCard from "../../components/main/page/SubCategoryCard";

function Page() {
  const { slug } = useParams();
  const [page, setPage] = useState(null);

  useEffect(() => {
    getPageBySlug(slug).then((data) => {
      setPage(data.data);
    });
  }, [slug]);

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
      <Slider {...settings}>
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

      <div>
        <h2 className="text-center mt-10 text-3xl">{page.title}</h2>
        <div className="grid grid-cols-4 gap-2 mt-4">
          {page.subCategories.map((value) => {
            return <SubCategoryCard subCategory={value} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Page;
