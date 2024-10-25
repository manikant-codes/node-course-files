import React from "react";
import { useParams } from "react-router-dom";
import CommonSlider from "../../components/common/CommonSlider";
import Loading from "../../components/common/Loading";
import MessageBox from "../../components/common/MessageBox";
import SubCategoriesRow from "../../components/main/page/SubCategoriesRow";
import TrendingProducts from "../../components/main/page/TrendingProducts";
import useFetch from "../../hooks/useFetch";
import { getPageBySlug } from "../../services/apiServices";

function Page() {
  const { categorySlug } = useParams();

  const {
    loading,
    data: page,
    error
  } = useFetch(() => {
    return getPageBySlug(categorySlug);
  }, [categorySlug]);

  if (loading) {
    return <Loading isFullPage />;
  }

  if (error) {
    return <MessageBox />;
  }

  return (
    <>
      <div className="mb-8">
        <CommonSlider>
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
        </CommonSlider>
      </div>
      <div className="flex flex-col gap-8 p-8">
        <SubCategoriesRow page={page} />
        <TrendingProducts />
      </div>
    </>
  );
}

export default Page;
