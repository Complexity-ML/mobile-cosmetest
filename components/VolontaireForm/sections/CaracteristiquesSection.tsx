import React from 'react';
import { Text, Divider } from 'react-native-paper';
import FormField from '../FormField';
import { SectionProps } from '../types';

const CaracteristiquesSection: React.FC<SectionProps> = ({
    formData,
    errors,
    handleChange,
    handleBlur,
}) => {
    return (
        <>
            <Text variant="headlineMedium" style={{ marginBottom: 8 }}>Caractéristiques physiques</Text>
            <Divider style={{ marginBottom: 12 }} />

            <FormField
                label="Taille (cm)"
                id="taille"
                type="number"
                value={formData.taille}
                onChange={handleChange}
            />

            <FormField
                label="Poids (kg)"
                id="poids"
                type="number"
                value={formData.poids}
                onChange={handleChange}
            />

            <FormField
                label="Phototype"
                id="phototype"
                type="select"
                value={formData.phototype}
                onChange={handleChange}
                options={[
                    'I - Peau très claire',
                    'II - Peau claire',
                    'III - Peau claire à mate',
                    'IV - Peau mate',
                    'V - Peau foncée',
                    'VI - Peau noire',
                ]}
            />

            <FormField
                label="Ethnie"
                id="ethnie"
                type="select"
                value={formData.ethnie}
                onChange={handleChange}
                options={[
                    'CAUCASIEN',
                    'Caucasienne',
                    'AFRICAIN',
                    'Africaine',
                    'ASIATIQUE',
                    'HISPANIQUE',
                    'MOYEN_ORIENT',
                    'AUTRE',
                ]}
            />

            <FormField
                label="Sous-ethnie"
                id="sousEthnie"
                type="text"
                value={formData.sousEthnie}
                onChange={handleChange}
            />

            <FormField
                label="Couleur des yeux"
                id="yeux"
                type="select"
                value={formData.yeux}
                onChange={handleChange}
                options={[
                    'Bleus',
                    'Verts',
                    'Marrons',
                    'Noisette',
                    'Gris',
                    'Noirs',
                ]}
            />

            <FormField
                label="Pilosité"
                id="pilosite"
                type="select"
                value={formData.pilosite}
                onChange={handleChange}
                options={[
                    'Faible_pilosite',
                    'Moyenne_pilosite',
                    'Forte_pilosite',
                ]}
            />

            <FormField
                label="Origine du père"
                id="originePere"
                type="text"
                value={formData.originePere}
                onChange={handleChange}
            />

            <FormField
                label="Origine de la mère"
                id="origineMere"
                type="text"
                value={formData.origineMere}
                onChange={handleChange}
            />
        </>
    );
};

export default CaracteristiquesSection;
