import { Spinner } from "flowbite-react";
import React from "react";
import { HiExclamation } from "react-icons/hi";
import { useParams } from "react-router-dom";
import MessageBox from "../../components/common/MessageBox";
import Carousel from "../../components/public/page/Carousel";
import SubCategoryCard from "../../components/public/page/SubCategoryCard";
import { getPageBySlug } from "../../services/apiServices";

function Page() {
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(null);
  const [error, setError] = React.useState("");
  const { slug } = useParams();

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

  React.useEffect(() => {
    fetchPage();
  }, [slug]);

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
        <Carousel images={page.images} />
      </div>
      {/* Sub-categories */}
      <div>
        <h2 className="text-4xl text-center mb-8">Shop by Categories</h2>
        <div className="grid grid-cols-4 gap-4 p-8 pt-0">
          {page.subCategories.map((subCategory) => {
            return <SubCategoryCard subCategory={subCategory} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Page;
