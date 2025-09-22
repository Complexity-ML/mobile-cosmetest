// FormTabs.tsx
import React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';

export type FormTab = {
  id: string;
  label: string;
  icon: string;
};

export interface FormTabsProps {
  tabs: FormTab[];
  activeTab: string;
  setActiveTab: (tabId: string) => void;
  orientation?: 'horizontal' | 'vertical';
}

const FormTabs: React.FC<FormTabsProps> = ({ tabs, activeTab, setActiveTab, orientation = 'horizontal' }) => {
  if (orientation === 'vertical') {
    return (
      <View
        style={{
          width: 240,
          backgroundColor: '#FFFFFF',
          borderRightWidth: 1,
          borderRightColor: '#E5E7EB',
          alignSelf: 'stretch',
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 12 }}
        >
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 12,
                marginBottom: 4,
                borderLeftWidth: 3,
                borderLeftColor: activeTab === tab.id ? '#2563EB' : 'transparent',
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => setActiveTab(tab.id)}
            >
              <Icon
                name={tab.icon}
                size={16}
                color={activeTab === tab.id ? '#2563EB' : '#6B7280'}
                style={{ marginRight: 8 }}
              />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: activeTab === tab.id ? '#2563EB' : '#6B7280',
                }}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }

  // horizontal (default)
  return (
    <View
      style={{
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        zIndex: 5,
      }}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ height: 56 }}
        contentContainerStyle={{ paddingHorizontal: 24 }}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={{
              paddingHorizontal: 12,
              paddingVertical: 12,
              marginRight: 12,
              borderBottomWidth: 2,
              borderBottomColor: activeTab === tab.id ? '#2563EB' : 'transparent',
              height: 56,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => setActiveTab(tab.id)}
          >
            <Icon
              name={tab.icon}
              size={16}
              color={activeTab === tab.id ? '#2563EB' : '#6B7280'}
              style={{ marginRight: 4 }}
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: '500',
                color: activeTab === tab.id ? '#2563EB' : '#6B7280',
                marginLeft: 6,
              }}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default FormTabs;

