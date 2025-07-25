import React, { useState } from 'react';
import type { FormSchema, FormField } from '../types/formSchema';
import { useFormStore } from '../store/useFormStore';
import TextField from './fields/TextField';
import NumberField from './fields/NumberField';
import SelectField from './fields/SelectField';
import CheckboxField from './fields/CheckboxField';
import DateField from './fields/DateField';

import '../index.css';

interface DynamicFormProps {
  schema: FormSchema;
}

// Function to validate a field based on its validation rules
const validateField = (field: FormField, value: unknown): string | undefined => {
  const rules = field.validation;
  if (!rules) return undefined;

  for (const rule of rules) {
    switch (rule.type) {
      case 'required':
        if (
          value === undefined ||
          value === null ||
          value === '' ||
          (field.type === 'checkbox' && value !== true)
        ) {
          return rule.message || `${field.label} is required`;
        }
        break;
      case 'minLength':
        if (typeof value === 'string' && rule.value && value.length < Number(rule.value)) {
          return rule.message || `${field.label} must be at least ${rule.value} characters`;
        }
        break;
      case 'maxLength':
        if (typeof value === 'string' && rule.value && value.length > Number(rule.value)) {
          return rule.message || `${field.label} must be at most ${rule.value} characters`;
        }
        break;
      case 'min':
        if (typeof value === 'number' && rule.value !== undefined && value < Number(rule.value)) {
          return rule.message || `${field.label} must be at least ${rule.value}`;
        }
        break;
      case 'max':
        if (typeof value === 'number' && rule.value !== undefined && value > Number(rule.value)) {
          return rule.message || `${field.label} must be at most ${rule.value}`;
        }
        break;
      default:
        break;
    }
  }
  return undefined;
};

// Main DynamicForm component
const DynamicForm: React.FC<DynamicFormProps> = ({ schema }) => {
  const formData = useFormStore((state) => state.formData);
  const setFieldValue = useFormStore((state) => state.setFieldValue);
  const resetForm = useFormStore((state) => state.resetForm);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [loading, setLoading] = useState(false);
  const [submittedData, setSubmittedData] = useState<Record<string, unknown> | null>(null);

  // Handler for value change and validation
  const handleFieldChange = (field: FormField, value: unknown) => {
    if (!field.id) return;
    setFieldValue(field.id, value);

    const error = validateField(field, value);

    setErrors((prev) => {
      const newErrors = { ...prev };
      if (error) {
        newErrors[field.id] = error;
      } else {
        delete newErrors[field.id];
      }
      return newErrors;
    });
  };

  // Handler for form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string | undefined> = {};
    schema.fields.forEach((field) => {
      const error = validateField(field, formData[field.id]);
      if (error) newErrors[field.id] = error;
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmittedData(formData);
      resetForm();
      setLoading(false);
    }
  };

  // Render each field based on its type
  const renderField = (field: FormField) => {
    // Dependency check
    if (field.dependsOn) {
      const { fieldId, condition, value } = field.dependsOn;
      const parentValue = formData[fieldId];
      if (condition === 'equals' && parentValue !== value) {
        return null;
      }
    }
    const error = errors[field.id];
    const value = formData[field.id];

    switch (field.type) {
      case 'text':
        return (
          <TextField
            id={field.id}
            label={field.label}
            error={error}
            value={typeof value === 'string' ? value : ''}
            onChange={(val: string) => handleFieldChange(field, val)}
            placeholder={field.label}
          />
        );
      case 'number':
        return (
          <NumberField
            id={field.id}
            label={field.label}
            error={error}
            value={typeof value === 'number' ? value : ''}
            onChange={(val: string | number) => {
              const numVal = typeof val === 'string' ? Number(val) : val;
              handleFieldChange(field, isNaN(numVal) ? '' : numVal);
            }}
            placeholder={field.label}
          />
        );
      case 'select':
        return (
          <SelectField
            id={field.id}
            label={field.label}
            error={error}
            value={typeof value === 'string' ? value : ''}
            onChange={(val: string | number) => handleFieldChange(field, String(val))}
            options={field.options || []}
          />
        );
      case 'checkbox':
        return (
          <CheckboxField
            id={field.id}
            label={field.label}
            error={error}
            value={typeof value === 'boolean' ? value : false}
            onChange={(val: boolean) => handleFieldChange(field, val)}
          />
        );
      case 'date':
        return (
          <DateField
            id={field.id}
            label={field.label}
            error={error}
            value={typeof value === 'string' ? value : ''}
            onChange={(val: string) => handleFieldChange(field, val)}
            placeholder={field.label}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <form className="max-w-lg min-w-lg mx-auto p-6 rounded shadow" onSubmit={handleSubmit}>
        {schema.title && <h2 className="text-2xl font-bold mb-6">{schema.title}</h2>}
        {schema.fields.map(field => (
          <React.Fragment key={field.id}>
            {renderField(field)}
          </React.Fragment>
        ))}
        <button
          type="submit"
          className="mt-4 bg-blue-600 btn-primary text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          disabled={
            loading ||
            formData === null ||
            Object.keys(errors).length > 0 ||
            Object.keys(formData).length === 0 ||
            Object.values(formData).some(value => value === undefined || value === null)
          }
        >
          {loading ? (
            <>
              <span className="loader mr-2"></span>
              {schema.submitButton?.loadingText || 'Submitting...'}
            </>
          ) : (
            schema.submitButton?.text
          )}
        </button>
      </form>
      {submittedData && !loading && (
        <div className="max-w-lg mx-auto mt-6 p-4 border rounded bg-gray-50">
          <h3 className="font-bold mb-2">Submitted Data:</h3>
          <table className="w-full text-left border-collapse">
            <tbody>
              {Object.entries(submittedData).map(([key, value]) => (
                <tr key={key} className="border-b">
                  <td className="py-2 px-3 font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1')}</td>
                  <td className="py-2 px-3">
                    {typeof value === 'boolean'
                      ? value ? 'Yes' : 'No'
                      : value === '' || value === null || value === undefined
                        ? <span className="text-gray-400 italic">N/A</span>
                        : typeof value === 'string' || typeof value === 'number'
                          ? value
                          : String(value)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DynamicForm;