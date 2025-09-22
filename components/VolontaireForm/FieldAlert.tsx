// FieldAlert.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface FieldAlertProps {
  message: string;
}

const FieldAlert: React.FC<FieldAlertProps> = ({ message }) => {
  if (!message) return null;
  
  return (
    <View style={styles.alertContainer}>
      <Icon name="alert-circle" size={14} color="#DC2626" />
      <Text style={styles.alertText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  alertContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 8,
  },
  alertText: {
    color: '#DC2626',
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '500',
  },
});

export default FieldAlert;