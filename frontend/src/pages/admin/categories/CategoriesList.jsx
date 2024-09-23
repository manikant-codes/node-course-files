import React, { useEffect, useState } from "react";
import CategoriesListItem from "../../../components/admin/categories/CategoriesListItem";
import TitleAdmin from "../../../components/admin/common/TitleAdmin";
import {
  deleteCategory,
  getAllCategories,
} from "../../../services/apiServices";

function CategoriesList() {
  const [categories, setCategories] = useState([]);

  async function fetchAllCategories() {
    try {
      const data = await getAllCategories();
      setCategories(data.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchAllCategories();
  }, []);

  async function handleDelete(id) {
    const answer = window.confirm("Are you sure you want to delete this?");
    try {
      if (answer) {
        const data = await deleteCategory(id);
        fetchAllCategories();
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div>
      <TitleAdmin
        title="Categories"
        btnTxt="Add Category"
        to="/admin/categories/add"
      />
      <div className="mt-8">
        {categories.map((category) => {
          return (
            <CategoriesListItem
              key={category._id}
              category={category}
              handleDelete={handleDelete}
            />
          );
        })}
      </div>
    </div>
  );
}

export default CategoriesList;
