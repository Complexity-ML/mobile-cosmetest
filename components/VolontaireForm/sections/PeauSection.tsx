import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Divider } from 'react-native-paper';
import FormField from '../FormField';
import CheckboxField from '../CheckboxField';
import { SectionProps } from '../types';

/**
 * Helper: pour une catégorie de checkboxes, gère la logique "Aucun".
 * - Si on coche "Aucun", on décoche tous les autres
 * - Si on coche un autre, on décoche "Aucun"
 */
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
                // Cocher "Aucun" → décocher tous les autres
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
            // Cocher un item normal → décocher "Aucun"
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
    // IDs par catégorie (incluant le "aucun" virtuel)
    const celluliteIds = ['celluliteBras', 'celluliteFessesHanches', 'celluliteJambes', 'celluliteVentreTaille', 'celluliteAucun'];
    const secheresseIds = ['secheresseLevres', 'secheresseCou', 'secheressePoitrineDecollete', 'secheresseVentreTaille', 'secheresseFessesHanches', 'secheresseBras', 'secheresseMains', 'secheresseJambes', 'secheressePieds', 'secheresseAucun'];
    const yeuxIds = ['cernesPigmentaires', 'cernesVasculaires', 'poches', 'yeuxAucun'];
    const fermeteIds = ['perteDeFermeteVisage', 'perteDeFermeteCou', 'perteDeFermeteDecollete', 'perteDeFermeteAvantBras', 'fermeteAucun'];

    const toggleCellulite = useNoneLogic(celluliteIds, 'celluliteAucun', formData, handleChange);
    const toggleSecheresse = useNoneLogic(secheresseIds, 'secheresseAucun', formData, handleChange);
    const toggleYeux = useNoneLogic(yeuxIds, 'yeuxAucun', formData, handleChange);
    const toggleFermete = useNoneLogic(fermeteIds, 'fermeteAucun', formData, handleChange);

    return (
        <>
            <Text variant="headlineMedium" style={{ marginBottom: 8 }}>Caractéristiques de la peau</Text>
            <Divider style={{ marginBottom: 12 }} />

            <FormField
                label="Type de peau"
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
                    'NORMALE',
                    'SECHE',
                    'GRASSE',
                    'MIXTE',
                    'MIXTE TENDANCE GRASSE',
                    'MIXTE TENDANCE SECHE',
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
                label="Sensibilité cutanée"
                id="sensibiliteCutanee"
                type="select"
                value={formData.sensibiliteCutanee}
                onChange={handleChange}
                options={[
                    'Peau sensible',
                    'Peau non sensible',
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
                options={[
                    'Faiblement',
                    'Moyennement',
                    'Fortement',
                ]}
            />

            <FormField
                label="Bronzage"
                id="bronzage"
                type="select"
                value={formData.bronzage}
                onChange={handleChange}
                options={[
                    'Progressif',
                    'Rapide',
                    'Difficile',
                    'Inexistant',
                ]}
            />

            <FormField
                label="Coups de soleil"
                id="coupsDeSoleil"
                type="select"
                value={formData.coupsDeSoleil}
                onChange={handleChange}
                options={[
                    'Jamais',
                    'Rarement',
                    'Parfois',
                    'Souvent',
                    'Toujours',
                ]}
            />

            <Divider style={{ marginVertical: 12 }} />
            <Text variant="titleMedium" style={{ marginBottom: 8 }}>Cellulite</Text>

            <CheckboxField
                label="Aucun"
                id="celluliteAucun"
                checked={formData.celluliteAucun === 'Oui'}
                onChange={(id) => toggleCellulite(id)}
            />
            <CheckboxField
                label="Bras"
                id="celluliteBras"
                checked={formData.celluliteBras === 'Oui'}
                onChange={(id) => toggleCellulite(id)}
            />
            <CheckboxField
                label="Fesses/Hanches"
                id="celluliteFessesHanches"
                checked={formData.celluliteFessesHanches === 'Oui'}
                onChange={(id) => toggleCellulite(id)}
            />
            <CheckboxField
                label="Jambes"
                id="celluliteJambes"
                checked={formData.celluliteJambes === 'Oui'}
                onChange={(id) => toggleCellulite(id)}
            />
            <CheckboxField
                label="Ventre/Taille"
                id="celluliteVentreTaille"
                checked={formData.celluliteVentreTaille === 'Oui'}
                onChange={(id) => toggleCellulite(id)}
            />

            <Divider style={{ marginVertical: 12 }} />
            <Text variant="titleMedium" style={{ marginBottom: 8 }}>Sécheresse cutanée</Text>

            <CheckboxField
                label="Aucun"
                id="secheresseAucun"
                checked={formData.secheresseAucun === 'Oui'}
                onChange={(id) => toggleSecheresse(id)}
            />
            <CheckboxField
                label="Lèvres"
                id="secheresseLevres"
                checked={formData.secheresseLevres === 'Oui'}
                onChange={(id) => toggleSecheresse(id)}
            />
            <CheckboxField
                label="Cou"
                id="secheresseCou"
                checked={formData.secheresseCou === 'Oui'}
                onChange={(id) => toggleSecheresse(id)}
            />
            <CheckboxField
                label="Poitrine/Décolleté"
                id="secheressePoitrineDecollete"
                checked={formData.secheressePoitrineDecollete === 'Oui'}
                onChange={(id) => toggleSecheresse(id)}
            />
            <CheckboxField
                label="Ventre/Taille"
                id="secheresseVentreTaille"
                checked={formData.secheresseVentreTaille === 'Oui'}
                onChange={(id) => toggleSecheresse(id)}
            />
            <CheckboxField
                label="Fesses/Hanches"
                id="secheresseFessesHanches"
                checked={formData.secheresseFessesHanches === 'Oui'}
                onChange={(id) => toggleSecheresse(id)}
            />
            <CheckboxField
                label="Bras"
                id="secheresseBras"
                checked={formData.secheresseBras === 'Oui'}
                onChange={(id) => toggleSecheresse(id)}
            />
            <CheckboxField
                label="Mains"
                id="secheresseMains"
                checked={formData.secheresseMains === 'Oui'}
                onChange={(id) => toggleSecheresse(id)}
            />
            <CheckboxField
                label="Jambes"
                id="secheresseJambes"
                checked={formData.secheresseJambes === 'Oui'}
                onChange={(id) => toggleSecheresse(id)}
            />
            <CheckboxField
                label="Pieds"
                id="secheressePieds"
                checked={formData.secheressePieds === 'Oui'}
                onChange={(id) => toggleSecheresse(id)}
            />

            <Divider style={{ marginVertical: 12 }} />
            <Text variant="titleMedium" style={{ marginBottom: 8 }}>Problèmes autour des yeux</Text>

            <CheckboxField
                label="Aucun"
                id="yeuxAucun"
                checked={formData.yeuxAucun === 'Oui'}
                onChange={(id) => toggleYeux(id)}
            />

            <View style={styles.checkboxWithHint}>
                <CheckboxField
                    label="Cernes pigmentaires"
                    id="cernesPigmentaires"
                    checked={formData.cernesPigmentaires === 'Oui'}
                    onChange={(id) => toggleYeux(id)}
                />
                <Text style={styles.definition}>Coloré : marron</Text>
            </View>

            <View style={styles.checkboxWithHint}>
                <CheckboxField
                    label="Cernes vasculaires"
                    id="cernesVasculaires"
                    checked={formData.cernesVasculaires === 'Oui'}
                    onChange={(id) => toggleYeux(id)}
                />
                <Text style={styles.definition}>Rouge bleuté</Text>
            </View>

            <CheckboxField
                label="Poches"
                id="poches"
                checked={formData.poches === 'Oui'}
                onChange={(id) => toggleYeux(id)}
            />

            <Divider style={{ marginVertical: 12 }} />
            <Text variant="titleMedium" style={{ marginBottom: 8 }}>Perte de fermeté</Text>

            <CheckboxField
                label="Aucun"
                id="fermeteAucun"
                checked={formData.fermeteAucun === 'Oui'}
                onChange={(id) => toggleFermete(id)}
            />
            <CheckboxField
                label="Visage"
                id="perteDeFermeteVisage"
                checked={formData.perteDeFermeteVisage === 'Oui'}
                onChange={(id) => toggleFermete(id)}
            />
            <CheckboxField
                label="Cou"
                id="perteDeFermeteCou"
                checked={formData.perteDeFermeteCou === 'Oui'}
                onChange={(id) => toggleFermete(id)}
            />
            <CheckboxField
                label="Décolleté"
                id="perteDeFermeteDecollete"
                checked={formData.perteDeFermeteDecollete === 'Oui'}
                onChange={(id) => toggleFermete(id)}
            />
            <CheckboxField
                label="Avant-bras"
                id="perteDeFermeteAvantBras"
                checked={formData.perteDeFermeteAvantBras === 'Oui'}
                onChange={(id) => toggleFermete(id)}
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
