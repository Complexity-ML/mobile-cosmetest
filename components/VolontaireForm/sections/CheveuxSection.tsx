import React from 'react';
import { Text, Divider } from 'react-native-paper';
import FormField from '../FormField';
import CheckboxField from '../CheckboxField';
import MultiSelectButtons from '../MultiSelectButtons';
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

const CheveuxSection: React.FC<SectionProps> = ({
    formData,
    errors,
    handleChange,
    handleBlur,
}) => {
    const onglesIds = ['onglesCassants', 'onglesDedoubles', 'onglesProblemeAucun'];
    const toggleOngles = useNoneLogic(onglesIds, 'onglesProblemeAucun', formData, handleChange);

    return (
        <>
            <Text variant="headlineMedium" style={{ marginBottom: 8 }}>Cheveux & ongles</Text>
            <Divider style={{ marginBottom: 12 }} />

            <Text variant="titleMedium" style={{ marginBottom: 8 }}>Caractéristiques des cheveux</Text>
            <FormField
                label="Couleur des cheveux"
                id="couleurCheveux"
                type="select"
                value={formData.couleurCheveux}
                onChange={handleChange}
                options={['Blonds', 'Bruns', 'Chatains', 'Noirs', 'Roux', 'Gris', 'Blancs', 'Colorés']}
            />

            <FormField
                label="Nature des cheveux"
                id="natureCheveux"
                type="select"
                value={formData.natureCheveux}
                onChange={handleChange}
                options={['Lisses', 'Ondulés', 'Bouclés', 'Crépus', 'Frisés']}
            />

            <FormField
                label="Épaisseur des cheveux"
                id="epaisseurCheveux"
                type="select"
                value={formData.epaisseurCheveux}
                onChange={handleChange}
                options={['Fins', 'Moyens', 'Épais']}
            />

            <FormField
                label="Nature du cuir chevelu"
                id="natureCuirChevelu"
                type="select"
                value={formData.natureCuirChevelu}
                onChange={handleChange}
                options={['Normal', 'Sec', 'Gras', 'Mixte']}
            />

            <MultiSelectButtons
                label="Problèmes capillaires"
                id="problemesCapillaires"
                options={['Aucun', 'Cuir chevelu sensible', 'Chute de cheveux', 'Cheveux cassants']}
                value={formData.problemesCapillaires || ''}
                onChange={handleChange}
            />

            <CheckboxField
                label="Calvitie"
                id="calvitie"
                checked={formData.calvitie === 'Oui'}
                onChange={handleChange}
            />
            <CheckboxField
                label="Pellicules"
                id="pellicules"
                checked={formData.pellicules === 'Oui'}
                onChange={handleChange}
            />
            <CheckboxField
                label="Démangeaisons du cuir chevelu"
                id="demangeaisonsCuirChevelu"
                checked={formData.demangeaisonsCuirChevelu === 'Oui'}
                onChange={handleChange}
            />

            <Divider style={{ marginVertical: 12 }} />
            <Text variant="titleMedium" style={{ marginBottom: 8 }}>Ongles</Text>

            <CheckboxField label="Aucun" id="onglesProblemeAucun" checked={formData.onglesProblemeAucun === 'Oui'} onChange={(id) => toggleOngles(id)} />
            <CheckboxField label="Ongles cassants" id="onglesCassants" checked={formData.onglesCassants === 'Oui'} onChange={(id) => toggleOngles(id)} />
            <CheckboxField label="Ongles dédoublés" id="onglesDedoubles" checked={formData.onglesDedoubles === 'Oui'} onChange={(id) => toggleOngles(id)} />
        </>
    );
};

export default CheveuxSection;
