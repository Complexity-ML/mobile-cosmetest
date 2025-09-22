import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import { View, Text } from 'react-native';

type Props = {
  title: string;
  icon?: string;
  children: ReactNode;
};

export default function Section({ title, icon, children }: Props) {
  return (
    <Card style={styles.card} mode="elevated">
      <Card.Content>
        <View style={styles.header}>
          {icon ? <Feather name={icon as any} size={18} color="#2563EB" /> : null}
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.content}>{children}</View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    borderRadius: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: { fontWeight: '600', marginLeft: 6, color: '#111827' },
  content: {
    paddingTop: 4,
  },
});
