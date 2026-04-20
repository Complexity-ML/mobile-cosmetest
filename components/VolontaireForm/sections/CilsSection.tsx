import React from 'react';
import { Text, Divider } from 'react-native-paper';
import FormField from '../FormField';
import MultiSelectButtons from '../MultiSelectButtons';
import { SectionProps } from '../types';

const CilsSection: React.FC<SectionProps> = ({
    formData,
    errors,
    handleChange,
    handleBlur,
}) => {
    return (
        <>
            <Text variant="headlineMedium" style={{ marginBottom: 8 }}>Cils & sourcils</Text>
            <Divider style={{ marginBottom: 12 }} />

            <Text variant="titleMedium" style={{ marginBottom: 8 }}>Caractéristiques des cils</Text>

            <FormField
                label="Épaisseur des cils"
                id="epaisseurCils"
                type="select"
                value={formData.epaisseurCils}
                onChange={handleChange}
                options={['Fins', 'Moyens', 'Épais']}
            />

            <FormField
                label="Longueur des cils"
                id="longueurCils"
                type="select"
                value={formData.longueurCils}
                onChange={handleChange}
                options={['Courts', 'Moyens', 'Longs']}
            />

            <FormField
                label="Courbure des cils"
                id="courbureCils"
                type="select"
                value={formData.courbureCils}
                onChange={handleChange}
                options={['Droits', 'Courbés']}
            />

            <MultiSelectButtons
                label="Problèmes des cils"
                id="problemesCils"
                options={['Cils abîmés', 'Cils broussailleux', 'Chute de cils']}
                value={formData.problemesCils || ''}
                onChange={handleChange}
            />

            <Divider style={{ marginVertical: 12 }} />
            <Text variant="titleMedium" style={{ marginBottom: 8 }}>Sourcils</Text>
            <FormField
                label="Caractéristiques des sourcils"
                id="caracteristiqueSourcils"
                type="select"
                value={formData.caracteristiqueSourcils}
                onChange={handleChange}
                options={['Clairsemés', 'Fournis']}
            />

            <Divider style={{ marginVertical: 12 }} />
            <Text variant="titleMedium" style={{ marginBottom: 8 }}>Lèvres</Text>
            <FormField
                label="Type de lèvres"
                id="levres"
                type="select"
                value={formData.levres}
                onChange={handleChange}
                options={['Fines', 'Moyennes', 'Pulpeuses', 'Asymétriques']}
            />
        </>
    );
};

export default CilsSection;
