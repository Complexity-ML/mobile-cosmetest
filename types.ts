// Types for form configuration and data

export type FormData = {
  idVol?: string | number;
  [key: string]: any;
};

export type FormItem = {
  id: string;
  label: string;
};

export type CheckboxItem = {
  id: string;
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
};

export type FormGroup = {
  title?: string;
  items: FormItem[];
};

export type FormSection = {
  title: string;
  icon: string;
  groups: FormGroup[];
};

// Navigation types
export type RootStackParamList = {
  index: undefined;
  VolontairesList: undefined;
  VolontaireHcForm: { idVol?: string };
};

// API response types
export type VolontaireModel = {
  idVol: string;
  nom: string;
  prenom: string;
  // Add other volunteer properties as needed
};

export type HabitudesCosmetiquesModel = {
  idVol: string | number;
  // All checkbox fields from formConfig as boolean values
  [key: string]: string | boolean | number;
};