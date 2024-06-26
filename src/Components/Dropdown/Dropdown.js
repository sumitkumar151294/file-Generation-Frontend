import React from 'react';

const Dropdown = ({ field, form, options, ...props }) => {
  const handleChange = (event) => {
    form.setFieldValue(field.name, event.target.value);
  };

  return (
    <select {...field} {...props} onChange={handleChange}>
      <option value="">Select</option>
      {options.map((option) => (
        <option key={option?.value} value={option?.value}>
          {option?.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
