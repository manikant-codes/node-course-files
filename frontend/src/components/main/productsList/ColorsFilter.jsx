import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { colors } from "../../../consts/consts";
import { useSearchParams } from "react-router-dom";

function ColorsFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChange(e) {
    setSearchParams((params) => {
      let colors = params.get("colors");
      colors = colors ? colors.split("-") : [];

      const index = colors.indexOf(e.target.name);

      if (index >= 0) {
        colors.splice(index, 1);
      } else {
        colors.push(e.target.name);
      }

      if (colors.length) {
        params.set("colors", colors.join("-"));
      } else {
        params.delete("colors");
      }

      return params;
    });
  }

  return (
    <div>
      <p className="text-lg">Colors</p>
      {colors.map((color) => {
        return (
          <FormControlLabel
            control={<Checkbox name={color.name} onChange={handleChange} />}
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
