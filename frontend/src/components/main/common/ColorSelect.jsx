import React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { colors } from "../../../consts/consts";

function ColorSelect({ color, setColor }) {
  const handleChange = (event) => {
    setColor(event.target.value);
  };

  return (
    <Box className="w-full">
      <FormControl fullWidth size="small">
        <InputLabel id="color-select-label">Color</InputLabel>
        <Select
          labelId="color-select-label"
          id="color"
          name="color"
          value={color}
          label="color"
          onChange={handleChange}
        >
          {colors.map((color) => {
            return (
              <MenuItem value={color.hex}>
                <p className="flex items-center gap-2">
                  <span
                    className="inline-block w-[16px] h-[16px] border rounded-full border-slate-300"
                    style={{ backgroundColor: color.hex }}
                  ></span>{" "}
                  {color.name}
                </p>
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}

export default ColorSelect;
