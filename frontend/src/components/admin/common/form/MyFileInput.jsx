import React from "react";
import { FileInput, Label } from "flowbite-react";

function MyFileInput({ name, label, url, onChange }) {
  return (
    <div>
      <div className="mb-2">
        <img
          src={url || "/placeholder.svg"}
          alt=""
          className="w-full h-[256px] rounded-xl object-cover border border-gray-300"
        />
      </div>
      <div className="mb-2 block">
        <Label htmlFor={name} value={label} />
      </div>
      <FileInput id={name} name={name} color="primary" onChange={onChange} />
    </div>
  );
}

export default MyFileInput;
