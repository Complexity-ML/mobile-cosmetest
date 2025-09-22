// CollapsibleSection.tsx
import React, { useState, ReactNode } from 'react';
import { View } from 'react-native';
import { List, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';

export interface CollapsibleSectionProps {
  title: string;
  children: ReactNode;
  isOpen?: boolean;
  icon?: ReactNode;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  children,
  isOpen = false,
  icon = null,
}) => {
  const [expanded, setExpanded] = useState(isOpen);

  return (
    <View style={{
      marginBottom: 24,
      borderWidth: 1,
      borderColor: '#E5E7EB',
      borderRadius: 8,
      backgroundColor: '#FFFFFF',
      overflow: 'hidden',
    }}>
      <List.Accordion
        title={title}
        left={() => icon}
        expanded={expanded}
        onPress={() => setExpanded(!expanded)}
        style={{
          backgroundColor: '#FFFFFF',
          paddingHorizontal: 16,
          paddingVertical: 16,
        }}
        titleStyle={{
          fontSize: 18,
          fontWeight: '600',
          color: '#1F2937',
        }}
      >
        <View style={{ padding: 16, borderTopWidth: 1, borderTopColor: '#E5E7EB' }}>
          {children}
        </View>
      </List.Accordion>
    </View>
  );
};

export default CollapsibleSection;