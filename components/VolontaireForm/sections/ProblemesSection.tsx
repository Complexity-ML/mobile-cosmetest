import React from 'react';
import { Text, Divider } from 'react-native-paper';
import CheckboxField from '../CheckboxField';
import { SectionProps } from '../types';

const PROBLEMES_FIELDS = [
    { label: 'Aucun', id: 'problemesAucun' },
    { label: 'Acné', id: 'acne' },
    { label: 'Couperose / Rosacée', id: 'couperoseRosacee' },
    { label: 'Dermite séborrhéique', id: 'dermiteSeborrheique' },
    { label: 'Eczéma', id: 'eczema' },
    { label: 'Psoriasis', id: 'psoriasis' },
] as const;

const isYes = (value?: string) => value?.toLowerCase() === 'oui';

const useNoneLogic = (
    ids: readonly string[],
    noneId: string,
    formData: Record<string, string>,
    handleChange: (id: string, value: string) => void
) => {
    const handleToggleWithNone = (id: string) => {
        const isCurrentlyChecked = isYes(formData[id]);

        if (id === noneId) {
            if (!isCurrentlyChecked) {
                ids.forEach(fieldId => {
                    if (fieldId !== noneId && isYes(formData[fieldId])) {
                        handleChange(fieldId, 'Non');
                    }
                });
                handleChange(noneId, 'Oui');
            } else {
                handleChange(noneId, 'Non');
            }
            return;
        }

        if (!isCurrentlyChecked && isYes(formData[noneId])) {
            handleChange(noneId, 'Non');
        }
        handleChange(id, isCurrentlyChecked ? 'Non' : 'Oui');
    };

    return handleToggleWithNone;
};

const ProblemesSection: React.FC<SectionProps> = ({
    formData,
    handleChange,
}) => {
    const problemesIds = PROBLEMES_FIELDS.map(field => field.id);
    const toggleProblemes = useNoneLogic(problemesIds, 'problemesAucun', formData, handleChange);

    return (
        <>
            <Text variant="headlineMedium" style={{ marginBottom: 8 }}>Problèmes spécifiques</Text>
            <Divider style={{ marginBottom: 12 }} />

            {PROBLEMES_FIELDS.map((field) => (
                <CheckboxField
                    key={field.id}
                    label={field.label}
                    id={field.id}
                    value={formData[field.id]}
                    onChange={(id) => toggleProblemes(id)}
                />
            ))}
        </>
    );
};

export default ProblemesSection;
