import React from 'react';
import { Text, Divider } from 'react-native-paper';
import { View } from 'react-native';
import CheckboxField from './CheckboxField';

type CheckboxItem = {
  id: string;
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
};

type CheckboxGroupProps = {
  title?: string;
  items: CheckboxItem[];
};

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ title, items }) => (
  <View style={{ paddingHorizontal: 12, paddingBottom: 8 }}>
    {title && (
      <>
        <Divider style={{ marginVertical: 12 }} />
        <Text variant="titleMedium" style={{ marginBottom: 8 }}>{title}</Text>
      </>
    )}
    {items.map((item) => (
      <CheckboxField
        key={item.id}
        label={item.label}
        checked={item.checked}
        onChange={item.onChange}
      />
    ))}
  </View>
);

export default CheckboxGroup;
