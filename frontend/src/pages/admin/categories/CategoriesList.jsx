import { useEffect, useState } from "react";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import { getAllCategories } from "../../../services/apiServices";
import CategoryListItem from "./CategoryListItem";
import { FaCircleXmark, FaSpinner } from "react-icons/fa6";
import StatusMessage from "../../../components/common/StatusMessage";

function CategoriesList() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  async function fetchAllCategories() {
    try {
      const result = await getAllCategories();

      if (!result.success) {
        alert("Failed to fetch categories.");
        setError("Failed to fetch categories.");
      }

      setCategories(result.data);
    } catch (error) {
      alert("Failed to fetch categories.");
      setError("Failed to fetch categories.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAllCategories();
  }, []);

  if (loading) {
    return (
      <div>
        <AdminPageTitle title="Categories" link="add" />
        <StatusMessage type="loading" message="Fetching categories..." />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <AdminPageTitle title="Categories" link="add" />
        <StatusMessage type="error" message="Failed to fetch categories." />
      </div>
    );
  }

  return (
    <div>
      <AdminPageTitle title="Categories" link="add" />
      <div>
        {categories.length > 0 && (
          <ul className="bg-teal-50 border border-teal-200 p-4 rounded-lg flex flex-col gap-4">
            {categories.map((category) => {
              return (
                <CategoryListItem
                  key={category._id}
                  id={category._id}
                  img={category.image}
                  title={category.name}
                  desc={category.slug}
                  fetchAllCategories={fetchAllCategories}
                />
              );
            })}
          </ul>
        )}
        {categories.length === 0 && (
          <StatusMessage message="No categories to show." />
        )}
      </div>
    </div>
  );
}

export default CategoriesList;
