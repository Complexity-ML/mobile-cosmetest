import React from 'react';
import { Text, Divider } from 'react-native-paper';
import FormField from '../FormField';
import CheckboxField from '../CheckboxField';
import { SectionProps } from '../types';

const CILS_FIELDS = [
    { label: 'Épaisseur des cils', id: 'epaisseurCils', options: ['Fins', 'Moyens', 'Épais'] },
    { label: 'Longueur des cils', id: 'longueurCils', options: ['Courts', 'Moyens', 'Longs'] },
    { label: 'Courbure des cils', id: 'courbureCils', options: ['Droits', 'Courbés'] },
] as const;

const CILS_PROBLEMES = [
    { label: 'Cils abîmés', id: 'cilsAbimes' },
    { label: 'Cils broussailleux', id: 'cilsBroussailleux' },
    { label: 'Chute de cils', id: 'chuteDeCils' },
] as const;

const isYes = (value?: string) => value?.toLowerCase() === 'oui';

const CilsSection: React.FC<SectionProps> = ({
    formData,
    handleChange,
}) => {
    return (
        <>
            <Text variant="headlineMedium" style={{ marginBottom: 8 }}>Cils & sourcils</Text>
            <Divider style={{ marginBottom: 12 }} />

            <Text variant="titleMedium" style={{ marginBottom: 8 }}>Caractéristiques des cils</Text>

            {CILS_FIELDS.map((field) => (
                <FormField
                    key={field.id}
                    label={field.label}
                    id={field.id}
                    type="select"
                    value={formData[field.id]}
                    onChange={handleChange}
                    options={[...field.options]}
                />
            ))}

            <Text variant="titleMedium" style={{ marginBottom: 8, marginTop: 12 }}>Problèmes des cils</Text>

            {CILS_PROBLEMES.map((field) => (
                <CheckboxField
                    key={field.id}
                    label={field.label}
                    id={field.id}
                    checked={isYes(formData[field.id])}
                    onChange={handleChange}
                />
            ))}

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
