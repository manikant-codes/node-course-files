import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";

function CustomMultiSelect({ options, selectedOptions }) {
  function handleChange(e) {
    console.log(e.target
        
    )
  }

  return (
    <div>
      {options.map((option, index) => {
        return (
          <FormControlLabel
            key={index}
            control={<Checkbox onChange={} />}
            label={option.name}
          />
        );
      })}
    </div>
  );
}

export default CustomMultiSelect;
