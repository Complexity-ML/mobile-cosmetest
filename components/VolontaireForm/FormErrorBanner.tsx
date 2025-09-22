import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Banner, TouchableRipple } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';

type Props = {
  errors: Record<string, string>;
  getFieldLabel: (key: string) => string;
  onItemPress: (key: string) => void;
};

export default function FormErrorBanner({ errors, getFieldLabel, onItemPress }: Props) {
  const visible = Object.keys(errors || {}).length > 0;
  if (!visible) return null;

  return (
    <Banner
      visible
      icon={({ size }) => <Feather name="alert-triangle" size={size} color="#B91C1C" />}
      style={styles.banner}
    >
      <Text style={styles.title}>Veuillez compléter les champs obligatoires suivants :</Text>
      <View style={styles.list}>
        {Object.keys(errors).map((key) => (
          <TouchableRipple key={key} onPress={() => onItemPress(key)} borderless style={styles.itemWrap}>
            <View style={styles.itemRow}>
              <Feather name="chevron-right" size={16} color="#B91C1C" />
              <Text style={styles.itemText}>
                {getFieldLabel(key)} : {errors[key]}
              </Text>
            </View>
          </TouchableRipple>
        ))}
      </View>
    </Banner>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#FEE2E2',
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    color: '#B91C1C',
    fontWeight: '600',
    marginBottom: 8,
  },
  list: {
    marginLeft: 8,
  },
  itemWrap: {
    borderRadius: 6,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 4,
    paddingRight: 8,
  },
  itemText: {
    marginLeft: 6,
    color: '#B91C1C',
    flex: 1,
    flexWrap: 'wrap',
  },
});

