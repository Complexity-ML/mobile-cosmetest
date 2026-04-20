import { useState } from 'react';
import { TabId, FormTab } from '../types';

export const useFormTabs = (initialTab: TabId = 'infos-personnelles') => {
    const [activeTab, setActiveTab] = useState<TabId>(initialTab);

    const tabs: FormTab[] = [
        { id: 'infos-personnelles', label: 'Informations personnelles', icon: 'user' },
        { id: 'caracteristiques', label: 'Caractéristiques', icon: 'activity' },
        { id: 'peau', label: 'Peau', icon: 'circle' },
        { id: 'marques-cutanees', label: 'Marques cutanées', icon: 'edit-3' },
        { id: 'cheveux', label: 'Cheveux', icon: 'scissors' },
        { id: 'cils', label: 'Cils', icon: 'eye' },
        { id: 'problemes', label: 'Problèmes', icon: 'alert-triangle' },
        { id: 'medical', label: 'Médical', icon: 'heart' },
        { id: 'medecine-esthetique', label: 'Médecine esthétique', icon: 'zap' },
        { id: 'habitudes-cosmetiques', label: 'Habitudes cosmétiques', icon: 'shopping-bag' },
        { id: 'terminer', label: 'Terminer', icon: 'check-circle' },
    ];

    return {
        activeTab,
        setActiveTab,
        tabs,
    };
};