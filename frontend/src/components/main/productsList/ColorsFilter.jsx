import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const colors = [
  { hex: "#000000", name: "Black" },
  { hex: "#ffffff", name: "White" },
  { hex: "#fcbe03", name: "Yellow" },
  { hex: "#fc2803", name: "Red" },
  { hex: "#057df5", name: "Blue" },
  { hex: "#f505b1", name: "Pink" }
];

function ColorsFilter() {
  return (
    <div>
      <p className="text-lg">Colors</p>
      {colors.map((color) => {
        return (
          <FormControlLabel
            control={<Checkbox name="colors" />}
            label={
              <span className="inline-flex gap-1 items-center">
                <span
                  className="inline-block w-[16px] border border-gray-500 h-[16px] rounded-full"
                  style={{ backgroundColor: color.hex }}
                ></span>
                <span>{color.name}</span>
              </span>
            }
          />
        );
      })}
    </div>
  );
}

export default ColorsFilter;
