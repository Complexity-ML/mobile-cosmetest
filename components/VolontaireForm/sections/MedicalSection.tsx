import React from 'react';
import { View } from 'react-native';
import { Text, Divider } from 'react-native-paper';
import FormField from '../FormField';
import CheckboxField from '../CheckboxField';
import { SectionProps } from '../types';

const useNoneLogic = (
    ids: string[],
    noneId: string,
    formData: any,
    handleChange: (id: string, value: string) => void
) => {
    const handleToggleWithNone = (id: string) => {
        const currentVal = formData[id];
        const isCurrentlyChecked = currentVal === 'Oui';

        if (id === noneId) {
            if (!isCurrentlyChecked) {
                ids.forEach(fieldId => {
                    if (fieldId !== noneId && formData[fieldId] === 'Oui') {
                        handleChange(fieldId, 'Non');
                    }
                });
                handleChange(noneId, 'Oui');
            } else {
                handleChange(noneId, 'Non');
            }
        } else {
            if (!isCurrentlyChecked && formData[noneId] === 'Oui') {
                handleChange(noneId, 'Non');
            }
            handleChange(id, isCurrentlyChecked ? 'Non' : 'Oui');
        }
    };

    return handleToggleWithNone;
};

const MedicalSection: React.FC<SectionProps> = ({
    formData,
    errors,
    handleChange,
    handleBlur,
}) => {
    const medicalIds = [
        'menopause', 'bouffeeChaleurMenaupose', 'ths',
        'reactionAllergique', 'desensibilisation', 'terrainAtopique',
        'medicalAucun',
    ];

    const toggleMedical = useNoneLogic(medicalIds, 'medicalAucun', formData, handleChange);

    return (
        <>
            <Text variant="headlineMedium" style={{ marginBottom: 8 }}>Informations médicales</Text>
            <Divider style={{ marginBottom: 12 }} />

            <FormField
                label="Traitement en cours"
                id="traitement"
                type="textarea"
                value={formData.traitement}
                onChange={handleChange}
                placeholder="Traitements médicaux en cours"
            />

            <FormField
                label="Anamnèse"
                id="anamnese"
                type="textarea"
                value={formData.anamnese}
                onChange={handleChange}
                placeholder="Antécédents médicaux"
            />

            <FormField
                label="Contraception"
                id="contraception"
                type="select"
                value={formData.contraception}
                onChange={handleChange}
                options={[
                    'Pilule',
                    'Stérilet',
                    'Implant',
                    'Patch',
                    'Autre',
                    'Abstinence',
                ]}
            />

            <FormField
                label="Santé compatible"
                id="santeCompatible"
                type="select"
                value={formData.santeCompatible}
                onChange={handleChange}
                options={[
                    'Oui',
                    'Non',
                ]}
            />

            <Divider style={{ marginVertical: 12 }} />
            <Text variant="titleMedium" style={{ marginBottom: 8 }}>Antécédents médicaux</Text>

            <CheckboxField
                label="Aucun"
                id="medicalAucun"
                checked={formData.medicalAucun === 'Oui'}
                onChange={(id) => toggleMedical(id)}
            />
            <CheckboxField
                label="Ménopause"
                id="menopause"
                checked={formData.menopause === 'Oui'}
                onChange={(id) => toggleMedical(id)}
            />
            <CheckboxField
                label="Bouffées de chaleur (ménopause)"
                id="bouffeeChaleurMenaupose"
                checked={formData.bouffeeChaleurMenaupose === 'Oui'}
                onChange={(id) => toggleMedical(id)}
            />
            <CheckboxField
                label="Traitement hormonal substitutif"
                id="ths"
                checked={formData.ths === 'Oui'}
                onChange={(id) => toggleMedical(id)}
            />
            <CheckboxField
                label="Réaction allergique"
                id="reactionAllergique"
                checked={formData.reactionAllergique === 'Oui'}
                onChange={(id) => toggleMedical(id)}
            />
            <CheckboxField
                label="Désensibilisation"
                id="desensibilisation"
                checked={formData.desensibilisation === 'Oui'}
                onChange={(id) => toggleMedical(id)}
            />
            <CheckboxField
                label="Terrain atopique"
                id="terrainAtopique"
                checked={formData.terrainAtopique === 'Oui'}
                onChange={(id) => toggleMedical(id)}
            />

            <View>
                <FormField
                    label="Allergies connues"
                    id="allergiesCommentaires"
                    type="textarea"
                    value={formData.allergiesCommentaires}
                    onChange={handleChange}
                    placeholder="Allergies connues (médicaments, aliments, autres substances)"
                />
            </View>
        </>
    );
};

export default MedicalSection;
