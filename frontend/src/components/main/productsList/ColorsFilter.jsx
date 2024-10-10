import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { colors } from "../../../consts/consts";

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
