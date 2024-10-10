import React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function valuetext(value) {
  return `₹${value}`;
}

const minDistance = 10;

function PriceFilter() {
  const [value, setValue] = React.useState([0, 10]);

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
  };

  return (
    <Box className="w-full">
      <p className="text-lg">Price</p>
      <Slider
        className="!w-[80%] ml-2"
        value={value}
        onChange={handleChange}
        disableSwap
        valueLabelDisplay="auto"
        valueLabelFormat={valuetext}
      />
    </Box>
  );
}

export default PriceFilter;
