import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Divider, Button } from 'react-native-paper';
import { SectionProps } from '../types';

interface TerminerSectionProps extends SectionProps {
  onSubmit?: () => void;
  onCancel?: () => void;
  isSaving?: boolean;
}

const Line = ({ label, value }: { label: string; value: any }) => (
  <View style={styles.line}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value || '—'}</Text>
  </View>
);

const TerminerSection: React.FC<TerminerSectionProps> = ({
  formData,
  onSubmit,
  onCancel,
  isSaving,
}) => {
  const name = `${formData.prenomVol || ''} ${formData.nomVol || ''}`.trim() || '—';

  return (
    <View>
      <Text variant="headlineMedium" style={{ marginBottom: 8 }}>Questionnaire terminé</Text>
      <Divider style={{ marginBottom: 16 }} />

      <Text style={styles.intro}>
        Vérifiez le récapitulatif ci-dessous puis appuyez sur « Enregistrer » pour finaliser la saisie.
      </Text>

      <Text variant="titleMedium" style={styles.sectionTitle}>Informations personnelles</Text>
      <Line label="Nom" value={name} />
      <Line label="Email" value={formData.email} />
      <Line label="Téléphone" value={formData.telephone} />
      <Line label="Date de naissance" value={formData.dateNaissance} />
      <Line label="Sexe" value={formData.sexe} />

      <Text variant="titleMedium" style={styles.sectionTitle}>Caractéristiques</Text>
      <Line label="Taille" value={formData.taille ? `${formData.taille} cm` : ''} />
      <Line label="Poids" value={formData.poids ? `${formData.poids} kg` : ''} />
      <Line label="Phototype" value={formData.phototype} />
      <Line label="Ethnie" value={formData.ethnie} />

      <Text variant="titleMedium" style={styles.sectionTitle}>Peau</Text>
      <Line label="Type de peau" value={formData.typePeau} />
      <Line label="Carnation" value={formData.carnation} />
      <Line label="Sensibilité" value={formData.sensibiliteCutanee} />

      <Text variant="titleMedium" style={styles.sectionTitle}>Médical</Text>
      <Line label="Traitement" value={formData.traitement} />
      <Line label="Contraception" value={formData.contraception} />

      <Text variant="titleMedium" style={styles.sectionTitle}>Médecine esthétique</Text>
      <Line label="Injections visage" value={formData.injectionsVisage} />
      {formData.injectionsVisage === 'Oui' && (
        <>
          <Line label="Zone" value={formData.injectionsVisageZone} />
          <Line label="Dernière injection" value={formData.injectionsVisageDate} />
        </>
      )}
      <Line label="Maquillage permanent visage" value={formData.maquillagePermanentVisage} />
      {formData.maquillagePermanentVisage === 'Oui' && (
        <>
          <Line label="Zone" value={formData.maquillagePermanentVisageZone} />
          <Line label="Dernière réalisation" value={formData.maquillagePermanentVisageDate} />
        </>
      )}

      <Divider style={{ marginVertical: 24 }} />

      <Button
        mode="contained"
        onPress={onSubmit}
        loading={isSaving}
        disabled={isSaving}
        style={styles.submitButton}
        labelStyle={{ fontSize: 16, fontWeight: '600' }}
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
        >
          Annuler
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  intro: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 8,
    color: '#374151',
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  label: {
    fontSize: 13,
    color: '#6B7280',
    flex: 1,
  },
  value: {
    fontSize: 13,
    color: '#111827',
    fontWeight: '500',
    textAlign: 'right',
    flex: 1,
  },
  submitButton: {
    paddingVertical: 8,
    backgroundColor: '#7C3AED',
  },
  cancelButton: {
    marginTop: 12,
  },
});

export default TerminerSection;
