import React from 'react';
import { Checkbox } from 'react-native-paper';

type CheckboxFieldProps = {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
};

const CheckboxField: React.FC<CheckboxFieldProps> = ({ label, checked, onChange }) => {
  return (
    <Checkbox.Item
      label={label}
      status={checked ? 'checked' : 'unchecked'}
      onPress={() => onChange(!checked)}
      position="leading"
    />
  );
};

export default CheckboxField;
