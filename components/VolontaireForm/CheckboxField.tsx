import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

export interface CheckboxFieldProps {
  label: string;
  id: string;
  checked: boolean;
  onChange: (id: string, value: 'Oui' | 'Non') => void;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({ label, id, checked, onChange }) => {
  const isOui = checked === true;
  const isNon = checked === false;

  return (
    <View style={styles.row}>
      <Text style={styles.label} numberOfLines={2}>{label}</Text>
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
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  label: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
    marginRight: 12,
  },
  buttons: {
    flexDirection: 'row',
    gap: 4,
  },
  button: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    minWidth: 48,
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
    fontSize: 13,
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
