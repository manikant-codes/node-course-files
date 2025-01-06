import { Button } from "flowbite-react";
import React from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { deleteCategory } from "../../../services/apiServices";

function CategoryListItem({ id, img, title, desc, fetchAllCategories }) {
  const navigate = useNavigate();

  function handleEdit() {
    console.log("Edit Category", id);
    navigate(`/admin/categories/${id}`);
  }

  async function handleDelete() {
    try {
      const choice = confirm("Are you sure you want to delete this category?");

      if (!choice) return;

      const result = await deleteCategory(id);

      if (!result.success) {
        alert("Failed to delete category.");
        return;
      }

      alert("Category deleted successfully.");

      await fetchAllCategories();
    } catch (error) {
      alert("Failed to delete category.");
    }
  }

  return (
    <li className="flex items-center">
      {/* Image */}
      <div className="w-10 h-10 rounded-full overflow-hidden mr-4">
        <img src={img} alt="" className="w-full h-full object-cover" />
      </div>
      {/* Title & Desc */}
      <div className="flex-1">
        <h3 className="font-semibold text-gray-700">{title}</h3>
        <p className="text-gray-500">{desc}</p>
      </div>
      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <Button size="sm" onClick={handleEdit}>
          <FaPen />
        </Button>
        <Button size="sm" color="failure" onClick={handleDelete}>
          <FaTrash />
        </Button>
      </div>
    </li>
  );
}

export default CategoryListItem;
