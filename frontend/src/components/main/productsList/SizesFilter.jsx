import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import React from "react";
import { sizes } from "../../../consts/main";

function SizesFilter() {
  return (
    <div>
      <p className="text-lg">Sizes</p>
      {sizes.map((size) => {
        return (
          <FormControlLabel control={<Checkbox name="sizes" />} label={size} />
        );
      })}
    </div>
  );
}

export default SizesFilter;
