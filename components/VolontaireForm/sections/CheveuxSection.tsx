import React from 'react';
import { Text, Divider } from 'react-native-paper';
import FormField from '../FormField';
import CheckboxField from '../CheckboxField';
import { SectionProps } from '../types';

const HAIR_SELECT_FIELDS = [
    {
        label: 'Couleur des cheveux',
        id: 'couleurCheveux',
        options: ['Blonds', 'Bruns', 'Châtains', 'Noirs', 'Roux', 'Gris', 'Blancs', 'Colorés'],
    },
    {
        label: 'Nature des cheveux',
        id: 'natureCheveux',
        options: ['Lisses', 'Ondulés', 'Bouclés', 'Crépus', 'Frisés'],
    },
    {
        label: 'Épaisseur des cheveux',
        id: 'epaisseurCheveux',
        options: ['Fins', 'Moyens', 'Épais'],
    },
    {
        label: 'Nature du cuir chevelu',
        id: 'natureCuirChevelu',
        options: ['Normal', 'Sec', 'Gras', 'Mixte'],
    },
] as const;

const CHECKBOX_GROUPS = [
    {
        title: 'Problèmes capillaires',
        fields: [
            { label: 'Cuir chevelu sensible', id: 'cuirCheveluSensible' },
            { label: 'Chute de cheveux', id: 'chuteDeCheveux' },
            { label: 'Cheveux cassants', id: 'cheveuxCassants' },
            { label: 'Calvitie', id: 'calvitie' },
            { label: 'Pellicules', id: 'pellicules' },
            { label: 'Démangeaisons du cuir chevelu', id: 'demangeaisonsCuirChevelu' },
        ],
    },
    {
        title: 'Ongles',
        fields: [
            { label: 'Ongles cassants', id: 'onglesCassants' },
            { label: 'Ongles dédoublés', id: 'onglesDedoubles' },
        ],
    },
] as const;

const isYes = (value?: string) => value?.toLowerCase() === 'oui';

const CheveuxSection: React.FC<SectionProps> = ({
    formData,
    handleChange,
}) => {
    return (
        <>
            <Text variant="headlineMedium" style={{ marginBottom: 8 }}>Cheveux & ongles</Text>
            <Divider style={{ marginBottom: 12 }} />

            <Text variant="titleMedium" style={{ marginBottom: 8 }}>Caractéristiques des cheveux</Text>

            {HAIR_SELECT_FIELDS.map((field) => (
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

            {CHECKBOX_GROUPS.map((group, index) => (
                <React.Fragment key={group.title}>
                    {index > 0 && <Divider style={{ marginVertical: 12 }} />}
                    <Text variant="titleMedium" style={{ marginBottom: 8, marginTop: index === 0 ? 12 : 0 }}>
                        {group.title}
                    </Text>

                    {group.fields.map((field) => (
                        <CheckboxField
                            key={field.id}
                            label={field.label}
                            id={field.id}
                            checked={isYes(formData[field.id])}
                            onChange={handleChange}
                        />
                    ))}
                </React.Fragment>
            ))}
        </>
    );
};

export default CheveuxSection;
