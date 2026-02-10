import React from 'react';
import { Text, Divider } from 'react-native-paper';
import FormField from '../FormField';
import { SectionProps } from '../types';

const InfosPersonnellesSection: React.FC<SectionProps> = ({
    formData,
    errors,
    handleChange,
    handleBlur,
    focusFieldId,
    focusRequestId,
}) => {
    return (
        <>
            <Text variant="headlineMedium" style={{ marginBottom: 8 }}>Informations personnelles</Text>
            <Divider style={{ marginBottom: 12 }} />

            <FormField
                label="Titre"
                id="titre"
                type="select"
                value={formData.titre}
                onChange={handleChange}
                autoFocus={focusFieldId === 'titre'}
                focusRequestId={focusRequestId}
                options={[
                    'Madame',
                    'Monsieur',
                    'Autre',
                ]}
            />

            <FormField
                label="Nom"
                id="nomVol"
                type="text"
                value={formData.nomVol}
                onChange={handleChange}
                onBlur={() => handleBlur('nomVol')}
                required
                error={errors.nomVol}
                autoFocus={focusFieldId === 'nomVol'}
                focusRequestId={focusRequestId}
            />

            <FormField
                label="Prénom"
                id="prenomVol"
                type="text"
                value={formData.prenomVol}
                onChange={handleChange}
                onBlur={() => handleBlur('prenomVol')}
                required
                error={errors.prenomVol}
                autoFocus={focusFieldId === 'prenomVol'}
                focusRequestId={focusRequestId}
            />

            <FormField
                label="Email"
                id="email"
                type="text"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur('email')}
                required
                error={errors.email}
                autoFocus={focusFieldId === 'email'}
                focusRequestId={focusRequestId}
            />

            <FormField
                label="Téléphone portable"
                id="telephone"
                type="text"
                value={formData.telephone}
                onChange={handleChange}
                onBlur={() => handleBlur('telephone')}
                required
                error={errors.telephone}
                autoFocus={focusFieldId === 'telephone'}
                focusRequestId={focusRequestId}
            />

            <FormField
                label="Téléphone fixe"
                id="telephoneDomicile"
                type="text"
                value={formData.telephoneDomicile}
                onChange={handleChange}
            />

            <FormField
                label="Date de naissance"
                id="dateNaissance"
                type="date"
                value={formData.dateNaissance}
                onChange={handleChange}
                placeholder="Sélectionner une date"
                onBlur={() => handleBlur('dateNaissance')}
                required
                error={errors.dateNaissance}
                autoFocus={focusFieldId === 'dateNaissance'}
                focusRequestId={focusRequestId}
            />

            <FormField
                label="Sexe"
                id="sexe"
                type="select"
                value={formData.sexe}
                onChange={handleChange}
                onBlur={() => handleBlur('sexe')}
                required
                error={errors.sexe}
                autoFocus={focusFieldId === 'sexe'}
                focusRequestId={focusRequestId}
                options={[
                    'Masculin',
                    'Feminin',
                    'Autre',
                ]}
            />

            <Divider style={{ marginVertical: 12 }} />
            <Text variant="titleMedium" style={{ marginBottom: 8 }}>Adresse</Text>

            <FormField
                label="Adresse"
                id="adresse"
                type="text"
                value={formData.adresse}
                onChange={handleChange}
            />

            <FormField
                label="Code postal"
                id="codePostal"
                type="text"
                value={formData.codePostal}
                onChange={handleChange}
                error={errors.codePostal}
            />

            <FormField
                label="Ville"
                id="ville"
                type="text"
                value={formData.ville}
                onChange={handleChange}
            />

            <FormField
                label="Pays"
                id="pays"
                type="text"
                value={formData.pays}
                onChange={handleChange}
            />
        </>
    );
};

export default InfosPersonnellesSection;
