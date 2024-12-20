import { FileInput, Label } from "flowbite-react";
import React from "react";

function MyFileUpload({ name, onChange, url }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl border border-gray-300 overflow-hidden">
        <img
          src={url || "/placeholder.svg"}
          alt=""
          className="border-none outline-none w-full h-[200px] object-cover"
        />
      </div>
      <div>
        <FileInput id={name} name={name} onChange={onChange} />
      </div>
    </div>
  );
}

export default MyFileUpload;
