import React from 'react';
import { Text, Divider } from 'react-native-paper';
import FormField from '../FormField';
import CheckboxField from '../CheckboxField';
import { SectionProps } from '../types';

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
                    'SENSIBLE',
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
                    'Peau peu sensible',
                    'Peau non sensible',
                ]}
            />

            <CheckboxField
                label="Teint inhomogène"
                id="teintInhomogene"
                checked={formData.teintInhomogene === 'Oui'}
                onChange={handleChange}
            />

            <CheckboxField
                label="Teint terne"
                id="teintTerne"
                checked={formData.teintTerne === 'Oui'}
                onChange={handleChange}
            />

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
                label="Cellulite bras"
                id="celluliteBras"
                checked={formData.celluliteBras === 'Oui'}
                onChange={handleChange}
            />

            <CheckboxField
                label="Cellulite fesses/hanches"
                id="celluliteFessesHanches"
                checked={formData.celluliteFessesHanches === 'Oui'}
                onChange={handleChange}
            />

            <CheckboxField
                label="Cellulite jambes"
                id="celluliteJambes"
                checked={formData.celluliteJambes === 'Oui'}
                onChange={handleChange}
            />

            <CheckboxField
                label="Cellulite ventre/taille"
                id="celluliteVentreTaille"
                checked={formData.celluliteVentreTaille === 'Oui'}
                onChange={handleChange}
            />

            <Divider style={{ marginVertical: 12 }} />
            <Text variant="titleMedium" style={{ marginBottom: 8 }}>Sécheresse cutanée</Text>

            <CheckboxField
                label="Lèvres"
                id="secheresseLevres"
                checked={formData.secheresseLevres === 'Oui'}
                onChange={handleChange}
            />

            <CheckboxField
                label="Cou"
                id="secheresseCou"
                checked={formData.secheresseCou === 'Oui'}
                onChange={handleChange}
            />

            <CheckboxField
                label="Poitrine/Décolleté"
                id="secheressePoitrineDecollete"
                checked={formData.secheressePoitrineDecollete === 'Oui'}
                onChange={handleChange}
            />

            <CheckboxField
                label="Ventre/Taille"
                id="secheresseVentreTaille"
                checked={formData.secheresseVentreTaille === 'Oui'}
                onChange={handleChange}
            />

            <CheckboxField
                label="Fesses/Hanches"
                id="secheresseFessesHanches"
                checked={formData.secheresseFessesHanches === 'Oui'}
                onChange={handleChange}
            />

            <CheckboxField
                label="Bras"
                id="secheresseBras"
                checked={formData.secheresseBras === 'Oui'}
                onChange={handleChange}
            />

            <CheckboxField
                label="Mains"
                id="secheresseMains"
                checked={formData.secheresseMains === 'Oui'}
                onChange={handleChange}
            />

            <CheckboxField
                label="Jambes"
                id="secheresseJambes"
                checked={formData.secheresseJambes === 'Oui'}
                onChange={handleChange}
            />

            <CheckboxField
                label="Pieds"
                id="secheressePieds"
                checked={formData.secheressePieds === 'Oui'}
                onChange={handleChange}
            />

            <Divider style={{ marginVertical: 12 }} />
            <Text variant="titleMedium" style={{ marginBottom: 8 }}>Problèmes autour des yeux</Text>

            <CheckboxField
                label="Cernes pigmentaires"
                id="cernesPigmentaires"
                checked={formData.cernesPigmentaires === 'Oui'}
                onChange={handleChange}
            />

            <CheckboxField
                label="Cernes vasculaires"
                id="cernesVasculaires"
                checked={formData.cernesVasculaires === 'Oui'}
                onChange={handleChange}
            />

            <CheckboxField
                label="Poches"
                id="poches"
                checked={formData.poches === 'Oui'}
                onChange={handleChange}
            />

            <Divider style={{ marginVertical: 12 }} />
            <Text variant="titleMedium" style={{ marginBottom: 8 }}>Perte de fermeté</Text>

            <CheckboxField
                label="Visage"
                id="perteDeFermeteVisage"
                checked={formData.perteDeFermeteVisage === 'Oui'}
                onChange={handleChange}
            />

            <CheckboxField
                label="Cou"
                id="perteDeFermeteCou"
                checked={formData.perteDeFermeteCou === 'Oui'}
                onChange={handleChange}
            />

            <CheckboxField
                label="Décolleté"
                id="perteDeFermeteDecollete"
                checked={formData.perteDeFermeteDecollete === 'Oui'}
                onChange={handleChange}
            />
        </>
    );
};

export default PeauSection;
