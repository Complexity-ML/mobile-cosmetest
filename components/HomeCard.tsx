import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Card } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';

type Props = {
  title: string;
  description: string;
  icon: string;
  tintColor?: string;
  iconColor?: string;
  onPress: () => void;
};

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

export default function HomeCard({ title, description, icon, tintColor = '#EEF2FF', iconColor = '#6366F1', onPress }: Props) {
  return (
    <Card mode="elevated" onPress={onPress} style={styles.card}>
      <Card.Content style={styles.content}>
        <View style={[styles.iconBadge, { backgroundColor: tintColor }]}> 
          <Feather name={icon as any} size={28} color={iconColor} />
        </View>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        <Text style={styles.description} numberOfLines={4}>{description}</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: 14,
    marginBottom: 16,
    overflow: 'hidden',
  },
  content: {
    paddingVertical: 18,
  },
  iconBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  title: {
    fontSize: isTablet ? 18 : 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  description: {
    fontSize: isTablet ? 15 : 14,
    color: '#6B7280',
    lineHeight: 20,
  },
});
