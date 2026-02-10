import React from 'react';
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

const CilsSection: React.FC<SectionProps> = ({
    formData,
    errors,
    handleChange,
    handleBlur,
}) => {
    const cilsIds = ['cilsAbimes', 'cilsBroussailleux', 'chuteDeCils', 'cilsProblemeAucun'];

    const toggleCils = useNoneLogic(cilsIds, 'cilsProblemeAucun', formData, handleChange);

    return (
        <>
            <Text variant="headlineMedium" style={{ marginBottom: 8 }}>Cils & sourcils</Text>
            <Divider style={{ marginBottom: 12 }} />

            <Text variant="titleMedium" style={{ marginBottom: 8 }}>Caractéristiques des cils</Text>

            <FormField
                label="Cils"
                id="cils"
                type="select"
                value={formData.cils}
                onChange={handleChange}
                options={[
                    'Noirs',
                    'Bruns',
                    'Châtains',
                    'Blonds',
                    'Roux',
                    'Gris',
                    'Colorés',
                ]}
            />

            <FormField
                label="Épaisseur des cils"
                id="epaisseurCils"
                type="select"
                value={formData.epaisseurCils}
                onChange={handleChange}
                options={[
                    'Fins',
                    'Moyens',
                    'Épais',
                ]}
            />

            <FormField
                label="Longueur des cils"
                id="longueurCils"
                type="select"
                value={formData.longueurCils}
                onChange={handleChange}
                options={[
                    'Courts',
                    'Moyens',
                    'Longs',
                ]}
            />

            <FormField
                label="Courbure des cils"
                id="courbureCils"
                type="select"
                value={formData.courbureCils}
                onChange={handleChange}
                options={[
                    'Droits',
                    'Courbés',
                ]}
            />

            <Text variant="titleMedium" style={{ marginBottom: 8, marginTop: 12 }}>Problèmes des cils</Text>

            <CheckboxField
                label="Aucun"
                id="cilsProblemeAucun"
                checked={formData.cilsProblemeAucun === 'Oui'}
                onChange={(id) => toggleCils(id)}
            />
            <CheckboxField
                label="Cils abîmés"
                id="cilsAbimes"
                checked={formData.cilsAbimes === 'Oui'}
                onChange={(id) => toggleCils(id)}
            />
            <CheckboxField
                label="Cils broussailleux"
                id="cilsBroussailleux"
                checked={formData.cilsBroussailleux === 'Oui'}
                onChange={(id) => toggleCils(id)}
            />
            <CheckboxField
                label="Chute de cils"
                id="chuteDeCils"
                checked={formData.chuteDeCils === 'Oui'}
                onChange={(id) => toggleCils(id)}
            />

            <Divider style={{ marginVertical: 12 }} />
            <Text variant="titleMedium" style={{ marginBottom: 8 }}>Sourcils</Text>
            <FormField
                label="Caractéristiques des sourcils"
                id="caracteristiqueSourcils"
                type="select"
                value={formData.caracteristiqueSourcils}
                onChange={handleChange}
                options={[
                    'Clairsemés',
                    'Fournis',
                ]}
            />

            <Divider style={{ marginVertical: 12 }} />
            <Text variant="titleMedium" style={{ marginBottom: 8 }}>Lèvres</Text>
            <FormField
                label="Type de lèvres"
                id="levres"
                type="select"
                value={formData.levres}
                onChange={handleChange}
                options={[
                    'Fines',
                    'Moyennes',
                    'Pulpeuses',
                    'Asymétriques',
                ]}
            />
        </>
    );
};

export default CilsSection;
