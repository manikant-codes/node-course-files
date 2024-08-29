import React, { useState } from "react";
import { Button, Checkbox, Label, Select, TextInput } from "flowbite-react";
function AddUpdateTodoForm() {
  const [formState, setFormState] = useState({
    title: "",
    priority: "A",
    dueDate: "",
    isCompleted: false,
  });

  return (
    <form className="flex flex-col gap-4">
      <div>
        <Label htmlFor="title">Todo</Label>
        <TextInput id="title" name="title" />
      </div>
      <div>
        <Label htmlFor="priority">Priority</Label>
        <Select id="priority" name="priority">
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </Select>
      </div>
      <div>
        <Label htmlFor="dueDate">Due Date</Label>
        <TextInput id="dueDate" type="date" name="dueDate" />
      </div>
      <div className="flex items-center gap-2">
        <Label htmlFor="isCompleted">Is Completed</Label>
        <Checkbox id="isCompleted" name="isCompleted" />
      </div>
      <Button pill>Submit</Button>
    </form>
  );
}

export default AddUpdateTodoForm;
