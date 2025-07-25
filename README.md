# Dynamic Form Builder Assignment

## Overview
This project is a dynamic form builder built with React and Zustand. It renders forms based on a JSON schema fetched from a remote API, supporting a variety of field types, validation rules, and conditional logic.

## Features
- **Dynamic Schema Loading:** The form schema is fetched from a remote JSON endpoint, not hardcoded.
- **Supported Field Types:** Text, Number, Select, Checkbox, and Date fields.
- **Validation:** Supports required, min, max, minLength, and pattern validation rules. Validation errors are displayed under each field.
- **Conditional Fields:** Fields can be shown/hidden based on the value of other fields (dependency logic).
- **State Management:** Uses Zustand for robust and scalable form state management.
- **User Feedback:** Displays submitted form data after successful submission.
- **No React Warnings:** All list children have unique keys; no React key warnings.

## How to Run
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm run dev
   ```
3. **Open your browser:**
   Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

## Testing the Assignment
- The form will load the schema from the provided API and render the "Employee Registration" form.
- Try filling out the form, testing required fields, minLength, and conditional logic (e.g., "Primary Programming Language" only appears if "Department" is "Engineering").
- On submit, the entered data will be displayed below the form.

## Submission Ready
This project fulfills all assignment requirements:
- Dynamic rendering from API schema
- All field types and validation
- Conditional logic
- State management
- Error handling and user feedback

---
If you need further documentation or code comments, let me know!
