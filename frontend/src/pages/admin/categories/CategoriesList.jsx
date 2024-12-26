import React, { useEffect, useState } from "react";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import {
  deleteCategory,
  getAllCategories
} from "../../../services/apiServices";
import { Button } from "flowbite-react";
import {
  HiMiniPencilSquare,
  HiMiniTrash,
  HiArchiveBoxXMark,
  HiArrowPath,
  HiMiniExclamationTriangle
} from "react-icons/hi2";
import { toast } from "react-toastify";
import MyAlert from "../../../components/common/MyAlert";

function CategoriesList() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(null);
  const [error, setError] = useState("");

  async function fetchCategories() {
    try {
      const result = await getAllCategories();
      setCategories(result.data);
    } catch (error) {
      toast("Failed to fetch categories.", { type: "error" });
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  function handleEdit(id) {}

  async function handleDelete(id) {
    try {
      const isSure = confirm("Are you sure you want to delete this category?");

      if (!isSure) return;

      const result = await deleteCategory(id);

      if (!result.success) {
        toast("Failed to delete the category.", { type: "error" });
      }

      toast("Category deleted successfully.", { type: "error" });

      fetchCategories();
    } catch (error) {}
  }

  if (loading) return <MyAlert icon={HiArrowPath} msg="Loading..." />;
  if (error)
    return (
      <MyAlert
        color="failure"
        icon={HiMiniExclamationTriangle}
        msg={"Failed to fetch categories."}
      />
    );

  return (
    <div>
      <AdminPageTitle title="Categories" link="/admin/categories/add" />
      <div>
        {categories.length > 0 ? (
          <ul className="bg-violet-100 rounded-xl p-4 border border-violet-300">
            {categories.map((category, index) => {
              return (
                <>
                  <li className="flex items-center py-2 gap-4">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={category.image}
                      alt=""
                    />
                    <div className="grow-[1]">
                      <h3 className="text-gray-900">{category.name}</h3>
                      <p className="text-gray-500">{category.slug}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="xs" color="primary">
                        <HiMiniPencilSquare className="h-5 w-5" />
                      </Button>
                      <Button
                        size="xs"
                        color="failure"
                        onClick={() => {
                          handleDelete(category._id);
                        }}
                      >
                        <HiMiniTrash className="h-5 w-5" />
                      </Button>
                    </div>
                  </li>
                  {index < categories.length - 1 && (
                    <hr className="border-b border-b-violet-300" />
                  )}
                </>
              );
            })}
          </ul>
        ) : (
          <MyAlert icon={HiArchiveBoxXMark} msg="No categories to show." />
        )}
      </div>
    </div>
  );
}

export default CategoriesList;
