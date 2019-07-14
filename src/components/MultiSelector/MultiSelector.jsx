import React from 'react';
import chroma from 'chroma-js';
import Select from 'react-select';

const colourOptions = [
  { value: 'all', label: 'All', color: '#354c87'}, //Dark purple-blue
  { value: 'grad_of_2020', label: 'Grad of 2020', color: '#00B8D9'}, //Ocean
  { value: 'grad_of_2021', label: 'Grad of 2021', color: '#0052CC'}, //Blue
  { value: 'grad_of_2022', label: 'Grad of 2022', color: '#5243AA'}, //Purple
  { value: 'grad_of_2023', label: 'Grad of 2023', color: '#FF5630'}, //Red
  { value: 'teachers', label: 'Teachers', color: '#FF8B00'}, //Orange
  { value: 'staff', label: 'Staff', color: '#FFC400'}, //Yellow
  { value: 'administrators', label: 'Administrators', color: '#36B37E'}, //Green
  { value: 'counsellors', label: 'Counsellors', color: '#00875A'}, //Forest
  { value: 'student_council', label: 'Student Council', color: '#f15e75'}, //Pink
];

const colourStyles = {
  control: styles => ({ 
    ...styles, 
    backgroundColor: 'white', 
    width: '100%', 
    marginTop: 20, 
    marginBottom: 20,
    fontSize: 16,
    paddingTop: 7, 
    paddingBottom: 7
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected ? data.color : isFocused ? color.alpha(0.1).css() : null,
      color: isDisabled
        ? '#ccc'
        : isSelected
          ? chroma.contrast(color, 'white') > 2 ? 'white' : 'black'
          : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',
    };
  },
  multiValue: (styles, { data }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css(),
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ':hover': {
      backgroundColor: data.color,
      color: 'white',
    },
  }),
};

const MultiSelector = function() {
  return(
    <Select
      closeMenuOnSelect={false}
      defaultValue={[colourOptions[0]]}
      isMulti
      options={colourOptions}
      styles={colourStyles}
    />
  );
}

export default MultiSelector;