// Types for VolontaireForm
export interface FormData {
    [key: string]: string;
}

export interface FormErrors {
    [key: string]: string;
}

export interface SectionProps {
    formData: FormData;
    errors: FormErrors;
    handleChange: (name: string, value: string) => void;
    handleBlur: (fieldName: string) => void;
    focusFieldId?: string;
    focusRequestId?: number;
}

export type TabId =
    | 'infos-personnelles'
    | 'caracteristiques'
    | 'peau'
    | 'marques-cutanees'
    | 'cheveux'
    | 'cils'
    | 'problemes'
    | 'medical'
    | 'mesures'
    | 'notes';

export interface FormTab {
    id: TabId;
    label: string;
    icon: string;
}

export type VolontaireFormRouteParams = {
    id?: string;
};

export interface VolontaireFormProps {
    isEmbedded?: boolean;
    onSubmitSuccess?: (id: string) => void;
}
