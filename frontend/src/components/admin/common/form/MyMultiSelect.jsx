import React from "react";
import { Button, Label, Select } from "flowbite-react";
import { FaTimesCircle } from "react-icons/fa";

const sizesOptions = [
  { value: "", text: "Select A Size" },
  { value: "s", text: "Small" },
  { value: "m", text: "Medium" },
  { value: "l", text: "Large" },
  { value: "xl", text: "Extra Large" }
];

function MyMultiSelect() {
  const [sizes, setSizes] = React.useState(sizesOptions);
  const [selectedSizes, setSelectedSizes] = React.useState([]);
  const [selectedSizesObjects, setSelectedSizesObjects] = React.useState([]);

  function handleAdd(e) {
    if (e.target.value === "") return;

    const selectedSizeObject = sizesOptions.find((size) => {
      return size.value === e.target.value;
    });

    setSelectedSizes([...selectedSizes, e.target.value]);
    setSelectedSizesObjects([...selectedSizesObjects, selectedSizeObject]);

    const newSizes = sizes.filter((size) => {
      if (size.value === e.target.value) {
        return false;
      }
      return true;
    });

    setSizes(newSizes);
  }

  function handleRemove(s) {
    const index = selectedSizes.indexOf(s);
    const selectedSizesCopy = [...selectedSizes];
    const selectedSizesObjectsCopy = [...selectedSizesObjects];
    selectedSizesCopy.splice(index, 1);
    selectedSizesObjectsCopy.splice(index, 1);

    const deletedSize = sizesOptions.find((size) => {
      return size.value === s;
    });

    setSizes([...sizes, deletedSize]);
    setSelectedSizes(selectedSizesCopy);
    setSelectedSizesObjects(selectedSizesObjectsCopy);
  }

  console.log("selectedSizes", selectedSizes);
  console.log("selectedSizesObjects", selectedSizesObjects);

  return (
    <div className="">
      <div className="mb-2 block">
        <Label htmlFor="sizes" value="Sizes" />
      </div>
      <Select id="sizes" name="sizes" onChange={handleAdd} required={true}>
        {sizes.map((size, index) => {
          return (
            <option key={index} value={size.value}>
              {size.text}
            </option>
          );
        })}
      </Select>
      <div className="flex flex-wrap mt-2">
        {selectedSizesObjects.map((size, index) => {
          return (
            <span
              key={index}
              className="mr-2 inline-flex items-center gap-2 bg-purple-200 border border-purple-400 rounded-full px-3 py-1"
            >
              <FaTimesCircle
                onClick={() => {
                  handleRemove(size.value);
                }}
                className="text-purple-700 cursor-pointer"
              />
              {size.text}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default MyMultiSelect;
