import React from 'react';

interface CheckboxFieldProps {
  id: string;
  label: string;
  error?: string;
  value?: boolean;
  onChange?: (value: boolean) => void;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({ id, label, error, value, onChange }) => {
  return (
    <div className="mb-4 flex items-center">
      <input
        id={id}
        name={id}
        type="checkbox"
        className={`mr-2 h-4 w-4 ${error ? 'border-red-500' : ''}`}
        checked={!!value}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <label htmlFor={id} className="font-medium">
        {label}
      </label>
      {error && <p className="text-red-500 text-sm ml-4">{error}</p>}
    </div>
  );
};

export default CheckboxField;