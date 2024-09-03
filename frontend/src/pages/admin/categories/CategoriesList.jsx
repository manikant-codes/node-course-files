import React, { useEffect, useState } from "react";
import CategoryListItem from "../../../components/admin/categories/CategoryListItem";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import { getAllCategories } from "../../../services/apiServices";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Link } from "react-router-dom";

function CategoriesList() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllCategories()
      .then((data) => {
        setCategories(data.data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <AdminPageTitle text="Categories" />
        <Button
          component={Link}
          to="/admin/categories/add"
          variant="contained"
          startIcon={<Add />}
        >
          Add Category
        </Button>
      </div>
      <div>
        <ul className="flex flex-col [&>li]:border-b [&>li]:border-b-gray-300 [&>li:last-child]:border-b-0">
          {categories.map((category) => {
            return <CategoryListItem key={category._id} category={category} />;
          })}
        </ul>
      </div>
    </div>
  );
}

export default CategoriesList;
