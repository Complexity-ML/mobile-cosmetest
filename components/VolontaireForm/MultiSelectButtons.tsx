import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

export interface MultiSelectButtonsProps {
  label: string;
  id: string;
  options: string[];
  value: string;
  onChange: (id: string, value: string) => void;
}

const MultiSelectButtons: React.FC<MultiSelectButtonsProps> = ({
  label,
  id,
  options,
  value,
  onChange,
}) => {
  const selected: string[] = value ? value.split(', ').filter(Boolean) : [];

  const toggle = (option: string) => {
    let next: string[];
    if (selected.includes(option)) {
      next = selected.filter((s) => s !== option);
    } else {
      next = [...selected, option];
    }
    onChange(id, next.join(', '));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.buttonsRow}>
        {options.map((option) => {
          const isSelected = selected.includes(option);
          return (
            <TouchableOpacity
              key={option}
              onPress={() => toggle(option)}
              style={[
                styles.button,
                isSelected ? styles.buttonSelected : styles.buttonUnselected,
              ]}
            >
              <Text
                style={[
                  styles.buttonText,
                  isSelected ? styles.textSelected : styles.textUnselected,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  buttonsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  button: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  buttonSelected: {
    backgroundColor: '#DBEAFE',
    borderColor: '#60A5FA',
  },
  buttonUnselected: {
    backgroundColor: '#FFFFFF',
    borderColor: '#D1D5DB',
  },
  buttonText: {
    fontSize: 13,
  },
  textSelected: {
    color: '#1E40AF',
    fontWeight: '600',
  },
  textUnselected: {
    color: '#6B7280',
  },
});

export default MultiSelectButtons;
