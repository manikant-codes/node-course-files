import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

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
