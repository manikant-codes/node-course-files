import React from "react";
import { Button, Checkbox, Label, Select, TextInput } from "flowbite-react";
function AddUpdateTodoForm() {
  return (
    <form className="flex flex-col gap-4">
      <div>
        <Label>Todo</Label>
        <TextInput />
      </div>
      <div>
        <Label>Priority</Label>
        <Select>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </Select>
      </div>
      <div>
        <Label>Due Date</Label>
        <TextInput type="date" />
      </div>
      <div className="flex items-center gap-2">
        <Label>Is Completed</Label>
        <Checkbox />
      </div>
      <Button pill>Submit</Button>
    </form>
  );
}

export default AddUpdateTodoForm;
