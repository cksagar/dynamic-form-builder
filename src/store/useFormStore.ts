import { create } from 'zustand';
import type { FormData } from '../types/formSchema';

interface FormStoreState {
  formData: FormData;
  setFieldValue: (field: string, value: unknown) => void;
  resetForm: () => void;
}

export const useFormStore = create<FormStoreState>((set: (fn: (state: FormStoreState) => Partial<FormStoreState>) => void) => ({
  formData: {},
  setFieldValue: (field: string, value: unknown) =>
    set((state: FormStoreState) => ({
      formData: { ...state.formData, [field]: value },
    })),
  resetForm: () => set(() => ({ formData: {} })),
})); 