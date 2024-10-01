import React, { useEffect, useState } from "react";
import CategoriesListItem from "../../../components/admin/categories/CategoriesListItem";
import TitleAdmin from "../../../components/admin/common/TitleAdmin";
import {
  deleteCategory,
  getAllCategories,
} from "../../../services/apiServices";
import { useNavigate } from "react-router-dom";

function CategoriesList() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

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
        await deleteCategory(id);
        fetchAllCategories();
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  function handleEdit(id) {
    navigate(`/admin/categories/${id}`);
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
              handleEdit={handleEdit}
            />
          );
        })}
      </div>
    </div>
  );
}

export default CategoriesList;
