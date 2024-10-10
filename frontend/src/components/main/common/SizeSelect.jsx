import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import * as React from "react";
import { sizes } from "../../../consts/consts";

function SizeSelect() {
  const [size, setSize] = React.useState("");

  const handleChange = (event) => {
    setSize(event.target.value);
  };

  return (
    <Box className="w-full">
      <FormControl fullWidth size="small">
        <InputLabel id="size-select-label">Size</InputLabel>
        <Select
          labelId="size-select-label"
          id="size"
          name="size"
          value={size}
          label="size"
          onChange={handleChange}
        >
          {sizes.map((size) => {
            return <MenuItem value={size}>{size}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </Box>
  );
}

export default SizeSelect;
