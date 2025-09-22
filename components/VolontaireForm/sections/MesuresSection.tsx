import React from 'react';
import { Text, Divider } from 'react-native-paper';
import FormField from '../FormField';
import { SectionProps } from '../types';

const MesuresSection: React.FC<SectionProps> = ({
    formData,
    errors,
    handleChange,
    handleBlur,
}) => {
    return (
        <>
            <Text variant="headlineMedium" style={{ marginBottom: 8 }}>Mesures et valeurs</Text>
            <Divider style={{ marginBottom: 12 }} />

            <Text variant="titleMedium" style={{ marginBottom: 8 }}>Index d'hydratation</Text>
            <FormField
                label="IH Bras droit"
                id="ihBrasDroit"
                type="number"
                value={formData.ihBrasDroit}
                onChange={handleChange}
            />

            <FormField
                label="IH Bras gauche"
                id="ihBrasGauche"
                type="number"
                value={formData.ihBrasGauche}
                onChange={handleChange}
            />

            <Divider style={{ marginVertical: 12 }} />
            <Text variant="titleMedium" style={{ marginBottom: 8 }}>Scores d'évaluation</Text>
            <FormField
                label="Score POD"
                id="scorePod"
                type="number"
                value={formData.scorePod}
                onChange={handleChange}
            />

            <FormField
                label="Score POG"
                id="scorePog"
                type="number"
                value={formData.scorePog}
                onChange={handleChange}
            />

            <FormField
                label="Score Front"
                id="scoreFront"
                type="number"
                value={formData.scoreFront}
                onChange={handleChange}
            />

            <FormField
                label="Score Lion"
                id="scoreLion"
                type="number"
                value={formData.scoreLion}
                onChange={handleChange}
            />

            <FormField
                label="Score PPD"
                id="scorePpd"
                type="number"
                value={formData.scorePpd}
                onChange={handleChange}
            />

            <FormField
                label="Score PPG"
                id="scorePpg"
                type="number"
                value={formData.scorePpg}
                onChange={handleChange}
            />

            <FormField
                label="Score DOD"
                id="scoreDod"
                type="number"
                value={formData.scoreDod}
                onChange={handleChange}
            />

            <FormField
                label="Score DOG"
                id="scoreDog"
                type="number"
                value={formData.scoreDog}
                onChange={handleChange}
            />

            <FormField
                label="Score SNGD"
                id="scoreSngd"
                type="number"
                value={formData.scoreSngd}
                onChange={handleChange}
            />

            <FormField
                label="Score SNGG"
                id="scoreSngg"
                type="number"
                value={formData.scoreSngg}
                onChange={handleChange}
            />

            <FormField
                label="Score LEVSUP"
                id="scoreLevsup"
                type="number"
                value={formData.scoreLevsup}
                onChange={handleChange}
            />

            <FormField
                label="Score COMLEVD"
                id="scoreComlevd"
                type="number"
                value={formData.scoreComlevd}
                onChange={handleChange}
            />

            <FormField
                label="Score COMLEVG"
                id="scoreComlevg"
                type="number"
                value={formData.scoreComlevg}
                onChange={handleChange}
            />

            <FormField
                label="Score PTOSE"
                id="scorePtose"
                type="number"
                value={formData.scorePtose}
                onChange={handleChange}
            />

            <FormField
                label="Score ITA"
                id="ita"
                type="number"
                value={formData.ita}
                onChange={handleChange}
            />

            <Divider style={{ marginVertical: 12 }} />
            <Text variant="titleMedium" style={{ marginBottom: 8 }}>Autres</Text>
            <FormField
                label="Nombre de cigarettes par jour"
                id="nbCigarettesJour"
                type="number"
                value={formData.nbCigarettesJour}
                onChange={handleChange}
            />
        </>
    );
};

export default MesuresSection;
