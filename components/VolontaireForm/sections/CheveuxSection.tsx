import React from 'react';
import { Text, Divider } from 'react-native-paper';
import FormField from '../FormField';
import CheckboxField from '../CheckboxField';
import { SectionProps } from '../types';

const CheveuxSection: React.FC<SectionProps> = ({
    formData,
    errors,
    handleChange,
    handleBlur,
}) => {
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
                    'Normaux',
                    'Secs',
                    'Gras',
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

            <CheckboxField
                label="Cuir chevelu sensible"
                id="cuirCheveluSensible"
                checked={formData.cuirCheveluSensible === 'Oui'}
                onChange={handleChange}
            />

            <CheckboxField
                label="Chute de cheveux"
                id="chuteDeCheveux"
                checked={formData.chuteDeCheveux === 'Oui'}
                onChange={handleChange}
            />

            <CheckboxField
                label="Cheveux cassants"
                id="cheveuxCassants"
                checked={formData.cheveuxCassants === 'Oui'}
                onChange={handleChange}
            />

            <Divider style={{ marginVertical: 12 }} />
            <Text variant="titleMedium" style={{ marginBottom: 8 }}>Ongles</Text>
            <CheckboxField
                label="Ongles cassants"
                id="onglesCassants"
                checked={formData.onglesCassants === 'Oui'}
                onChange={handleChange}
            />

            <CheckboxField
                label="Ongles dédoublés"
                id="onglesDedoubles"
                checked={formData.onglesDedoubles === 'Oui'}
                onChange={handleChange}
            />
        </>
    );
};

export default CheveuxSection;
