import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, Divider } from 'react-native-paper';
import { SectionProps } from '../types';
import { FORM_SECTIONS } from '../../VolontaireHc/formConfig';

// Bouton Oui/Non style vert/rouge
const BooleanField = ({ label, id, value, onChange }: {
  label: string;
  id: string;
  value: string;
  onChange: (name: string, value: string) => void;
}) => {
  const isOui = value === 'Oui' || value === 'oui' || value === 'true' || value === true as any;
  const isNon = value === 'Non' || value === 'non' || value === 'false' || value === false as any;

  return (
    <View style={styles.row}>
      <Text style={styles.label} numberOfLines={1}>{label}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={() => onChange(id, 'oui')}
          style={[styles.button, isOui ? styles.ouiActive : styles.inactive]}
        >
          <Text style={[styles.buttonText, isOui ? styles.ouiText : styles.inactiveText]}>Oui</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onChange(id, 'non')}
          style={[styles.button, isNon ? styles.nonActive : styles.inactive]}
        >
          <Text style={[styles.buttonText, isNon ? styles.nonText : styles.inactiveText]}>Non</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const HabitudesCosmetiquesSection: React.FC<SectionProps> = ({
  formData,
  handleChange,
}) => {
  return (
    <>
      <Text variant="headlineMedium" style={{ marginBottom: 8 }}>Habitudes cosmétiques</Text>
      <Divider style={{ marginBottom: 12 }} />

      {FORM_SECTIONS.map((section) => (
        <View key={section.title} style={{ marginBottom: 16 }}>
          <Text variant="titleMedium" style={{ marginBottom: 8, marginTop: 4 }}>
            {section.title}
          </Text>
          {section.groups.map((group, gi) => (
            <View key={`${section.title}-${gi}`}>
              {group.title && (
                <Text style={styles.groupTitle}>{group.title}</Text>
              )}
              {group.items.map((item) => (
                <BooleanField
                  key={item.id}
                  label={item.label}
                  id={item.id}
                  value={formData[item.id] || ''}
                  onChange={handleChange}
                />
              ))}
            </View>
          ))}
          <Divider style={{ marginTop: 8 }} />
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
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
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
    minWidth: 44,
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
    fontSize: 12,
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
  groupTitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6B7280',
    marginTop: 6,
    marginBottom: 4,
    marginLeft: 4,
  },
});

export default HabitudesCosmetiquesSection;
