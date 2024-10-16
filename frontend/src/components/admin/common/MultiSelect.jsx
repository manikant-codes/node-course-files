import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

function MultiSelect({
  options,
  selected,
  fieldName,
  formState,
  setFormState,
  label
}) {
  const [selectedOptions, setSelectedOptions] = React.useState(selected || []);

  const isObject = typeof options[0] === "object";

  const handleChange = (event) => {
    const {
      target: { value }
    } = event;

    const temp = typeof value === "string" ? value.split(",") : value;

    setSelectedOptions(temp);

    setFormState({ ...formState, [fieldName]: temp });
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="multi-select-label">{label}</InputLabel>
        <Select
          labelId="multi-select-label"
          id="multi-select"
          multiple
          value={selectedOptions}
          onChange={handleChange}
          input={<OutlinedInput label={label} />}
          renderValue={(selected) => {
            if (isObject) {
              return selected
                .map((value) => {
                  return value.name;
                })
                .join(", ");
            }
            return selected.join(", ");
          }}
          MenuProps={MenuProps}
        >
          {options.map((value) => {
            return (
              <MenuItem key={isObject ? value.id : value} value={value}>
                <Checkbox
                  checked={(() => {
                    if (isObject) {
                      const found = selectedOptions.find((item) => {
                        return item.id === value.id;
                      });
                      return found;
                    }
                    return selectedOptions.includes(value);
                  })()}
                />
                <ListItemText primary={isObject ? value.name : value} />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}

export default MultiSelect;
