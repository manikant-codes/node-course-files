import { Label, Select } from "flowbite-react";
import React from "react";
import { FaTimesCircle } from "react-icons/fa";

function getInitialOptions(initialOptions, selectedOptions) {
  const filteredInitialOptions = initialOptions.filter((option) => {
    if (selectedOptions.includes(option.value)) {
      return false;
    }
    return true;
  });
  return filteredInitialOptions;
}

function getSlectedOptionsObjects(initialOptions, initialSelctedOptions) {
  const selectedOptionsObjects = initialOptions.filter((size) => {
    if (initialSelctedOptions.includes(size.value)) {
      return true;
    }
    return false;
  });

  return selectedOptionsObjects;
}

function MyMultiSelect({
  name,
  label,
  initialOptions,
  selectedOptions,
  setSelectedOptions
}) {
  const [options, setOptions] = React.useState(
    getInitialOptions(initialOptions, selectedOptions)
  );
  const [selectedOptionsObjects, setSelectedOptionsObjects] = React.useState(
    getSlectedOptionsObjects(initialOptions, selectedOptions)
  );

  React.useEffect(() => {
    setOptions(getInitialOptions(initialOptions, selectedOptions));
    setSelectedOptionsObjects(
      getSlectedOptionsObjects(initialOptions, selectedOptions)
    );
  }, [initialOptions, selectedOptions]);

  function handleAdd(e) {
    if (e.target.value === "") return;

    setSelectedOptions([...selectedOptions, e.target.value]);

    const selectedOptionObject = initialOptions.find((option) => {
      return option.value === e.target.value;
    });
    setSelectedOptionsObjects([
      ...selectedOptionsObjects,
      selectedOptionObject
    ]);

    const newOptions = options.filter((option) => {
      if (option.value === e.target.value) {
        return false;
      }
      return true;
    });
    setOptions(newOptions);
  }

  function handleRemove(o) {
    const index = selectedOptions.indexOf(o);
    const selectedOptionsCopy = [...selectedOptions];
    const selectedOptionsObjectsCopy = [...selectedOptionsObjects];

    selectedOptionsCopy.splice(index, 1);
    selectedOptionsObjectsCopy.splice(index, 1);
    setSelectedOptions(selectedOptionsCopy);
    setSelectedOptionsObjects(selectedOptionsObjectsCopy);

    const deletedSize = initialOptions.find((size) => {
      return size.value === o;
    });
    setOptions([...options, deletedSize]);
  }

  return (
    <div className="">
      <div className="mb-2 block">
        <Label htmlFor={name} value={label} />
      </div>
      <Select id={name} name={name} color="primary" onChange={handleAdd}>
        {options.map((size, index) => {
          return (
            <option key={index} value={size.value}>
              {size.text}
            </option>
          );
        })}
      </Select>
      <div className="flex flex-wrap mt-2">
        {selectedOptionsObjects.map((option, index) => {
          return (
            <span
              key={index}
              className="mr-2 inline-flex items-center gap-2 bg-purple-200 border border-purple-400 rounded-lg px-3 py-1"
            >
              <FaTimesCircle
                onClick={() => {
                  handleRemove(option.value);
                }}
                className="text-purple-700 cursor-pointer"
              />
              {option.text}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default MyMultiSelect;
