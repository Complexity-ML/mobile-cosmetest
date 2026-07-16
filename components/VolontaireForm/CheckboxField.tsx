import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

export interface CheckboxFieldProps {
  label: string;
  id: string;
  value?: string;
  checked?: boolean;
  allowUnknown?: boolean;
  onChange: (id: string, value: 'Oui' | 'Non' | '') => void;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  label,
  id,
  value,
  checked,
  allowUnknown = true,
  onChange,
}) => {
  const normalizedValue = value?.toLowerCase();
  const isOui = normalizedValue === 'oui' || (!value && checked === true);
  const isNon = normalizedValue === 'non' || (!value && checked === false);
  const isUnknown = !isOui && !isNon;

  const choices = [
    { label: 'Oui', value: 'Oui' as const, selected: isOui, active: styles.ouiActive, text: styles.ouiText },
    { label: 'Non', value: 'Non' as const, selected: isNon, active: styles.nonActive, text: styles.nonText },
    ...(allowUnknown
      ? [{ label: 'Je ne sais pas', value: '' as const, selected: isUnknown, active: styles.unknownActive, text: styles.unknownText }]
      : []),
  ];

  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.buttons}>
        {choices.map((choice) => (
          <TouchableOpacity
            key={choice.label}
            onPress={() => onChange(id, choice.value)}
            accessibilityRole="button"
            accessibilityState={{ selected: choice.selected }}
            accessibilityLabel={`${label} : ${choice.label}`}
            style={[
              styles.button,
              choice.label === 'Je ne sais pas' && styles.unknownButton,
              choice.selected ? choice.active : styles.inactive,
            ]}
          >
            <Text style={[styles.buttonText, choice.selected ? choice.text : styles.inactiveText]}>
              {choice.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    paddingVertical: 14,
    paddingHorizontal: 4,
    minHeight: 112,
  },
  label: {
    fontSize: 18,
    color: '#374151',
    marginBottom: 10,
    lineHeight: 24,
  },
  buttons: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  button: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    minWidth: 76,
    minHeight: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unknownButton: {
    minWidth: 142,
  },
  ouiActive: {
    backgroundColor: '#F0FDF4',
    borderColor: '#4ADE80',
  },
  nonActive: {
    backgroundColor: '#FEF2F2',
    borderColor: '#F87171',
  },
  unknownActive: {
    backgroundColor: '#EFF6FF',
    borderColor: '#60A5FA',
  },
  inactive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#D1D5DB',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '600',
  },
  ouiText: {
    color: '#15803D',
  },
  nonText: {
    color: '#DC2626',
  },
  unknownText: {
    color: '#1D4ED8',
  },
  inactiveText: {
    color: '#6B7280',
  },
});

export default CheckboxField;
