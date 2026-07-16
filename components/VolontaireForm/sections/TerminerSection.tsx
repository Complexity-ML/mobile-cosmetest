import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Divider, Button } from 'react-native-paper';
import { SectionProps, TabId } from '../types';

interface TerminerSectionProps extends SectionProps {
  onSubmit?: () => void;
  onCancel?: () => void;
  isSaving?: boolean;
  onEditSection?: (tabId: TabId) => void;
}

const EMPTY_VALUE = '—';
const isYes = (value?: string) => value?.toLowerCase() === 'oui';

const Line = ({ label, value }: { label: string; value: any }) => (
  <View style={styles.line}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value || EMPTY_VALUE}</Text>
  </View>
);

const SectionHeader = ({ label, tabId, onEdit }: {
  label: string;
  tabId: TabId;
  onEdit?: (tabId: TabId) => void;
}) => (
  <View style={styles.sectionHeader}>
    <Text variant="titleMedium" style={styles.sectionTitle}>{label}</Text>
    {onEdit && (
      <Button
        mode="text"
        onPress={() => onEdit(tabId)}
        contentStyle={styles.editButtonContent}
        labelStyle={styles.editButtonLabel}
      >
        Modifier
      </Button>
    )}
  </View>
);

const TerminerSection: React.FC<TerminerSectionProps> = ({
  formData,
  onSubmit,
  onCancel,
  isSaving,
  onEditSection,
}) => {
  const name = `${formData.prenomVol || ''} ${formData.nomVol || ''}`.trim() || EMPTY_VALUE;

  return (
    <View>
      <Text variant="headlineMedium" style={styles.title}>Vérifiez vos réponses</Text>
      <Divider style={styles.divider} />

      <Text style={styles.intro}>
        Relisez les informations importantes. Utilisez « Modifier » pour revenir directement à une rubrique.
      </Text>

      <SectionHeader label="Informations personnelles" tabId="infos-personnelles" onEdit={onEditSection} />
      <Line label="Nom" value={name} />
      <Line label="Email" value={formData.email} />
      <Line label="Téléphone" value={formData.telephone} />
      <Line label="Date de naissance" value={formData.dateNaissance} />
      <Line label="Sexe" value={formData.sexe} />

      <SectionHeader label="Caractéristiques" tabId="caracteristiques" onEdit={onEditSection} />
      <Line label="Taille" value={formData.taille ? `${formData.taille} cm` : ''} />
      <Line label="Poids" value={formData.poids ? `${formData.poids} kg` : ''} />
      <Line label="Phototype" value={formData.phototype} />
      <Line label="Ethnie" value={formData.ethnie} />

      <SectionHeader label="Peau" tabId="peau" onEdit={onEditSection} />
      <Line label="Type de peau" value={formData.typePeau} />
      <Line label="Carnation" value={formData.carnation} />
      <Line label="Sensibilité" value={formData.sensibiliteCutanee} />

      <SectionHeader label="Médical" tabId="medical" onEdit={onEditSection} />
      <Line label="Traitement" value={formData.traitement} />
      <Line label="Contraception" value={formData.contraception} />

      <SectionHeader label="Médecine esthétique" tabId="medecine-esthetique" onEdit={onEditSection} />
      <Line label="Injections visage" value={formData.injectionsVisage} />
      {isYes(formData.injectionsVisage) && (
        <>
          <Line label="Zone" value={formData.injectionsVisageZone} />
          <Line label="Dernière injection" value={formData.injectionsVisageDate} />
        </>
      )}
      <Line label="Maquillage permanent visage" value={formData.maquillagePermanentVisage} />
      {isYes(formData.maquillagePermanentVisage) && (
        <>
          <Line label="Zone" value={formData.maquillagePermanentVisageZone} />
          <Line label="Dernière réalisation" value={formData.maquillagePermanentVisageDate} />
        </>
      )}

      <Divider style={styles.finalDivider} />

      <Button
        mode="contained"
        onPress={onSubmit}
        loading={isSaving}
        disabled={isSaving}
        style={styles.submitButton}
        contentStyle={styles.submitButtonContent}
        labelStyle={styles.submitButtonLabel}
        icon="check"
      >
        {isSaving ? 'Enregistrement...' : 'Enregistrer le questionnaire'}
      </Button>

      {onCancel && (
        <Button
          mode="outlined"
          onPress={onCancel}
          disabled={isSaving}
          style={styles.cancelButton}
          contentStyle={styles.cancelButtonContent}
          labelStyle={styles.cancelButtonLabel}
        >
          Annuler
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 8,
    color: '#111827',
  },
  divider: {
    marginBottom: 16,
  },
  intro: {
    fontSize: 17,
    color: '#4B5563',
    marginBottom: 16,
    lineHeight: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 18,
  },
  sectionTitle: {
    marginBottom: 8,
    color: '#374151',
    fontWeight: '700',
  },
  editButtonContent: {
    minHeight: 48,
  },
  editButtonLabel: {
    fontSize: 16,
    fontWeight: '700',
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    gap: 16,
  },
  label: {
    fontSize: 16,
    lineHeight: 22,
    color: '#4B5563',
    flex: 1,
  },
  value: {
    fontSize: 16,
    lineHeight: 22,
    color: '#111827',
    fontWeight: '600',
    textAlign: 'right',
    flex: 1,
  },
  finalDivider: {
    marginVertical: 24,
  },
  submitButton: {
    borderRadius: 10,
    backgroundColor: '#2563EB',
  },
  submitButtonContent: {
    minHeight: 58,
  },
  submitButtonLabel: {
    fontSize: 17,
    fontWeight: '700',
  },
  cancelButton: {
    marginTop: 12,
    borderRadius: 10,
  },
  cancelButtonContent: {
    minHeight: 56,
  },
  cancelButtonLabel: {
    fontSize: 17,
    fontWeight: '700',
  },
});

export default TerminerSection;
