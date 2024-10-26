import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import React from "react";
import { sizes } from "../../../consts/consts";
import { useSearchParams } from "react-router-dom";

function SizesFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChange(e) {
    setSearchParams((params) => {
      let sizes = params.get("sizes");
      sizes = sizes ? sizes.split("-") : [];

      const index = sizes.indexOf(e.target.name);

      if (index >= 0) {
        sizes.splice(index, 1);
      } else {
        sizes.push(e.target.name);
      }

      if (sizes.length) {
        params.set("sizes", sizes.join("-"));
      } else {
        params.delete("sizes");
      }

      return params;
    });
  }

  return (
    <div>
      <p className="text-lg">Sizes</p>
      {sizes.map((size) => {
        return (
          <FormControlLabel
            control={<Checkbox name={size} onChange={handleChange} />}
            label={size}
          />
        );
      })}
    </div>
  );
}

export default SizesFilter;
