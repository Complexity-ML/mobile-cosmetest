import React from 'react';
import { Text, Divider } from 'react-native-paper';
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

const ProblemesSection: React.FC<SectionProps> = ({
    formData,
    errors,
    handleChange,
    handleBlur,
}) => {
    const problemesIds = [
        'acne', 'couperoseRosacee', 'dermiteSeborrheique', 'eczema',
        'psoriasis', 'angiome', 'pityriasis', 'vitiligo',
        'melanome', 'zona', 'herpes', 'pelade', 'problemesAucun',
    ];

    const toggleProblemes = useNoneLogic(problemesIds, 'problemesAucun', formData, handleChange);

    return (
        <>
            <Text variant="headlineMedium" style={{ marginBottom: 8 }}>Problèmes spécifiques</Text>
            <Divider style={{ marginBottom: 12 }} />

            <CheckboxField
                label="Aucun"
                id="problemesAucun"
                checked={formData.problemesAucun === 'Oui'}
                onChange={(id) => toggleProblemes(id)}
            />
            <CheckboxField
                label="Acné"
                id="acne"
                checked={formData.acne === 'Oui'}
                onChange={(id) => toggleProblemes(id)}
            />
            <CheckboxField
                label="Couperose / Rosacée"
                id="couperoseRosacee"
                checked={formData.couperoseRosacee === 'Oui'}
                onChange={(id) => toggleProblemes(id)}
            />
            <CheckboxField
                label="Dermite séborrhéique"
                id="dermiteSeborrheique"
                checked={formData.dermiteSeborrheique === 'Oui'}
                onChange={(id) => toggleProblemes(id)}
            />
            <CheckboxField
                label="Eczéma"
                id="eczema"
                checked={formData.eczema === 'Oui'}
                onChange={(id) => toggleProblemes(id)}
            />
            <CheckboxField
                label="Psoriasis"
                id="psoriasis"
                checked={formData.psoriasis === 'Oui'}
                onChange={(id) => toggleProblemes(id)}
            />
            <CheckboxField
                label="Angiome"
                id="angiome"
                checked={formData.angiome === 'Oui'}
                onChange={(id) => toggleProblemes(id)}
            />
            <CheckboxField
                label="Pityriasis"
                id="pityriasis"
                checked={formData.pityriasis === 'Oui'}
                onChange={(id) => toggleProblemes(id)}
            />
            <CheckboxField
                label="Vitiligo"
                id="vitiligo"
                checked={formData.vitiligo === 'Oui'}
                onChange={(id) => toggleProblemes(id)}
            />
            <CheckboxField
                label="Mélanome"
                id="melanome"
                checked={formData.melanome === 'Oui'}
                onChange={(id) => toggleProblemes(id)}
            />
            <CheckboxField
                label="Zona"
                id="zona"
                checked={formData.zona === 'Oui'}
                onChange={(id) => toggleProblemes(id)}
            />
            <CheckboxField
                label="Herpès"
                id="herpes"
                checked={formData.herpes === 'Oui'}
                onChange={(id) => toggleProblemes(id)}
            />
            <CheckboxField
                label="Pelade"
                id="pelade"
                checked={formData.pelade === 'Oui'}
                onChange={(id) => toggleProblemes(id)}
            />
        </>
    );
};

export default ProblemesSection;
