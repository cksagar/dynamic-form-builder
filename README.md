# Dynamic Form Builder Assignment

## Overview
This project is a dynamic form builder built with React and Zustand. It renders forms based on a JSON schema fetched from a remote API, supporting a variety of field types, validation rules, and conditional logic.

## Features
- **Dynamic Schema Loading:** The form schema is fetched from a remote JSON endpoint, not hardcoded.
- **Supported Field Types:** Text, Number, Select, Checkbox, and Date fields.
- **Validation:** Supports validation rules. mentioned in the API. Validation errors are displayed under each field.
- **Conditional Fields:** Fields can be shown/hidden based on the value of other fields (dependency logic).
- **State Management:** Uses Zustand for robust and scalable form state management.
- **User Feedback:** Displays submitted form data after successful submission.

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
   Visit [http://localhost:5173](http://localhost:5173)
