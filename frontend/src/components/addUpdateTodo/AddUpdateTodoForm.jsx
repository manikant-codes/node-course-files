import React, { useState } from "react";
import { Button, Checkbox, Label, Select, TextInput } from "flowbite-react";
import { addTodo } from "../../services/apiServices";
function AddUpdateTodoForm() {
  const [formState, setFormState] = useState({
    title: "",
    priority: "A",
    dueDate: "",
    isCompleted: false,
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  }

  function handleCheckChange(e) {
    setFormState({ ...formState, [e.target.name]: e.target.checked });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
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
  }

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
          value={formState.dueDate}
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
