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

const CheveuxSection: React.FC<SectionProps> = ({
    formData,
    errors,
    handleChange,
    handleBlur,
}) => {
    const cheveuxIds = ['cuirCheveluSensible', 'chuteDeCheveux', 'cheveuxCassants', 'cheveuxProblemeAucun'];
    const onglesIds = ['onglesCassants', 'onglesDedoubles', 'onglesProblemeAucun'];

    const toggleCheveux = useNoneLogic(cheveuxIds, 'cheveuxProblemeAucun', formData, handleChange);
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
                options={[
                    'Blonds',
                    'Bruns',
                    'Chatains',
                    'Noirs',
                    'Roux',
                    'Gris',
                    'Blancs',
                    'Colorés',
                ]}
            />

            <FormField
                label="Longueur des cheveux"
                id="longueurCheveux"
                type="select"
                value={formData.longueurCheveux}
                onChange={handleChange}
                options={[
                    'Courts',
                    'Mi-longs',
                    'Longs',
                    'Très longs',
                ]}
            />

            <FormField
                label="Nature des cheveux"
                id="natureCheveux"
                type="select"
                value={formData.natureCheveux}
                onChange={handleChange}
                options={[
                    'Lisses',
                    'Ondulés',
                    'Bouclés',
                    'Crépus',
                    'Frisés',
                ]}
            />

            <FormField
                label="Épaisseur des cheveux"
                id="epaisseurCheveux"
                type="select"
                value={formData.epaisseurCheveux}
                onChange={handleChange}
                options={[
                    'Fins',
                    'Moyens',
                    'Épais',
                ]}
            />

            <FormField
                label="Nature du cuir chevelu"
                id="natureCuirChevelu"
                type="select"
                value={formData.natureCuirChevelu}
                onChange={handleChange}
                options={[
                    'Normal',
                    'Sec',
                    'Gras',
                    'Mixte',
                ]}
            />

            <Text variant="titleMedium" style={{ marginBottom: 8, marginTop: 12 }}>Problèmes capillaires</Text>

            <CheckboxField
                label="Aucun"
                id="cheveuxProblemeAucun"
                checked={formData.cheveuxProblemeAucun === 'Oui'}
                onChange={(id) => toggleCheveux(id)}
            />
            <CheckboxField
                label="Cuir chevelu sensible"
                id="cuirCheveluSensible"
                checked={formData.cuirCheveluSensible === 'Oui'}
                onChange={(id) => toggleCheveux(id)}
            />
            <CheckboxField
                label="Chute de cheveux"
                id="chuteDeCheveux"
                checked={formData.chuteDeCheveux === 'Oui'}
                onChange={(id) => toggleCheveux(id)}
            />
            <CheckboxField
                label="Cheveux cassants"
                id="cheveuxCassants"
                checked={formData.cheveuxCassants === 'Oui'}
                onChange={(id) => toggleCheveux(id)}
            />

            <Divider style={{ marginVertical: 12 }} />
            <Text variant="titleMedium" style={{ marginBottom: 8 }}>Ongles</Text>

            <CheckboxField
                label="Aucun"
                id="onglesProblemeAucun"
                checked={formData.onglesProblemeAucun === 'Oui'}
                onChange={(id) => toggleOngles(id)}
            />
            <CheckboxField
                label="Ongles cassants"
                id="onglesCassants"
                checked={formData.onglesCassants === 'Oui'}
                onChange={(id) => toggleOngles(id)}
            />
            <CheckboxField
                label="Ongles dédoublés"
                id="onglesDedoubles"
                checked={formData.onglesDedoubles === 'Oui'}
                onChange={(id) => toggleOngles(id)}
            />
        </>
    );
};

export default CheveuxSection;
