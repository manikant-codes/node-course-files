import React, { useState } from "react";

function ImageViewer({ images = [] }) {
  const [activeImg, setActiveImg] = useState(0);

  return (
    <div>
      <div className="grid grid-cols-[75px_1fr] gap-2">
        <div className="flex flex-col gap-1">
          {images.map((image, index) => {
            return (
              <div
                className="h-[75px] w-full overflow-hidden rounded-lg border border-slate-200 cursor-pointer"
                onClick={() => {
                  setActiveImg(index);
                }}
              >
                <img
                  src={image}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            );
          })}
        </div>
        <div>
          <div className="h-[400px] w-full overflow-hidden rounded-lg border border-slate-200">
            <img
              src={images[activeImg]}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageViewer;
