import React from 'react';
import { Text, Divider } from 'react-native-paper';
import FormField from '../FormField';
import { SectionProps } from '../types';

const NotesSection: React.FC<SectionProps> = ({
    formData,
    errors,
    handleChange,
    handleBlur,
}) => {
    return (
        <>
            <Text variant="headlineMedium" style={{ marginBottom: 8 }}>Notes et commentaires</Text>
            <Divider style={{ marginBottom: 12 }} />

            <FormField
                label="Notes"
                id="notes"
                type="textarea"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Commentaires, observations, études précédentes, etc."
                numberOfLines={6}
            />
        </>
    );
};

export default NotesSection;
