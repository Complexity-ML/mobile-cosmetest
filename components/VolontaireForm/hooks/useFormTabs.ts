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
        { id: 'mesures', label: 'Mesures', icon: 'bar-chart-2' },
        { id: 'notes', label: 'Notes', icon: 'file-text' },
    ];

    return {
        activeTab,
        setActiveTab,
        tabs,
    };
};