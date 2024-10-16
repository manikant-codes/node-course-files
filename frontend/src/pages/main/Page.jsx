import React, { useEffect, useState } from "react";
import { getPageBySlug } from "../../services/apiServices";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SubCategoryCard from "../../components/main/page/SubCategoryCard";

function Page() {
  const { categorySlug } = useParams();
  const [page, setPage] = useState(null);

  console.log(page);

  useEffect(() => {
    getPageBySlug(categorySlug)
      .then((data) => {
        setPage(data.data);
      })
      .catch((error) => {});
  }, [categorySlug]);

  if (!page) return null;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="flex flex-col gap-10">
      <div>
        <Slider {...settings}>
          {page.images.map((url, index) => {
            return (
              <div key={index} className="rounded-lg h-[400px] overflow-hidden">
                <img src={url} className="h-full w-full object-cover" />
              </div>
            );
          })}
        </Slider>
      </div>
      <div>
        <h2 className="text-center text-3xl mb-8">Shop by Category</h2>
        <div className="grid grid-cols-4 gap-2">
          {page.subCategories.map((subCategory) => {
            return (
              <SubCategoryCard
                key={subCategory._id}
                subCategory={subCategory}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Page;
