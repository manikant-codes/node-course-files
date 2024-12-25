import { Label, TextInput } from "flowbite-react";
import React from "react";

function MyTextInput({
  name,
  lable,
  value,
  onChange,
  type = "text",
  required = false,
  disabled = false
}) {
  return (
    <div>
      <div className="mb-2 block">
        <Label htmlFor={name} value={lable} />
      </div>
      <TextInput
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={lable}
        required={required}
        disabled={disabled}
        color="primary"
      />
    </div>
  );
}

export default MyTextInput;
