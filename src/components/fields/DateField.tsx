import React from 'react';

interface DateFieldProps {
  id: string;
  label: string;
  placeholder?: string;
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const DateField: React.FC<DateFieldProps> = ({ id, label, placeholder, error, value, onChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block font-medium mb-1">{label}</label>
      <input
        id={id}
        name={id}
        type="date"
        className={`border rounded px-3 py-2 w-full ${error ? 'border-red-500' : ''}`}
        value={typeof value === 'string' ? value : ''}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder || label}
        min={new Date().toISOString().split('T')[0]} // Disable previous dates
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default DateField;