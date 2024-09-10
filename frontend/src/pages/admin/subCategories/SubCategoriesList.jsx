import React, { useEffect, useState } from "react";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import {
  deleteSubCategory,
  getAllSubCategories,
} from "../../../services/apiServices";
import CategoryListItem from "../../../components/admin/categories/CategoryListItem";

function SubCategoriesList() {
  const [loading, setLoading] = useState(true);
  const [subCategories, setSubCategories] = useState(null);
  const [error, setError] = useState("");

  async function fetchSubCategories() {
    try {
      const data = await getAllSubCategories();
      setSubCategories(data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSubCategories();
  }, []);

  async function handleDelete(id) {
    const userInput = window.confirm("Are your sure you want to delete this?");
    try {
      if (userInput) {
        await deleteSubCategory(id);
        alert("Deleted successfully!");
        fetchSubCategories();
      }
    } catch (error) {
      alert(`Failed to delete. Error: ${error.message}`);
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <AdminPageTitle
        text="Sub-Categories"
        hasBtn
        btnText={"Add Sub-Categories"}
        btnLink="/admin/subCategories/add"
      />
      <div>
        <ul className="flex flex-col [&>li]:border-b [&>li]:border-b-gray-300 [&>li:last-child]:border-b-0">
          {subCategories.map((subCategory) => {
            return (
              <CategoryListItem
                key={subCategory._id}
                category={subCategory}
                link={`/admin/subCategories/${subCategory._id}`}
                handleDelete={handleDelete}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default SubCategoriesList;
