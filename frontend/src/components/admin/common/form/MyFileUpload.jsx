import { FileInput, Label } from "flowbite-react";
import React from "react";

function MyFileUpload({ name, onChange, url }) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <img src={url} alt="" className="w-full h-[200px] object-cover" />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor={name} value="Upload File" />
        </div>
        <FileInput id={name} name={name} onChange={onChange} />
      </div>
    </div>
  );
}

export default MyFileUpload;
