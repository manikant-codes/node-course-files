import React, { useEffect, useState } from "react";
import TitleAdmin from "../../../components/admin/common/TitleAdmin";
import { useNavigate } from "react-router-dom";
import {
  deleteSubCategory,
  getAllSubCategories,
} from "../../../services/apiServices";
import CategoriesListItem from "../../../components/admin/categories/CategoriesListItem";

function SubCategoriesList() {
  const [subCategories, setSubCategories] = useState([]);
  const navigate = useNavigate();

  async function fetchAllCategories() {
    try {
      const data = await getAllSubCategories();
      setSubCategories(data.data);
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
        await deleteSubCategory(id);
        fetchAllCategories();
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  function handleEdit(id) {
    navigate(`/admin/subCategories/${id}`);
  }
  return (
    <div>
      <TitleAdmin
        title="Sub-Categories"
        btnTxt="Add Sub-Category"
        to="/admin/subCategories/add"
      />
      <div className="mt-8">
        {subCategories.map((category) => {
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

export default SubCategoriesList;
