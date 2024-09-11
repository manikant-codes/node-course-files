import React, { useEffect, useState } from "react";
import { Button, Checkbox, Label, Select, TextInput } from "flowbite-react";
import { addTodo, getSingleTodo, updateTodo } from "../../services/apiServices";
import { useParams } from "react-router-dom";

// const sampleTodoFromDB = {
//   _id: "66c5e26a6b467d8d905b295b",
//   title: "Revise React",
//   isCompleted: false,
//   priority: "A",
//   date: "2024-08-21T12:49:46.095Z",
//   __v: 0,
// };

function AddUpdateTodoForm() {
  const { id } = useParams();

  const addKarnaHai = id === "add" ? true : false;

  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState(
    addKarnaHai
      ? {
          title: "",
          priority: "A",
          dueDate: "",
          isCompleted: false
        }
      : null
  );

  useEffect(() => {
    if (!addKarnaHai) {
      getSingleTodo(id).then((data) => {
        setFormState(data.data);
      });
    }
  }, []);

  function handleChange(e) {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  }

  function handleCheckChange(e) {
    setFormState({ ...formState, [e.target.name]: e.target.checked });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (addKarnaHai) {
      addTodo(formState)
        .then((data) => {
          alert("Task added!");
        })
        .catch((error) => {
          alert("Failed to add task!");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      updateTodo(formState._id, formState)
        .then((data) => {
          alert("Task updated!");
        })
        .catch((error) => {
          alert("Failed to update task!");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  if (!formState) return <>Loading...</>;

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="title">Todo</Label>
        <TextInput
          id="title"
          name="title"
          value={formState.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="priority">Priority</Label>
        <Select
          id="priority"
          name="priority"
          value={formState.priority}
          onChange={handleChange}
        >
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </Select>
      </div>
      <div>
        <Label htmlFor="dueDate">Due Date</Label>
        <TextInput
          id="dueDate"
          type="date"
          name="dueDate"
          value={
            formState.dueDate
              ? new Date(formState.dueDate).toISOString().split("T")[0]
              : formState.dueDate
          }
          onChange={handleChange}
        />
      </div>
      <div className="flex items-center gap-2">
        <Label htmlFor="isCompleted">Is Completed</Label>
        <Checkbox
          id="isCompleted"
          name="isCompleted"
          checked={formState.isCompleted}
          onChange={handleCheckChange}
        />
      </div>
      <Button pill type="submit" isProcessing={loading}>
        Submit
      </Button>
    </form>
  );
}

export default AddUpdateTodoForm;
