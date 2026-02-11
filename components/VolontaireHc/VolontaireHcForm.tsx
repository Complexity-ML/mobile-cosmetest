import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { Text, Snackbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import api from '../../app/services/apiService';

// Components
import FormHeader from './FormHeader';
import CollapsibleSection from './CollapsibleSection';
import CheckboxGroup from './CheckboxGroup';
import ActionButtons from './ActionButtons';

// Configurations
import { FORM_SECTIONS } from './formConfig';
import { FormData, FormSection, RootStackParamList } from '../../types';
import { initializeAllFieldsBoolean } from './initializeAllFieldsBoolean';
import { StackNavigationProp } from '@react-navigation/stack';


// Define proper types for navigation and route
type VolontaireHcFormNavigationProp = StackNavigationProp<RootStackParamList, 'VolontaireHcForm'>;
type VolontaireHcFormRouteProp = RouteProp<RootStackParamList, 'VolontaireHcForm'>;

const VolontaireHcForm: React.FC = () => {
  const route = useRoute<VolontaireHcFormRouteProp>();
  const navigation = useNavigation<VolontaireHcFormNavigationProp>();
  const { idVol } = route.params || {};

  const [formData, setFormData] = useState<FormData>({ idVol: undefined });
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [existingData, setExistingData] = useState(false);

  // Chargement initial des données existantes
  useEffect(() => {
    if (idVol) {
      const loadExistingData = async () => {
        const initialFormData = initializeAllFieldsBoolean(idVol);
        setLoadingData(true);
        try {
          const response = await api.habituesCosmetiques.getByVolontaireId(idVol);
          if (response.data) {
            const d = response.data as any;
            // Merger les données existantes sur les valeurs par défaut
            const merged: FormData = { ...initialFormData };
            for (const key of Object.keys(initialFormData)) {
              if (key === 'idVol') continue;
              const val = d[key];
              if (val === true || val === 'oui' || val === 'Oui') {
                merged[key] = true;
              } else {
                merged[key] = false;
              }
            }
            setFormData(merged);
            setExistingData(true);
          } else {
            setFormData(initialFormData);
          }
        } catch (error: any) {
          // 404 = pas encore de données, on garde les valeurs par défaut
          if (error?.response?.status !== 404) {
            console.warn('Erreur chargement habitudes cosmétiques:', error);
          }
          setFormData(initialFormData);
        } finally {
          setLoadingData(false);
        }
      };
      loadExistingData();
    }
  }, [idVol]);

  const handleCheckboxChange = (field: keyof FormData) => (value: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.idVol) {
      setSubmitError('Veuillez sélectionner un volontaire');
      return;
    }

    setLoading(true);
    try {
      if (existingData) {
        // Supprimer l'ancien enregistrement puis recréer
        try {
          await api.habituesCosmetiques.delete(formData.idVol);
        } catch (e) {
          // Ignorer si la suppression échoue (peut-être déjà supprimé)
        }
      }
      await api.habituesCosmetiques.create(formData);

      Alert.alert('Succès', 'Données enregistrées !', [
        { text: 'OK', onPress: () => navigation.navigate('index') }
      ]);
    } catch (error) {
      setSubmitError('Erreur lors de l\'enregistrement');
      console.error('Submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 }}>
        <ActivityIndicator size="large" color="#7C3AED" />
        <Text style={{ marginTop: 16, color: '#6B7280' }}>Chargement des habitudes cosmétiques...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView>
        <FormHeader
          title="Habitudes Cosmétiques"
          onBack={() => navigation.goBack()}
        />

        {/* Snackbar d'erreur en bas, cohérent avec VolontaireForm */}

        {FORM_SECTIONS.map((section: FormSection) => (
          <CollapsibleSection
            key={section.title}
            title={section.title}
            icon={section.icon}
          >
            {section.groups.map((group, index) => (
              <CheckboxGroup
                key={index}
                title={group.title}
                items={group.items.map(item => ({
                  ...item,
                  checked: Boolean(formData[item.id]),
                  onChange: handleCheckboxChange(item.id)
                }))}
              />
            ))}
          </CollapsibleSection>
        ))}

        <ActionButtons
          onCancel={() => navigation.goBack()}
          onSubmit={handleSubmit}
          loading={loading}
        />

        <Snackbar
          visible={!!submitError}
          onDismiss={() => setSubmitError(null)}
          duration={4000}
          style={{ backgroundColor: '#DC2626' }}
        >
          {submitError || ''}
        </Snackbar>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default VolontaireHcForm;
