import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Divider, Checkbox, TextInput as PaperTextInput } from 'react-native-paper';
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

const MarquesCutaneesSection: React.FC<SectionProps> = ({
    formData,
    errors,
    handleChange,
    handleBlur,
}) => {
    const isChecked = (val: any) => !!val && val !== 'Non';
    const getTextValue = (val: any) => {
        if (!val || val === 'Non' || val === 'Oui') return '';
        return val;
    };

    // For caractéristiques, special "none" logic that also clears text values
    const caracteristiquesIds = ['cicatrices', 'tatouages', 'piercings'];
    const handleToggleCarac = (id: string) => {
        if (id === 'caracteristiquesAucun') {
            const isCurrentlyChecked = formData.caracteristiquesAucun === 'Oui';
            if (!isCurrentlyChecked) {
                caracteristiquesIds.forEach(fieldId => {
                    if (isChecked(formData[fieldId])) {
                        handleChange(fieldId, '');
                    }
                });
                handleChange('caracteristiquesAucun', 'Oui');
            } else {
                handleChange('caracteristiquesAucun', 'Non');
            }
        } else {
            if (isChecked(formData[id])) {
                handleChange(id, '');
            } else {
                if (formData.caracteristiquesAucun === 'Oui') {
                    handleChange('caracteristiquesAucun', 'Non');
                }
                handleChange(id, 'Oui');
            }
        }
    };

    const handleTextDetail = (id: string, text: string) => {
        handleChange(id, text || 'Oui');
    };

    const tachesIds = ['tachesPigmentairesVisage', 'tachesPigmentairesCou', 'tachesPigmentairesDecollete', 'tachesPigmentairesMains', 'tachesPigmentairesAucun'];
    const vergeturesIds = ['vergeturesJambes', 'vergeturesFessesHanches', 'vergeturesVentreTaille', 'vergeturesPoitrineDecollete', 'vergeturesAucun'];

    const toggleTaches = useNoneLogic(tachesIds, 'tachesPigmentairesAucun', formData, handleChange);
    const toggleVergetures = useNoneLogic(vergeturesIds, 'vergeturesAucun', formData, handleChange);

    return (
        <>
            <Text variant="headlineMedium" style={{ marginBottom: 8 }}>Marques cutanées</Text>
            <Divider style={{ marginBottom: 12 }} />

            <Text variant="titleMedium" style={{ marginBottom: 8 }}>Caractéristiques</Text>

            <CheckboxField
                label="Aucun"
                id="caracteristiquesAucun"
                checked={formData.caracteristiquesAucun === 'Oui'}
                onChange={(id) => handleToggleCarac(id)}
            />

            <View style={styles.checkboxWithText}>
                <Checkbox.Item
                    label="Cicatrices"
                    status={isChecked(formData.cicatrices) ? 'checked' : 'unchecked'}
                    onPress={() => handleToggleCarac('cicatrices')}
                    position="leading"
                />
                {isChecked(formData.cicatrices) && (
                    <PaperTextInput
                        mode="outlined"
                        placeholder="Précisez l'emplacement"
                        value={getTextValue(formData.cicatrices)}
                        onChangeText={(text) => handleTextDetail('cicatrices', text)}
                        style={styles.detailInput}
                        dense
                    />
                )}
            </View>

            <View style={styles.checkboxWithText}>
                <Checkbox.Item
                    label="Tatouages"
                    status={isChecked(formData.tatouages) ? 'checked' : 'unchecked'}
                    onPress={() => handleToggleCarac('tatouages')}
                    position="leading"
                />
                {isChecked(formData.tatouages) && (
                    <PaperTextInput
                        mode="outlined"
                        placeholder="Précisez l'emplacement"
                        value={getTextValue(formData.tatouages)}
                        onChangeText={(text) => handleTextDetail('tatouages', text)}
                        style={styles.detailInput}
                        dense
                    />
                )}
            </View>

            <View style={styles.checkboxWithText}>
                <Checkbox.Item
                    label="Piercings"
                    status={isChecked(formData.piercings) ? 'checked' : 'unchecked'}
                    onPress={() => handleToggleCarac('piercings')}
                    position="leading"
                />
                {isChecked(formData.piercings) && (
                    <PaperTextInput
                        mode="outlined"
                        placeholder="Précisez l'emplacement"
                        value={getTextValue(formData.piercings)}
                        onChangeText={(text) => handleTextDetail('piercings', text)}
                        style={styles.detailInput}
                        dense
                    />
                )}
            </View>

            <Divider style={{ marginVertical: 12 }} />
            <Text variant="titleMedium" style={{ marginBottom: 8 }}>Taches pigmentaires</Text>

            <CheckboxField
                label="Aucun"
                id="tachesPigmentairesAucun"
                checked={formData.tachesPigmentairesAucun === 'Oui'}
                onChange={(id) => toggleTaches(id)}
            />
            <CheckboxField
                label="Visage"
                id="tachesPigmentairesVisage"
                checked={formData.tachesPigmentairesVisage === 'Oui'}
                onChange={(id) => toggleTaches(id)}
            />
            <CheckboxField
                label="Cou"
                id="tachesPigmentairesCou"
                checked={formData.tachesPigmentairesCou === 'Oui'}
                onChange={(id) => toggleTaches(id)}
            />
            <CheckboxField
                label="Décolleté"
                id="tachesPigmentairesDecollete"
                checked={formData.tachesPigmentairesDecollete === 'Oui'}
                onChange={(id) => toggleTaches(id)}
            />
            <CheckboxField
                label="Mains"
                id="tachesPigmentairesMains"
                checked={formData.tachesPigmentairesMains === 'Oui'}
                onChange={(id) => toggleTaches(id)}
            />

            <Divider style={{ marginVertical: 12 }} />
            <Text variant="titleMedium" style={{ marginBottom: 8 }}>Vergetures</Text>

            <CheckboxField
                label="Aucun"
                id="vergeturesAucun"
                checked={formData.vergeturesAucun === 'Oui'}
                onChange={(id) => toggleVergetures(id)}
            />
            <CheckboxField
                label="Jambes"
                id="vergeturesJambes"
                checked={formData.vergeturesJambes === 'Oui'}
                onChange={(id) => toggleVergetures(id)}
            />
            <CheckboxField
                label="Fesses/Hanches"
                id="vergeturesFessesHanches"
                checked={formData.vergeturesFessesHanches === 'Oui'}
                onChange={(id) => toggleVergetures(id)}
            />
            <CheckboxField
                label="Ventre/Taille"
                id="vergeturesVentreTaille"
                checked={formData.vergeturesVentreTaille === 'Oui'}
                onChange={(id) => toggleVergetures(id)}
            />
            <CheckboxField
                label="Poitrine/Décolleté"
                id="vergeturesPoitrineDecollete"
                checked={formData.vergeturesPoitrineDecollete === 'Oui'}
                onChange={(id) => toggleVergetures(id)}
            />
        </>
    );
};

const styles = StyleSheet.create({
    checkboxWithText: {
        marginBottom: 4,
    },
    detailInput: {
        marginHorizontal: 16,
        marginBottom: 8,
    },
});

export default MarquesCutaneesSection;
