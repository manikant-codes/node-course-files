import { Label, Textarea } from "flowbite-react";
import React from "react";

function MyTextArea({
  name,
  label,
  value,
  onChange,
  required = false,
  rows = 4
}) {
  return (
    <div>
      <div className="mb-2 block">
        <Label htmlFor={name} value={label} />
      </div>
      <Textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={label}
        required={required}
        rows={rows}
        color="primary"
      />
    </div>
  );
}

export default MyTextArea;
