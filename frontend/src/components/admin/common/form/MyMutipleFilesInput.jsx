import { FileInput, Label } from "flowbite-react";
import React from "react";

function MyMutipleFilesInput({ name, label, urls, onChange }) {
  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        {urls.map((url, index) => {
          return (
            <div key={index} className="mb-2">
              <img
                src={url || "/placeholder.svg"}
                alt=""
                className="w-full h-[256px] rounded-xl object-cover border border-gray-300"
              />
            </div>
          );
        })}
      </div>
      <div className="mb-2 block">
        <Label htmlFor={name} value={label} />
      </div>
      <FileInput
        id={name}
        name={name}
        multiple
        color="primary"
        onChange={onChange}
      />
    </div>
  );
}

export default MyMutipleFilesInput;
