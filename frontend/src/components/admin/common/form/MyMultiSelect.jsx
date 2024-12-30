import { Badge, Button, Label, Select } from "flowbite-react";
import { HiMiniXCircle } from "react-icons/hi2";
import React, { useState } from "react";

const initialOptions = [
  { value: "", text: "Select A Size" },
  { value: "xs", text: "XS" },
  { value: "s", text: "S" },
  { value: "m", text: "M" },
  { value: "l", text: "L" },
  { value: "xl", text: "XL" },
  { value: "xxl", text: "XXL" },
  { value: "xxxl", text: "XXXL" }
];

const initialSelected = ["xs", "s", "m"];

function MyMultiSelect() {
  const [options, setOptions] = useState(() => {
    return initialOptions.filter((option) => {
      if (initialSelected.includes(option.value)) {
        return false;
      }
      return true;
    });
  });

  const [selected, setSelected] = React.useState(initialSelected);

  function handleChange(e) {
    if (e.target.value) {
      setSelected([...selected, e.target.value]);

      const updatedOptions = options.filter((value, index) => {
        return value.value !== e.target.value;
      });

      setOptions(updatedOptions);
    }
  }

  function handleRemove(index) {
    const newSelected = [...selected];
    const deleted = newSelected.splice(index, 1);

    const deletedOption = initialOptions.find((option, index) => {
      return option.value === deleted[0];
    });
    const updatedOptions = [...options, deletedOption];

    setSelected(newSelected);
    setOptions(updatedOptions);
  }

  console.log("selected", selected);

  return (
    <div>
      <div className="mb-2 block">
        <Label htmlFor="myMultiSelect" value={"My Multi Select"} />
      </div>
      <Select
        id={"myMultiSelect"}
        name={"myMultiSelect"}
        // value={}
        onChange={handleChange}
        required={false}
      >
        {options.map((option) => {
          return <option value={option.value}>{option.text}</option>;
        })}
      </Select>
      <div className="flex items-center gap-2 mt-4">
        {selected.map((value, index) => {
          return (
            <div className="flex items-center gap-2 bg-gray-100 border border-gray-300 py-1 px-2 rounded-sm">
              <HiMiniXCircle
                className="h-5 w-5 text-cyan-700 hover:text-cyan-800  cursor-pointer"
                onClick={() => {
                  handleRemove(index);
                }}
              />
              <p>{value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyMultiSelect;
