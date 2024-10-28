import React from "react";
import { Select, Option } from "@material-tailwind/react";

const DesginationDropDown = ({ label, options, onChange, value, required }) => {
  return (
    <div className="w-full">
      <Select label={label} onChange={onChange} value={value} required={required}>
        {options.map((option, index) => (
          <Option key={index} value={option.designation_type}>
            {option.designation_type}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default DesginationDropDown;
