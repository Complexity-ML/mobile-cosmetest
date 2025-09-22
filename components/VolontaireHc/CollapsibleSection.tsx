import React, { useState } from 'react';
import { List, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';

type CollapsibleSectionProps = {
  title: string;
  icon: string;
  children: React.ReactNode;
};

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ title, icon, children }) => {
  const [expanded, setExpanded] = useState(false);
  const theme = useTheme();

  return (
    <List.Section style={{ marginBottom: 8 }}>
      <List.Accordion
        title={title}
        titleStyle={{ fontWeight: '600' }}
        style={{ backgroundColor: theme.colors.surface, borderTopWidth: 1, borderTopColor: '#E5E7EB' }}
        left={() => <Icon name={icon} size={18} color={theme.colors.primary} />}
        expanded={expanded}
        onPress={() => setExpanded(!expanded)}
      >
        <List.Item
          title={() => <></>}
          style={{ paddingVertical: 0 }}
          description={() => <>{children}</>}
        />
      </List.Accordion>
    </List.Section>
  );
};

export default CollapsibleSection;
