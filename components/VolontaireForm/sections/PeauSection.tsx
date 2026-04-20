import React from 'react';
import { View, StyleSheet } from 'react-native';
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

const PeauSection: React.FC<SectionProps> = ({
    formData,
    errors,
    handleChange,
    handleBlur,
    focusFieldId,
    focusRequestId,
}) => {
    const celluliteIds = ['celluliteBras', 'celluliteFessesHanches', 'celluliteJambes', 'celluliteVentreTaille', 'celluliteAucun'];
    const toggleCellulite = useNoneLogic(celluliteIds, 'celluliteAucun', formData, handleChange);

    return (
        <>
            <Text variant="headlineMedium" style={{ marginBottom: 8 }}>Caractéristiques de la peau</Text>
            <Divider style={{ marginBottom: 12 }} />

            <FormField
                label="Sensibilité cutanée"
                id="sensibiliteCutanee"
                type="select"
                value={formData.sensibiliteCutanee}
                onChange={handleChange}
                options={[
                    'Peau sensible',
                    'Peau peu sensible',
                    'Peau non sensible',
                ]}
            />

            <FormField
                label="Carnation"
                id="carnation"
                type="select"
                value={formData.carnation}
                onChange={handleChange}
                options={[
                    'Très claire',
                    'Claire',
                    'Moyenne',
                    'Mate',
                    'Foncée',
                    'Très foncée',
                ]}
            />

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
                options={[
                    'Normale',
                    'Sèche',
                    'Grasse',
                    'Mixte',
                    'Mixte à tendance grasse',
                    'Mixte à tendance sèche',
                    'Sensible',
                ]}
            />

            <View style={styles.checkboxWithHint}>
                <CheckboxField
                    label="Teint inhomogène"
                    id="teintInhomogene"
                    checked={formData.teintInhomogene === 'Oui'}
                    onChange={handleChange}
                />
                <Text style={styles.definition}>Couleur / reliefs (grain de beauté, taches, cicatrices...)</Text>
            </View>

            <View style={styles.checkboxWithHint}>
                <CheckboxField
                    label="Teint terne"
                    id="teintTerne"
                    checked={formData.teintTerne === 'Oui'}
                    onChange={handleChange}
                />
                <Text style={styles.definition}>Manque d'éclat</Text>
            </View>

            <CheckboxField
                label="Pores visibles"
                id="poresVisibles"
                checked={formData.poresVisibles === 'Oui'}
                onChange={handleChange}
            />

            <Divider style={{ marginVertical: 12 }} />
            <Text variant="titleMedium" style={{ marginBottom: 8 }}>Exposition au soleil</Text>

            <FormField
                label="Exposition solaire"
                id="expositionSolaire"
                type="select"
                value={formData.expositionSolaire}
                onChange={handleChange}
                options={['Faiblement', 'Moyennement', 'Fortement']}
            />

            <FormField
                label="Bronzage"
                id="bronzage"
                type="select"
                value={formData.bronzage}
                onChange={handleChange}
                options={['Progressif', 'Rapide', 'Difficile', 'Inexistant']}
            />

            <FormField
                label="Coups de soleil"
                id="coupsDeSoleil"
                type="select"
                value={formData.coupsDeSoleil}
                onChange={handleChange}
                options={['Jamais', 'Rarement', 'Parfois', 'Souvent', 'Toujours']}
            />

            <Divider style={{ marginVertical: 12 }} />
            <Text variant="titleMedium" style={{ marginBottom: 8 }}>Cellulite</Text>

            <CheckboxField label="Aucun" id="celluliteAucun" checked={formData.celluliteAucun === 'Oui'} onChange={(id) => toggleCellulite(id)} />
            <CheckboxField label="Bras" id="celluliteBras" checked={formData.celluliteBras === 'Oui'} onChange={(id) => toggleCellulite(id)} />
            <CheckboxField label="Fesses/Hanches" id="celluliteFessesHanches" checked={formData.celluliteFessesHanches === 'Oui'} onChange={(id) => toggleCellulite(id)} />
            <CheckboxField label="Jambes" id="celluliteJambes" checked={formData.celluliteJambes === 'Oui'} onChange={(id) => toggleCellulite(id)} />
            <CheckboxField label="Ventre/Taille" id="celluliteVentreTaille" checked={formData.celluliteVentreTaille === 'Oui'} onChange={(id) => toggleCellulite(id)} />

            <Divider style={{ marginVertical: 12 }} />
            <MultiSelectButtons
                label="Problèmes autour des yeux"
                id="problemesYeux"
                options={['Aucun', 'Cernes pigmentaires', 'Cernes vasculaires', 'Poches']}
                value={formData.problemesYeux || ''}
                onChange={handleChange}
            />

            <MultiSelectButtons
                label="Perte de fermeté"
                id="perteDeFermete"
                options={['Aucune', 'Visage', 'Cou', 'Décolleté / Poitrine', 'Avant-bras']}
                value={formData.perteDeFermete || ''}
                onChange={handleChange}
            />

            <MultiSelectButtons
                label="Sécheresse de la peau"
                id="secheressePeau"
                options={['Aucune', 'Lèvres', 'Cou', 'Poitrine / Décolleté', 'Ventre / Taille', 'Fesses / Hanches', 'Bras', 'Mains', 'Avant-bras']}
                value={formData.secheressePeau || ''}
                onChange={handleChange}
            />
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
