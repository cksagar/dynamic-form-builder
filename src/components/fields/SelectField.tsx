import React from 'react';

interface Option {
  label: string;
  value: string | number | boolean | Date;
}

interface SelectFieldProps {
  id: string;
  label: string;
  options: Option[];
  error?: string;
  value?: string | number;
  onChange?: (value: string | number) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({ id, label, options, error, value, onChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block font-medium mb-1">{label}</label>
      <select
        id={id}
        name={id}
        className={`border rounded px-3 py-2 w-full ${error ? 'border-red-500' : ''}`}
        value={typeof value === 'string' || typeof value === 'number' ? value : ''}
        onChange={(e) => onChange?.(e.target.value)}
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt.value.toString()} value={opt.value.toString()}>{opt.label}</option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default SelectField; 