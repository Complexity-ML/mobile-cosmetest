import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Divider, Button } from 'react-native-paper';
import { SectionProps } from '../types';
import { FORM_SECTIONS } from '../habitudesCosmetiquesConfig';
import CheckboxField from '../CheckboxField';

interface HabitudesCosmetiquesSectionProps extends SectionProps {
  onPageChange?: () => void;
}

const HabitudesCosmetiquesSection: React.FC<HabitudesCosmetiquesSectionProps> = ({
  formData,
  handleChange,
  onPageChange,
}) => {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const activeSection = FORM_SECTIONS[activeSectionIndex];
  const progress = ((activeSectionIndex + 1) / FORM_SECTIONS.length) * 100;

  const changeSection = (nextIndex: number) => {
    if (nextIndex < 0 || nextIndex >= FORM_SECTIONS.length) return;
    setActiveSectionIndex(nextIndex);
    onPageChange?.();
  };

  return (
    <View>
      <Text variant="headlineMedium" style={styles.title}>Habitudes cosmétiques</Text>
      <Text style={styles.instructions}>
        Répondez simplement avec Oui ou Non. Les questions de cette rubrique sont facultatives.
      </Text>

      <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>
            Catégorie {activeSectionIndex + 1} sur {FORM_SECTIONS.length}
          </Text>
          <Text style={styles.progressTitle}>{activeSection.title}</Text>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
      </View>

      <Divider style={styles.divider} />

      <View style={styles.sectionCard}>
        <Text variant="titleLarge" style={styles.sectionTitle}>{activeSection.title}</Text>
        {activeSection.groups.map((group, groupIndex) => (
          <View key={`${activeSection.title}-${groupIndex}`} style={styles.group}>
            {group.title && <Text style={styles.groupTitle}>{group.title}</Text>}
            {group.items.map((item) => (
              <CheckboxField
                key={item.id}
                label={item.label}
                id={item.id}
                value={formData[item.id] || ''}
                allowUnknown={false}
                onChange={(id, value) => handleChange(id, value.toLowerCase())}
              />
            ))}
          </View>
        ))}
      </View>

      <View style={styles.navigation}>
        <Button
          mode="outlined"
          disabled={activeSectionIndex === 0}
          onPress={() => changeSection(activeSectionIndex - 1)}
          style={styles.navigationButton}
          contentStyle={styles.navigationButtonContent}
          labelStyle={styles.navigationButtonLabel}
        >
          Catégorie précédente
        </Button>
        {activeSectionIndex < FORM_SECTIONS.length - 1 && (
          <Button
            mode="contained"
            onPress={() => changeSection(activeSectionIndex + 1)}
            style={styles.navigationButton}
            contentStyle={[styles.navigationButtonContent, styles.nextButtonContent]}
            labelStyle={styles.navigationButtonLabel}
          >
            Catégorie suivante
          </Button>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 8,
    color: '#111827',
  },
  instructions: {
    fontSize: 17,
    lineHeight: 24,
    color: '#4B5563',
    marginBottom: 16,
  },
  progressCard: {
    backgroundColor: '#EFF6FF',
    borderColor: '#BFDBFE',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
  },
  progressHeader: {
    gap: 4,
  },
  progressLabel: {
    fontSize: 16,
    color: '#1D4ED8',
    fontWeight: '600',
  },
  progressTitle: {
    fontSize: 20,
    color: '#111827',
    fontWeight: '700',
  },
  progressTrack: {
    height: 10,
    backgroundColor: '#DBEAFE',
    borderRadius: 999,
    marginTop: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2563EB',
    borderRadius: 999,
  },
  divider: {
    marginVertical: 18,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    color: '#111827',
    fontWeight: '700',
    marginBottom: 12,
  },
  group: {
    marginBottom: 12,
  },
  groupTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#374151',
    marginTop: 8,
    marginBottom: 4,
  },
  navigation: {
    gap: 12,
    marginTop: 20,
    marginBottom: 16,
  },
  navigationButton: {
    borderRadius: 10,
  },
  navigationButtonContent: {
    minHeight: 58,
  },
  nextButtonContent: {
    flexDirection: 'row-reverse',
  },
  navigationButtonLabel: {
    fontSize: 17,
    fontWeight: '700',
  },
});

export default HabitudesCosmetiquesSection;
