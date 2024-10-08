import SendIcon from "@mui/icons-material/Send";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import MyFileUpload from "../../../components/admin/common/MyFileUpload";
import MyTransferList from "../../../components/admin/common/MyTransferList";
import {
  addPage,
  getAllCategories,
  getAllSubCategoriesByCategory,
  getPage,
  updatePage
} from "../../../services/apiServices";

function renderList(list, handleChange) {
  return (
    <div className="flex flex-col">
      {list?.map((value) => {
        return (
          <FormControlLabel
            control={
              <Checkbox
                onChange={(e) => {
                  handleChange(e, value);
                }}
              />
            }
            label={value.name}
          />
        );
      })}
    </div>
  );
}

function setListLeft(
  listCheckedRight,
  listRight,
  listLeft,
  formState,
  setListLeft,
  setListRight,
  setCheckedList
) {
  setListLeft([...listLeft, ...listCheckedRight]);
  const temp = listRight.filter((value) => {
    const found = listCheckedRight.find((v) => {
      return v.value === value.value;
    });
    return !found;
  });
  setListRight({
    ...formState,
    subCategories: temp
  });
  setCheckedList([]);
}

function setListRight(
  listCheckedLeft,
  listLeft,
  listRight,
  formState,
  setListRight,
  setListLeft,
  setCheckedList
) {
  setListRight({
    ...formState,
    subCategories: [...listRight, ...listCheckedLeft]
  });
  const temp = listLeft.filter((value) => {
    const found = listCheckedLeft.find((v) => {
      return v.value === value.value;
    });
    return !found;
  });
  setListLeft(temp);
  setCheckedList([]);
}

function AddUpdatePageForm() {
  const { id } = useParams();
  const isAdd = id === "add";
  const navigate = useNavigate();

  const [formState, setFormState] = useState(
    isAdd
      ? {
          name: "",
          slug: "",
          title: "",
          subCategories: [],
          images: []
        }
      : null
  );

  const [imagesURL, setImagesURL] = useState([]);
  const [categories, setCategories] = useState(null);
  const [subCategories, setSubCategories] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  useEffect(() => {
    getAllCategories()
      .then((result) => {
        setCategories(
          result.data.map((value) => {
            return { value: value._id, name: value.name };
          })
        );
      })
      .catch((error) => {
        console.log("Error: ", error.message);
      });
  }, []);

  useEffect(() => {
    if (formState?.subCategories) {
      getAllSubCategoriesByCategory(selectedCategoryId)
        .then((result) => {
          const { data } = result;
          let temp = data.map((value) => {
            return {
              value: value._id,
              name: value.name,
              category: value.categoryId._id
            };
          });
          temp = temp.filter((value) => {
            const found = formState.subCategories.find((subCategory) => {
              return subCategory.value === value.value;
            });
            if (!found) return true;
            return false;
          });
          console.log("formState?.subCategories", formState?.subCategories);
          console.log("temp", temp);
          setSubCategories(temp);
        })
        .catch((error) => {
          console.log("Error: ", error.message);
        });
    }
  }, [selectedCategoryId]);

  useEffect(() => {
    if (!isAdd) {
      getPage(id).then((data) => {
        let temp = data.data.subCategories.map((value) => {
          return {
            value: value._id,
            name: value.name,
            category: value.categoryId._id
          };
        });
        setFormState({ ...data.data, subCategories: temp });
        setImagesURL(data.data.images);
        setSelectedCategoryId(data.data.subCategories[0].categoryId);
      });
    }
  }, []);

  function handleChange(e) {
    if (e.target.name === "name") {
      const selectedCategory = categories.find((category) => {
        return category.name === e.target.value;
      });
      setFormState({
        ...formState,
        [e.target.name]: e.target.value,
        slug: e.target.value.toLowerCase().replaceAll(" ", "-")
      });
      setSelectedCategoryId(selectedCategory.value);
    } else {
      setFormState({
        ...formState,
        [e.target.name]: e.target.value
      });
    }
  }

  console.log("formState", formState);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();

    for (const key in formState) {
      if (Array.isArray(formState[key])) {
        for (const value of formState[key]) {
          if (key === "subCategories") {
            formData.append(key, value.value);
          } else {
            formData.append(key, value);
          }
        }
      } else {
        formData.append(key, formState[key]);
      }
    }

    console.log(Array.from(formData.entries()));

    try {
      if (isAdd) {
        await addPage(formData);
        alert("Page added!");
        navigate("/admin/pages");
      } else {
        await updatePage(id, formData);
        alert("Page updated!");
        navigate("/admin/pages");
      }
    } catch (error) {
      alert(error.message);
    }
  }

  if (!formState || !categories) return null;

  return (
    <div>
      <AdminPageTitle text={(isAdd ? "Add" : "Update") + " Page"} />
      <Paper
        component={"form"}
        className="p-4 mt-8 gap-4 grid grid-cols-1"
        variant="outlined"
        onSubmit={handleSubmit}
      >
        <MyFileUpload
          imagesURL={imagesURL}
          setImagesURL={setImagesURL}
          formState={formState}
          setFormState={setFormState}
        />

        {/* Remaining Form Fields */}
        <Paper
          variant="outlined"
          className="flex flex-col gap-4 overflow-hidden w-full p-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <FormControl fullWidth>
              <InputLabel id="name-label">Name</InputLabel>
              <Select
                labelId="name-label"
                id="name"
                label="Name"
                name="name"
                value={formState.name}
                onChange={handleChange}
              >
                {categories?.map((category) => {
                  return (
                    <MenuItem key={category.name} value={category.name}>
                      {category.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <TextField
              id="slug"
              label="Product Slug"
              variant="outlined"
              name="slug"
              value={formState.slug}
            />
          </div>
          <TextField
            id="title"
            label="Section Title"
            name="title"
            variant="outlined"
            onChange={handleChange}
            value={formState.title}
          />
          <MyTransferList
            listLeft={subCategories}
            listRight={formState.subCategories}
            setListLeft={(checkList, setCheckedList) => {
              setListLeft(
                checkList,
                formState.subCategories,
                subCategories,
                formState,
                setSubCategories,
                setFormState,
                setCheckedList
              );
            }}
            setListRight={(checkedList, setCheckedList) => {
              setListRight(
                checkedList,
                subCategories,
                formState.subCategories,
                formState,
                setFormState,
                setSubCategories,
                setCheckedList
              );
            }}
            renderList={renderList}
          />
          <Button type="submit" variant="contained" endIcon={<SendIcon />}>
            Send
          </Button>
        </Paper>
      </Paper>
    </div>
  );
}

export default AddUpdatePageForm;
