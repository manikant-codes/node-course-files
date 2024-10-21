import { Checkbox, FormControlLabel } from "@mui/material";
import React, { useEffect, useState } from "react";

function CustomMultiSelect({ options, preSelected = [] }) {
  const [selectedOptions, setSelectedOptions] = useState(preSelected);

  useEffect(() => {
    setSelectedOptions(preSelected);
  }, [preSelected]);

  console.log("preSelected", preSelected);
  console.log("selectedOptions", selectedOptions);
  console.log("options", options);

  const handleToggle = (id) => {
    const newSelection = selectedOptions.includes(id)
      ? selectedOptions.filter((optionId) => optionId !== id)
      : [...selectedOptions, id];

    setSelectedOptions(newSelection);
  };

  if (!preSelected) return null;

  return (
    <div>
      <div>
        {options.map((option) => (
          <label key={option.id}>
            <input
              type="checkbox"
              checked={selectedOptions.includes(option.id)}
              onChange={() => handleToggle(option.id)}
            />
            {option?.name}
          </label>
        ))}
      </div>
      <div>
        <h3>Selected Options:</h3>
        <ul>
          {selectedOptions.map((id) => {
            const option = options.find((opt) => opt.id === id);
            return <li key={id}>{option?.name}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}

export default CustomMultiSelect;
