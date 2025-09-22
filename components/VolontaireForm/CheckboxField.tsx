// CheckboxField.tsx
import React from 'react';
import { Checkbox } from 'react-native-paper';

export interface CheckboxFieldProps {
  label: string;
  id: string;
  checked: boolean;
  onChange: (id: string, value: 'Oui' | 'Non') => void;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({ label, id, checked, onChange }) => (
  <Checkbox.Item
    label={label}
    status={checked ? 'checked' : 'unchecked'}
    onPress={() => onChange(id, checked ? 'Non' : 'Oui')}
    position="leading"
  />
);

export default CheckboxField;
