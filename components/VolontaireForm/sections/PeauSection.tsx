import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Divider } from 'react-native-paper';
import FormField from '../FormField';
import CheckboxField from '../CheckboxField';
import { SectionProps } from '../types';

const SELECT_FIELDS = [
    {
        label: 'Sensibilité cutanée',
        id: 'sensibiliteCutanee',
        options: ['Peau sensible', 'Peau peu sensible', 'Peau non sensible'],
    },
    {
        label: 'Carnation',
        id: 'carnation',
        options: ['Très claire', 'Claire', 'Moyenne', 'Mate', 'Foncée', 'Très foncée'],
    },
] as const;

const TYPE_PEAU_OPTIONS = [
    'Normale',
    'Sèche',
    'Grasse',
    'Mixte',
    'Mixte à tendance grasse',
    'Mixte à tendance sèche',
    'Sensible',
] as const;

const SOLAR_FIELDS = [
    {
        label: 'Exposition solaire',
        id: 'expositionSolaire',
        options: ['Faiblement', 'Moyennement', 'Fortement'],
    },
    {
        label: 'Bronzage',
        id: 'bronzage',
        options: ['Progressif', 'Rapide', 'Difficile', 'Inexistant'],
    },
    {
        label: 'Coups de soleil',
        id: 'coupsDeSoleil',
        options: ['Jamais', 'Rarement', 'Parfois', 'Souvent', 'Toujours'],
    },
] as const;

const CHECKBOX_GROUPS = [
    {
        title: 'Cellulite',
        fields: [
            { label: 'Bras', id: 'celluliteBras' },
            { label: 'Fesses / Hanches', id: 'celluliteFessesHanches' },
            { label: 'Jambes', id: 'celluliteJambes' },
            { label: 'Ventre / Taille', id: 'celluliteVentreTaille' },
        ],
    },
    {
        title: 'Sécheresse de la peau',
        fields: [
            { label: 'Lèvres', id: 'secheresseLevres' },
            { label: 'Cou', id: 'secheresseCou' },
            { label: 'Poitrine / Décolleté', id: 'secheressePoitrineDecollete' },
            { label: 'Ventre / Taille', id: 'secheresseVentreTaille' },
            { label: 'Fesses / Hanches', id: 'secheresseFessesHanches' },
            { label: 'Bras', id: 'secheresseBras' },
            { label: 'Mains', id: 'secheresseMains' },
            { label: 'Jambes', id: 'secheresseJambes' },
            { label: 'Pieds', id: 'secheressePieds' },
        ],
    },
    {
        title: 'Problèmes autour des yeux',
        fields: [
            { label: 'Cernes vasculaires', id: 'cernesVasculaires' },
            { label: 'Cernes pigmentaires', id: 'cernesPigmentaires' },
            { label: 'Poches', id: 'poches' },
        ],
    },
    {
        title: 'Perte de fermeté',
        fields: [
            { label: 'Visage', id: 'perteDeFermeteVisage' },
            { label: 'Cou', id: 'perteDeFermeteCou' },
            { label: 'Décolleté / Poitrine', id: 'perteDeFermeteDecollete' },
            { label: 'Avant-bras', id: 'perteDeFermeteAvantBras' },
        ],
    },
] as const;

const PeauSection: React.FC<SectionProps> = ({
    formData,
    errors,
    handleChange,
    handleBlur,
    focusFieldId,
    focusRequestId,
}) => {
    return (
        <>
            <Text variant="headlineMedium" style={{ marginBottom: 8 }}>Caractéristiques de la peau</Text>
            <Divider style={{ marginBottom: 12 }} />

            {SELECT_FIELDS.map((field) => (
                <FormField
                    key={field.id}
                    label={field.label}
                    id={field.id}
                    type="select"
                    value={formData[field.id]}
                    onChange={handleChange}
                    options={[...field.options]}
                />
            ))}

            <FormField
                label="Type de peau (visage)"
                id="typePeau"
                type="select"
                value={formData.typePeau}
                onChange={handleChange}
                onBlur={() => handleBlur('typePeau')}
                required
                error={errors.typePeau}
                autoFocus={focusFieldId === 'typePeau'}
                focusRequestId={focusRequestId}
                options={[...TYPE_PEAU_OPTIONS]}
            />

            <View style={styles.checkboxWithHint}>
                <CheckboxField
                    label="Teint inhomogène"
                    id="teintInhomogene"
                    value={formData.teintInhomogene}
                    onChange={handleChange}
                />
                <Text style={styles.definition}>Couleur / reliefs (grain de beauté, taches, cicatrices...)</Text>
            </View>

            <View style={styles.checkboxWithHint}>
                <CheckboxField
                    label="Teint terne"
                    id="teintTerne"
                    value={formData.teintTerne}
                    onChange={handleChange}
                />
                <Text style={styles.definition}>Manque d'éclat</Text>
            </View>

            <CheckboxField
                label="Pores visibles"
                id="poresVisibles"
                value={formData.poresVisibles}
                onChange={handleChange}
            />

            <Divider style={{ marginVertical: 12 }} />
            <Text variant="titleMedium" style={{ marginBottom: 8 }}>Exposition au soleil</Text>

            {SOLAR_FIELDS.map((field) => (
                <FormField
                    key={field.id}
                    label={field.label}
                    id={field.id}
                    type="select"
                    value={formData[field.id]}
                    onChange={handleChange}
                    options={[...field.options]}
                />
            ))}

            {CHECKBOX_GROUPS.map((group) => (
                <React.Fragment key={group.title}>
                    <Divider style={{ marginVertical: 12 }} />
                    <Text variant="titleMedium" style={{ marginBottom: 8 }}>{group.title}</Text>

                    {group.fields.map((field) => (
                        <CheckboxField
                            key={field.id}
                            label={field.label}
                            id={field.id}
                            value={formData[field.id]}
                            onChange={handleChange}
                        />
                    ))}
                </React.Fragment>
            ))}
        </>
    );
};

const styles = StyleSheet.create({
    checkboxWithHint: {
        marginBottom: 2,
    },
    definition: {
        fontSize: 12,
        color: '#6B7280',
        fontStyle: 'italic',
        marginLeft: 52,
        marginTop: -6,
        marginBottom: 4,
    },
});

export default PeauSection;
