import { Checkbox, Label } from "flowbite-react";
import React from "react";
import { COLORS, SIZES } from "../../../consts";

function FiltersSidebar() {
  const sizesCopy = [...SIZES];
  sizesCopy.shift();
  const colorsCopy = [...COLORS];
  colorsCopy.shift();
  return (
    <div className="p-4 border-r border-r-gray-300">
      {/* Price */}

      {/* Sizes */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Sizes</h3>
        <div className="flex flex-col gap-2">
          {sizesCopy.map((size, index) => {
            return (
              <div key={index} className="flex items-center gap-2">
                <Checkbox id={size.value} name="sizes" value={size.value} />
                <Label htmlFor={size.value} value={size.text} />
              </div>
            );
          })}
        </div>
      </div>
      {/* Colors */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Colors</h3>
        <div className="flex flex-col gap-2">
          {colorsCopy.map((color, index) => {
            return (
              <div key={index} className="flex items-center gap-2">
                <Checkbox id={color.value} name="sizes" value={color.value} />
                <label
                  className="font-semibold text-gray-900 flex items-center gap-2"
                  htmlFor={color.value}
                >
                  <span
                    className="inline-block w-4 h-4 rounded-full"
                    style={{ backgroundColor: `${color.value}` }}
                  />
                  {color.text}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FiltersSidebar;
