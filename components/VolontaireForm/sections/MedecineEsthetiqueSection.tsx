import React from 'react';
import { View } from 'react-native';
import { Text, Divider } from 'react-native-paper';
import FormField from '../FormField';
import CheckboxField from '../CheckboxField';
import { SectionProps } from '../types';

const MedecineEsthetiqueSection: React.FC<SectionProps> = ({
    formData,
    handleChange,
    handleBlur,
}) => {
    const injectionsActive = formData.injectionsVisage === 'Oui';
    const maquillageActive = formData.maquillagePermanentVisage === 'Oui';

    return (
        <>
            <Text variant="headlineMedium" style={{ marginBottom: 8 }}>Médecine esthétique</Text>
            <Divider style={{ marginBottom: 12 }} />

            <Text variant="titleMedium" style={{ marginBottom: 8 }}>
                Avez-vous déjà réalisé des injections sur le visage ?
            </Text>

            <CheckboxField
                label="Oui"
                id="injectionsVisage"
                checked={injectionsActive}
                onChange={(_id, value) => handleChange('injectionsVisage', value === 'Oui' ? 'Oui' : 'Non')}
            />

            {injectionsActive && (
                <View style={{ marginTop: 8 }}>
                    <FormField
                        label="Zone des injections"
                        id="injectionsVisageZone"
                        type="text"
                        value={formData.injectionsVisageZone || ''}
                        onChange={handleChange}
                        placeholder="Ex: front, lèvres, pommettes..."
                    />
                    <FormField
                        label="Date de la dernière injection"
                        id="injectionsVisageDate"
                        type="date"
                        value={formData.injectionsVisageDate || ''}
                        onChange={handleChange}
                    />
                </View>
            )}

            <Divider style={{ marginVertical: 16 }} />

            <Text variant="titleMedium" style={{ marginBottom: 8 }}>
                Avez-vous déjà réalisé du maquillage permanent sur le visage ?
            </Text>

            <CheckboxField
                label="Oui"
                id="maquillagePermanentVisage"
                checked={maquillageActive}
                onChange={(_id, value) => handleChange('maquillagePermanentVisage', value === 'Oui' ? 'Oui' : 'Non')}
            />

            {maquillageActive && (
                <View style={{ marginTop: 8 }}>
                    <FormField
                        label="Zone du maquillage permanent"
                        id="maquillagePermanentVisageZone"
                        type="text"
                        value={formData.maquillagePermanentVisageZone || ''}
                        onChange={handleChange}
                        placeholder="Ex: sourcils, lèvres, eye-liner..."
                    />
                    <FormField
                        label="Date du dernier maquillage permanent"
                        id="maquillagePermanentVisageDate"
                        type="date"
                        value={formData.maquillagePermanentVisageDate || ''}
                        onChange={handleChange}
                    />
                </View>
            )}
        </>
    );
};

export default MedecineEsthetiqueSection;
