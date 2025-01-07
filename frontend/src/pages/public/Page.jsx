import { Spinner } from "flowbite-react";
import React from "react";
import { HiExclamation } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import MessageBox from "../../components/common/MessageBox";
import { getPageBySlug } from "../../services/apiServices";

function Page() {
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(null);
  const [error, setError] = React.useState("");
  const { slug } = useParams();
  const navigate = useNavigate();

  async function fetchPage() {
    try {
      const result = await getPageBySlug(slug);
      if (!result.success) {
        setError(result.msg);
        return;
      }
      setPage(result.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  function handleNavigate(subCategorySlug) {
    navigate(`/${slug}/${subCategorySlug}`);
  }

  React.useEffect(() => {
    fetchPage();
  }, [slug]);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  if (loading) {
    return (
      <MessageBox
        renderIcon={() => {
          return <Spinner />;
        }}
        message="Loading..."
      />
    );
  }

  if (error) {
    return <MessageBox icon={HiExclamation} message={error} status="error" />;
  }

  console.log("page", page);

  return (
    <div>
      {/* Carousel */}
      <div className="mb-16">
        <Slider {...settings}>
          {page.images.map((image, index) => {
            return (
              <div key={index} className="h-[400px] overflow-hidden">
                <img
                  src={image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}
        </Slider>
      </div>
      {/* Sub-categories */}
      <div>
        <h2 className="text-4xl text-center mb-8">Shop by Categories</h2>
        <div className="grid grid-cols-4 gap-4 p-8 pt-0">
          {page.subCategories.map((subCategory) => {
            return (
              <div
                className="border border-gray-300 p-4"
                onClick={() => {
                  handleNavigate(subCategory.slug);
                }}
              >
                <img
                  src={subCategory.image}
                  alt=""
                  className="h-[256px] w-full object-cover object-top mb-4"
                />

                <h3 className="text-lg ">{subCategory.name}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Page;
