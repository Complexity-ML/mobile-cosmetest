import React from 'react';
import { Text, Divider } from 'react-native-paper';
import CheckboxField from '../CheckboxField';
import { SectionProps } from '../types';

const MarquesCutaneesSection: React.FC<SectionProps> = ({
    formData,
    errors,
    handleChange,
    handleBlur,
}) => {
    return (
        <>
            <Text variant="headlineMedium" style={{ marginBottom: 8 }}>Marques cutanées</Text>
            <Divider style={{ marginBottom: 12 }} />

            <Text variant="titleMedium" style={{ marginBottom: 8 }}>Caractéristiques</Text>
            <CheckboxField
                label="Cicatrices"
                id="cicatrices"
                checked={formData.cicatrices === 'Oui'}
                onChange={handleChange}
            />

            <CheckboxField
                label="Tatouages"
                id="tatouages"
                checked={formData.tatouages === 'Oui'}
                onChange={handleChange}
            />

            <CheckboxField
                label="Piercings"
                id="piercings"
                checked={formData.piercings === 'Oui'}
                onChange={handleChange}
            />

            <Divider style={{ marginVertical: 12 }} />
            <Text variant="titleMedium" style={{ marginBottom: 8 }}>Taches pigmentaires</Text>
            <CheckboxField
                label="Visage"
                id="tachesPigmentairesVisage"
                checked={formData.tachesPigmentairesVisage === 'Oui'}
                onChange={handleChange}
            />

            <CheckboxField
                label="Cou"
                id="tachesPigmentairesCou"
                checked={formData.tachesPigmentairesCou === 'Oui'}
                onChange={handleChange}
            />

            <CheckboxField
                label="Décolleté"
                id="tachesPigmentairesDecollete"
                checked={formData.tachesPigmentairesDecollete === 'Oui'}
                onChange={handleChange}
            />

            <CheckboxField
                label="Mains"
                id="tachesPigmentairesMains"
                checked={formData.tachesPigmentairesMains === 'Oui'}
                onChange={handleChange}
            />

            <Divider style={{ marginVertical: 12 }} />
            <Text variant="titleMedium" style={{ marginBottom: 8 }}>Vergetures</Text>
            <CheckboxField
                label="Jambes"
                id="vergeturesJambes"
                checked={formData.vergeturesJambes === 'Oui'}
                onChange={handleChange}
            />

            <CheckboxField
                label="Fesses/Hanches"
                id="vergeturesFessesHanches"
                checked={formData.vergeturesFessesHanches === 'Oui'}
                onChange={handleChange}
            />

            <CheckboxField
                label="Ventre/Taille"
                id="vergeturesVentreTaille"
                checked={formData.vergeturesVentreTaille === 'Oui'}
                onChange={handleChange}
            />

            <CheckboxField
                label="Poitrine/Décolleté"
                id="vergeturesPoitrineDecollete"
                checked={formData.vergeturesPoitrineDecollete === 'Oui'}
                onChange={handleChange}
            />
        </>
    );
};

export default MarquesCutaneesSection;
