import React from 'react';
import { Text, Divider } from 'react-native-paper';
import CheckboxField from '../CheckboxField';
import { SectionProps } from '../types';

const ProblemesSection: React.FC<SectionProps> = ({
    formData,
    errors,
    handleChange,
    handleBlur,
}) => {
    return (
        <>
            <Text variant="headlineMedium" style={{ marginBottom: 8 }}>Problèmes spécifiques</Text>
            <Divider style={{ marginBottom: 12 }} />

            <CheckboxField
                label="Acné"
                id="acne"
                checked={formData.acne === 'Oui'}
                onChange={handleChange}
            />

            <CheckboxField
                label="Couperose / Rosacée"
                id="couperoseRosacee"
                checked={formData.couperoseRosacee === 'Oui'}
                onChange={handleChange}
            />

            <CheckboxField
                label="Dermite séborrhéique"
                id="dermiteSeborrheique"
                checked={formData.dermiteSeborrheique === 'Oui'}
                onChange={handleChange}
            />

            <CheckboxField
                label="Eczéma"
                id="eczema"
                checked={formData.eczema === 'Oui'}
                onChange={handleChange}
            />

            <CheckboxField
                label="Psoriasis"
                id="psoriasis"
                checked={formData.psoriasis === 'Oui'}
                onChange={handleChange}
            />

            <CheckboxField
                label="Angiome"
                id="angiome"
                checked={formData.angiome === 'Oui'}
                onChange={handleChange}
            />

            <CheckboxField
                label="Pityriasis"
                id="pityriasis"
                checked={formData.pityriasis === 'Oui'}
                onChange={handleChange}
            />

            <CheckboxField
                label="Vitiligo"
                id="vitiligo"
                checked={formData.vitiligo === 'Oui'}
                onChange={handleChange}
            />

            <CheckboxField
                label="Mélanome"
                id="melanome"
                checked={formData.melanome === 'Oui'}
                onChange={handleChange}
            />

            <CheckboxField
                label="Zona"
                id="zona"
                checked={formData.zona === 'Oui'}
                onChange={handleChange}
            />

            <CheckboxField
                label="Herpès"
                id="herpes"
                checked={formData.herpes === 'Oui'}
                onChange={handleChange}
            />

            <CheckboxField
                label="Pelade"
                id="pelade"
                checked={formData.pelade === 'Oui'}
                onChange={handleChange}
            />
        </>
    );
};

export default ProblemesSection;
