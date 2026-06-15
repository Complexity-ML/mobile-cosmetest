import React from 'react';
import { Text, Divider } from 'react-native-paper';
import CheckboxField from '../CheckboxField';
import { SectionProps } from '../types';

const CHECKBOX_GROUPS = [
    {
        title: 'Vergetures',
        fields: [
            { label: 'Jambes', id: 'vergeturesJambes' },
            { label: 'Fesses / Hanches', id: 'vergeturesFessesHanches' },
            { label: 'Ventre / Taille', id: 'vergeturesVentreTaille' },
            { label: 'Poitrine / Décolleté', id: 'vergeturesPoitrineDecollete' },
        ],
    },
    {
        title: 'Taches pigmentaires',
        fields: [
            { label: 'Visage', id: 'tachesPigmentairesVisage' },
            { label: 'Cou', id: 'tachesPigmentairesCou' },
            { label: 'Décolleté', id: 'tachesPigmentairesDecollete' },
            { label: 'Mains', id: 'tachesPigmentairesMains' },
        ],
    },
] as const;

const MarquesCutaneesSection: React.FC<SectionProps> = ({
    formData,
    handleChange,
}) => {
    return (
        <>
            <Text variant="headlineMedium" style={{ marginBottom: 8 }}>Marques cutanées</Text>
            <Divider style={{ marginBottom: 12 }} />

            {CHECKBOX_GROUPS.map((group, index) => (
                <React.Fragment key={group.title}>
                    {index > 0 && <Divider style={{ marginVertical: 12 }} />}
                    <Text variant="titleMedium" style={{ marginBottom: 8 }}>{group.title}</Text>

                    {group.fields.map((field) => (
                        <CheckboxField
                            key={field.id}
                            label={field.label}
                            id={field.id}
                            value={formData[field.id]}
                            onChange={handleChange}
                        />
                    ))}
                </React.Fragment>
            ))}
        </>
    );
};

export default MarquesCutaneesSection;
