import { Label, Select } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiMiniXCircle } from "react-icons/hi2";

function getFilteredOptions(initialOptions, selected) {
  const filteredOptions = initialOptions.filter((option) => {
    if (selected.includes(option.value)) {
      return false;
    }
    return true;
  });

  return filteredOptions;
}

function getSelectedOptions(initialOptions, selected) {
  const selectedOptions = initialOptions.filter((option) => {
    if (selected.includes(option.value)) {
      return true;
    }
    return false;
  });

  return selectedOptions;
}

function MyMultiSelect({
  name,
  label,
  selected,
  setSelected,
  initialOptions,
  required = false
}) {
  const filteredOptions = getFilteredOptions(initialOptions, selected);
  const initialSelectedOptions = getSelectedOptions(initialOptions, selected);

  const [options, setOptions] = useState(filteredOptions);
  const [selectedOptions, setSelectedOptions] = useState(
    initialSelectedOptions
  );

  useEffect(() => {
    setOptions(getFilteredOptions(initialOptions, selected));
    setSelectedOptions(getSelectedOptions(initialOptions, selected));
  }, [initialOptions]);

  function handleChange(e) {
    if (!e.target.value) return;

    setSelected([...selected, e.target.value]);
    setSelectedOptions([
      ...selectedOptions,
      options.find((option) => {
        return option.value === e.target.value;
      })
    ]);

    const updatedOptions = options.filter((option, index) => {
      if (option.value === e.target.value) {
        return false;
      }
      return true;
    });

    setOptions(updatedOptions);
  }

  function handleRemove(index) {
    const updatedSelected = [...selected];
    const updatedSelectedOptions = [...selectedOptions];
    const deleted = updatedSelected.splice(index, 1);
    updatedSelectedOptions.splice(index, 1);

    setSelected(updatedSelected);
    setSelectedOptions(updatedSelectedOptions);

    const deletedOption = initialOptions.find((option, index) => {
      return option.value === deleted[0];
    });
    const updatedOptions = [...options, deletedOption];
    setOptions(updatedOptions);
  }

  return (
    <div>
      <div className="mb-2 block">
        <Label htmlFor={name} value={label} />
      </div>
      <Select id={name} name={name} onChange={handleChange} required={required}>
        {options.map((option, index) => {
          return (
            <option key={index} value={option.value}>
              {option.text}
            </option>
          );
        })}
      </Select>
      <div className="flex items-center flex-wrap gap-2 mt-4">
        {selectedOptions.map((option, index) => {
          return (
            <div
              key={index}
              className="flex items-center gap-2 bg-gray-100 border border-gray-300 py-1 px-2 rounded-sm"
            >
              <HiMiniXCircle
                className="h-5 w-5 text-cyan-700 hover:text-cyan-800  cursor-pointer"
                onClick={() => {
                  handleRemove(index);
                }}
              />
              <p>{option.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyMultiSelect;
