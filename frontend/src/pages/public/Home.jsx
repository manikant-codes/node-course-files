import React from "react";
import { getAllHomePages } from "../../services/apiServices";
import MessageBox from "../../components/common/MessageBox";
import { Spinner } from "flowbite-react";
import SubCategoryCard from "../../components/public/page/SubCategoryCard";
import Carousel from "../../components/public/page/Carousel";

function Home() {
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(null);
  const [error, setError] = React.useState("");

  async function fetchPage() {
    try {
      const result = await getAllHomePages();

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
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <MessageBox
          renderIcon={() => {
            return <Spinner />;
          }}
          message="Loading..."
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <MessageBox icon={HiExclamation} message={error} status="error" />
      </div>
    );
  }

  return (
    <div>
      <div>
        {/* Carousel */}
        <div className="mb-16">
          <Carousel images={page.images} />
        </div>

        {/* Sub-categories */}
        <div>
          <h2 className="text-4xl text-center mb-8">Shop by Categories</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-8 pt-0">
            {page.subCategories.map((subCategory) => {
              return <SubCategoryCard subCategory={subCategory} isHomePage />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
