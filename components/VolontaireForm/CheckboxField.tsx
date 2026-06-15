import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

export interface CheckboxFieldProps {
  label: string;
  id: string;
  value?: string;
  checked?: boolean;
  onChange: (id: string, value: 'Oui' | 'Non') => void;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({ label, id, value, checked, onChange }) => {
  const normalizedValue = value?.toLowerCase();
  const isOui = normalizedValue === 'oui' || (!value && checked === true);
  const isNon = normalizedValue === 'non' || (!value && checked === false);

  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={() => onChange(id, 'Oui')}
          style={[styles.button, isOui ? styles.ouiActive : styles.inactive]}
        >
          <Text style={[styles.buttonText, isOui ? styles.ouiText : styles.inactiveText]}>Oui</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onChange(id, 'Non')}
          style={[styles.button, isNon ? styles.nonActive : styles.inactive]}
        >
          <Text style={[styles.buttonText, isNon ? styles.nonText : styles.inactiveText]}>Non</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 4,
    minHeight: 52,
  },
  label: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    marginRight: 16,
    lineHeight: 21,
  },
  buttons: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 6,
    borderWidth: 1,
    minWidth: 58,
    alignItems: 'center',
  },
  ouiActive: {
    backgroundColor: '#F0FDF4',
    borderColor: '#4ADE80',
  },
  nonActive: {
    backgroundColor: '#FEF2F2',
    borderColor: '#F87171',
  },
  inactive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#D1D5DB',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
  },
  ouiText: {
    color: '#15803D',
  },
  nonText: {
    color: '#DC2626',
  },
  inactiveText: {
    color: '#9CA3AF',
  },
});

export default CheckboxField;
