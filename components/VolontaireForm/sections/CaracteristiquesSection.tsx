import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Divider, Checkbox } from 'react-native-paper';
import FormField from '../FormField';
import { SectionProps } from '../types';

const ETHNIES_PRINCIPALES = [
    'Caucasienne',
    'Africaine',
    'Antillaise',
    'Indienne',
    'Asiatique',
] as const;

const SOUS_ETHNIES_PAR_ETHNIE: Record<string, string[]> = {
    'Caucasienne': [
        'EUROP_OUEST',
        'EUROP_EST',
        'MEDITERRANEEN',
        'NORD_AMERICAIN_CAUCASIEN',
        'SUD_AMERICAIN_CAUCASIEN',
    ],
    'Africaine': [
        'AF_SUBSAHARIEN',
        'AF_OUEST',
        'AF_EST',
        'AF_CENTRALE',
        'AF_NORD',
    ],
    'Antillaise': [
        'AFRO_CARABEEN',
        'ANTILLAIS_METISSE',
        'CARIBEENNE',
        'AFRO_DESCENDANT_CARAIBES',
    ],
    'Indienne': [
        'IND_NORD',
        'IND_SUD',
        'INDO_ARYENNE',
        'DRAVIDIENNE',
        'INDO_PAKISTANAISE',
    ],
    'Asiatique': [
        'AS_EST',
        'AS_SUD_EST',
        'AS_SUD',
        'AS_CENTRALE',
    ],
};

const SOUS_ETHNIE_LABELS: Record<string, string> = {
    'EUROP_OUEST': 'Europe de l\'Ouest',
    'EUROP_EST': 'Europe de l\'Est',
    'MEDITERRANEEN': 'Méditerranéen',
    'NORD_AMERICAIN_CAUCASIEN': 'Nord-Américain Caucasien',
    'SUD_AMERICAIN_CAUCASIEN': 'Sud-Américain Caucasien',
    'AF_SUBSAHARIEN': 'Afrique Subsaharienne',
    'AF_OUEST': 'Afrique de l\'Ouest',
    'AF_EST': 'Afrique de l\'Est',
    'AF_CENTRALE': 'Afrique Centrale',
    'AF_NORD': 'Afrique du Nord',
    'AFRO_CARABEEN': 'Afro-Caribéen',
    'ANTILLAIS_METISSE': 'Antillais Métissé',
    'CARIBEENNE': 'Caribéenne',
    'AFRO_DESCENDANT_CARAIBES': 'Afro-Descendant Caraïbes',
    'IND_NORD': 'Inde du Nord',
    'IND_SUD': 'Inde du Sud',
    'INDO_ARYENNE': 'Indo-Aryenne',
    'DRAVIDIENNE': 'Dravidienne',
    'INDO_PAKISTANAISE': 'Indo-Pakistanaise',
    'AS_EST': 'Asie de l\'Est',
    'AS_SUD_EST': 'Asie du Sud-Est',
    'AS_SUD': 'Asie du Sud',
    'AS_CENTRALE': 'Asie Centrale',
};

const parseCSV = (val: any): string[] => {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    return String(val).split(',').filter((e: string) => e.trim() !== '');
};

const CaracteristiquesSection: React.FC<SectionProps> = ({
    formData,
    errors,
    handleChange,
    handleBlur,
}) => {
    const ethniesSelectionnees = parseCSV(formData.ethnie);
    const sousEthniesSelectionnees = parseCSV(formData.sousEthnie);

    const handleEthnieToggle = (ethnie: string) => {
        let newEthnies: string[];

        if (ethniesSelectionnees.includes(ethnie)) {
            newEthnies = ethniesSelectionnees.filter(e => e !== ethnie);
            // Retirer les sous-ethnies liées
            const sousEthniesDeEthnie = SOUS_ETHNIES_PAR_ETHNIE[ethnie] || [];
            const newSousEthnies = sousEthniesSelectionnees.filter(
                se => !sousEthniesDeEthnie.includes(se)
            );
            handleChange('sousEthnie', newSousEthnies.join(','));
        } else {
            if (ethniesSelectionnees.length >= 2) return;
            newEthnies = [...ethniesSelectionnees, ethnie];
        }

        handleChange('ethnie', newEthnies.join(','));
    };

    const handleSousEthnieToggle = (sousEthnie: string) => {
        let newSousEthnies: string[];

        if (sousEthniesSelectionnees.includes(sousEthnie)) {
            newSousEthnies = sousEthniesSelectionnees.filter(se => se !== sousEthnie);
        } else {
            newSousEthnies = [...sousEthniesSelectionnees, sousEthnie];
        }

        handleChange('sousEthnie', newSousEthnies.join(','));
    };

    const sousEthniesDisponibles: string[] = [];
    ethniesSelectionnees.forEach(ethnie => {
        const sousEthnies = SOUS_ETHNIES_PAR_ETHNIE[ethnie] || [];
        sousEthniesDisponibles.push(...sousEthnies);
    });

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

            {/* Ethnie principale - checkboxes (max 2) */}
            <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Ethnie <Text style={styles.hint}>(max 2)</Text></Text>
                <View style={styles.checkboxGroup}>
                    {ETHNIES_PRINCIPALES.map((ethnie) => {
                        const isSelected = ethniesSelectionnees.includes(ethnie);
                        const isDisabled = !isSelected && ethniesSelectionnees.length >= 2;
                        return (
                            <Checkbox.Item
                                key={ethnie}
                                label={ethnie}
                                status={isSelected ? 'checked' : 'unchecked'}
                                onPress={() => !isDisabled && handleEthnieToggle(ethnie)}
                                disabled={isDisabled}
                                style={styles.checkboxItem}
                                labelStyle={[styles.checkboxLabel, isDisabled && styles.checkboxLabelDisabled]}
                                mode="android"
                            />
                        );
                    })}
                </View>
            </View>

            {/* Sous-ethnies dynamiques */}
            <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Sous-ethnie</Text>
                {sousEthniesDisponibles.length > 0 ? (
                    <View style={styles.checkboxGroup}>
                        {sousEthniesDisponibles.map((sousEthnie) => (
                            <Checkbox.Item
                                key={sousEthnie}
                                label={SOUS_ETHNIE_LABELS[sousEthnie] || sousEthnie}
                                status={sousEthniesSelectionnees.includes(sousEthnie) ? 'checked' : 'unchecked'}
                                onPress={() => handleSousEthnieToggle(sousEthnie)}
                                style={styles.checkboxItem}
                                labelStyle={styles.checkboxLabel}
                                mode="android"
                            />
                        ))}
                    </View>
                ) : (
                    <Text style={styles.hintText}>Sélectionnez d'abord une ethnie</Text>
                )}
            </View>

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

const styles = StyleSheet.create({
    fieldContainer: {
        marginBottom: 16,
    },
    fieldLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#1F2937',
        marginBottom: 4,
    },
    hint: {
        fontSize: 12,
        color: '#9CA3AF',
        fontWeight: '400',
    },
    hintText: {
        fontSize: 13,
        color: '#9CA3AF',
        fontStyle: 'italic',
        paddingVertical: 8,
    },
    checkboxGroup: {
        backgroundColor: '#F9FAFB',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        overflow: 'hidden',
    },
    checkboxItem: {
        paddingVertical: 2,
    },
    checkboxLabel: {
        fontSize: 14,
    },
    checkboxLabelDisabled: {
        color: '#D1D5DB',
    },
});

export default CaracteristiquesSection;
