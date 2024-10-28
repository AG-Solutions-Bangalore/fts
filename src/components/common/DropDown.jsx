import React from "react";
import { Select, Option } from "@material-tailwind/react";

const Dropdown = ({ label, options, value, onChange, required }) => {
  return (
    <div className="w-full">
      <Select
        label={label}
        value={value}
        onChange={onChange}
        required={required}
      >
        {options.map((option, index) => (
          <Option key={index} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default Dropdown;
