import React from 'react';
import { View } from 'react-native';
import { Text, Divider } from 'react-native-paper';
import FormField from '../FormField';
import CheckboxField from '../CheckboxField';
import { SectionProps } from '../types';

const MedicalSection: React.FC<SectionProps> = ({
    formData,
    errors,
    handleChange,
    handleBlur,
}) => {
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

            <CheckboxField
                label="Ménopause"
                id="menopause"
                checked={formData.menopause === 'Oui'}
                onChange={handleChange}
            />

            <CheckboxField
                label="Bouffées de chaleur (ménopause)"
                id="bouffeeChaleurMenaupose"
                checked={formData.bouffeeChaleurMenaupose === 'Oui'}
                onChange={handleChange}
            />

            <CheckboxField
                label="Traitement hormonal substitutif"
                id="ths"
                checked={formData.ths === 'Oui'}
                onChange={handleChange}
            />

            <CheckboxField
                label="Réaction allergique"
                id="reactionAllergique"
                checked={formData.reactionAllergique === 'Oui'}
                onChange={handleChange}
            />

            <CheckboxField
                label="Désensibilisation"
                id="desensibilisation"
                checked={formData.desensibilisation === 'Oui'}
                onChange={handleChange}
            />

            <CheckboxField
                label="Terrain atopique"
                id="terrainAtopique"
                checked={formData.terrainAtopique === 'Oui'}
                onChange={handleChange}
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
