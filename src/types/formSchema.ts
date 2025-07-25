// Form field types
export type FieldType = 'text' | 'number' | 'select' | 'checkbox' | 'date';

export interface ValidationRule {
  type?: string;
  message?: string;
  value?: string | number | boolean | Date;
}

export interface ConditionalRule {
  condition: string;
  fieldId: string;
  value: string;
}

// Form field interface
export interface FormField {
  id: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: { label: string; value: string | number | boolean | Date }[];
  validation?: ValidationRule[];
  dependsOn?: ConditionalRule;
}

export interface SubmitButton {
  text?: string;
  loadingText?: string;
}

// Form schema interface
export interface FormSchema {
  title?: string;
  fields: FormField[];
  submitButton?: SubmitButton;
}

export type FormData = Record<string, unknown>; 