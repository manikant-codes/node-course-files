import React, { useEffect, useState } from "react";
import CategoryListItem from "../../../components/admin/categories/CategoryListItem";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import {
  deleteCategory,
  getAllCategories,
} from "../../../services/apiServices";
import { Button } from "@mui/material";
import Add from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

function CategoriesList() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(null);
  const [error, setError] = useState("");

  async function fetchCategories() {
    try {
      const data = await getAllCategories();
      setCategories(data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  async function handleDelete(id) {
    const userInput = window.confirm("Are your sure you want to delete this?");
    try {
      if (userInput) {
        await deleteCategory(id);
        alert("Deleted successfully!");
        fetchCategories();
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
        text="Categories"
        hasBtn
        btnText="Add Category"
        btnLink="/admin/categories/add"
      />
      <div>
        <ul className="flex flex-col [&>li]:border-b [&>li]:border-b-gray-300 [&>li:last-child]:border-b-0">
          {categories.map((category) => {
            return (
              <CategoryListItem
                key={category._id}
                category={category}
                handleDelete={handleDelete}
                link={`/admin/categories/${category._id}`}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default CategoriesList;
