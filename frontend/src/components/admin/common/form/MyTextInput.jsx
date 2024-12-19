import { Label, TextInput } from "flowbite-react";
import React from "react";

function MyTextInput({
  name,
  label,
  value,
  onChange,
  disabled = false,
  required = false,
  type = "text"
}) {
  return (
    <div>
      <div className="mb-2 block">
        <Label htmlFor={name} value={label} />
      </div>
      <TextInput
        id={name}
        name={name}
        type={type}
        placeholder={label}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
      />
    </div>
  );
}

export default MyTextInput;
