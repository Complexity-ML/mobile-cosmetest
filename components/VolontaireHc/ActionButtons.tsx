import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

type ActionButtonsProps = {
  onCancel: () => void;
  onSubmit: () => void;
  loading?: boolean;
};

const ActionButtons: React.FC<ActionButtonsProps> = ({ onCancel, onSubmit, loading = false }) => {
  return (
    <View style={{ padding: 16, backgroundColor: 'white', borderTopWidth: 1, borderTopColor: '#e0e0e0' }}>
      <Button
        mode="outlined"
        onPress={onCancel}
        disabled={loading}
        style={{ marginBottom: 8 }}
      >
        Annuler
      </Button>
      <Button
        mode="contained"
        onPress={onSubmit}
        disabled={loading}
        loading={loading}
      >
        Enregistrer
      </Button>
    </View>
  );
};

export default ActionButtons;
