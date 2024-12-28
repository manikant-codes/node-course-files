import { FileInput } from "flowbite-react";
import React from "react";

function MyMultipleFileUpload({ name, urls, onChange }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-4 gap-4">
        {urls.map((url, index) => {
          return (
            <div
              key={index}
              className="rounded-xl border border-gray-300 overflow-hidden"
            >
              <img
                src={url || "/placeholder.svg"}
                alt=""
                className="border-none outline-none w-full h-[200px] object-cover"
              />
            </div>
          );
        })}
      </div>
      <div>
        <FileInput id={name} name={name} multiple={true} onChange={onChange} />
      </div>
    </div>
  );
}

export default MyMultipleFileUpload;
