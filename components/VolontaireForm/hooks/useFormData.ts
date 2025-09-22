import { useState, useEffect } from 'react';
import { FormData, FormErrors } from '../types';

export const useFormData = (initialData?: FormData) => {
    const [formData, setFormData] = useState<FormData>(initialData || {});
    const [errors, setErrors] = useState<FormErrors>({});

    const handleChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleBlur = (fieldName: string) => {
        // Add validation logic here if needed
    };

    const setError = (fieldName: string, error: string) => {
        setErrors(prev => ({ ...prev, [fieldName]: error }));
    };

    const clearErrors = () => {
        setErrors({});
    };

    return {
        formData,
        setFormData,
        errors,
        setErrors,
        handleChange,
        handleBlur,
        setError,
        clearErrors,
    };
};