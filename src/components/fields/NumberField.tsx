import React from 'react';

interface NumberFieldProps {
  id: string;
  label: string;
  placeholder?: string;
  error?: string;
  value?: number | string;
  onChange?: (value: number | string) => void;
}

const NumberField: React.FC<NumberFieldProps> = ({ id, label, placeholder, error, value, onChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block font-medium mb-1">{label}</label>
      <input
        id={id}
        name={id}
        type="number"
        className={`border rounded px-3 py-2 w-full ${error ? 'border-red-500' : ''}`}
        value={typeof value === 'number' || typeof value === 'string' ? value : ''}
        onChange={(e) => onChange?.(e.target.value === '' ? '' : Number(e.target.value))}
        placeholder={placeholder || label}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default NumberField; 