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
  const activeIndex = Math.max(0, tabs.findIndex((tab) => tab.id === activeTab));
  const progress = tabs.length > 0 ? ((activeIndex + 1) / tabs.length) * 100 : 0;
  const activeLabel = tabs[activeIndex]?.label ?? '';

  const ProgressSummary = () => (
    <View style={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 10 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <Text style={{ color: '#6B7280', fontSize: 13, fontWeight: '600' }}>
          Etape {activeIndex + 1} sur {tabs.length}
        </Text>
        <Text style={{ color: '#111827', fontSize: 15, fontWeight: '700', flex: 1, textAlign: 'right' }} numberOfLines={1}>
          {activeLabel}
        </Text>
      </View>
      <View style={{ height: 6, backgroundColor: '#E5E7EB', borderRadius: 999, marginTop: 10, overflow: 'hidden' }}>
        <View style={{ width: `${progress}%`, height: '100%', backgroundColor: '#2563EB', borderRadius: 999 }} />
      </View>
    </View>
  );

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
        <ProgressSummary />
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
                marginHorizontal: 8,
                borderRadius: 6,
                backgroundColor: activeTab === tab.id ? '#EFF6FF' : 'transparent',
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
      <ProgressSummary />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ height: 48 }}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 8 }}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={{
              paddingHorizontal: 12,
              paddingVertical: 8,
              marginRight: 8,
              borderRadius: 999,
              borderWidth: 1,
              borderColor: activeTab === tab.id ? '#2563EB' : '#D1D5DB',
              backgroundColor: activeTab === tab.id ? '#EFF6FF' : '#FFFFFF',
              height: 40,
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

