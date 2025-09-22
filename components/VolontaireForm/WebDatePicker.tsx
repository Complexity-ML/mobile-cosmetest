import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface WebDatePickerProps {
  label: string;
  id: string;
  value?: string;
  onChange: (id: string, value: string) => void;
  placeholder?: string;
  error?: string | null;
  required?: boolean;
}

const WebDatePicker: React.FC<WebDatePickerProps> = ({ 
  label, 
  id, 
  value, 
  onChange, 
  placeholder, 
  error,
  required = false 
}) => {
  const [localValue, setLocalValue] = useState<string>(value || '');
  
  // Format de la date JJ/MM/AAAA
  const formatDate = (input: string): string => {
    // Supprime tous les caractères non numériques
    const numbersOnly = input.replace(/[^\d]/g, '');
    
    // Formate automatiquement en JJ/MM/AAAA
    if (numbersOnly.length <= 2) {
      return numbersOnly;
    } else if (numbersOnly.length <= 4) {
      return `${numbersOnly.slice(0, 2)}/${numbersOnly.slice(2)}`;
    } else {
      return `${numbersOnly.slice(0, 2)}/${numbersOnly.slice(2, 4)}/${numbersOnly.slice(4, 8)}`;
    }
  };
  
  // Validation et conversion au format ISO
  const validateAndConvert = (dateStr: string): string => {
    // Si la chaîne est vide, on retourne une chaîne vide
    if (!dateStr.trim()) return '';
    
    // Valide le format JJ/MM/AAAA
    const parts = dateStr.split('/');
    if (parts.length !== 3) return '';
    
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Mois commencent à 0 en JavaScript
    const year = parseInt(parts[2], 10);
    
    // Validation de base
    if (isNaN(day) || isNaN(month) || isNaN(year)) return '';
    if (day < 1 || day > 31 || month < 0 || month > 11 || year < 1900 || year > 2100) return '';
    
    // Crée un objet Date et vérifie sa validité
    const date = new Date(year, month, day);
    if (date.getDate() !== day || date.getMonth() !== month || date.getFullYear() !== year) {
      // Si la date n'est pas valide (comme le 31 février), JavaScript l'ajuste
      return '';
    }
    
    // Retourne la date au format ISO
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };
  
  const handleInputChange = (text: string): void => {
    const formatted = formatDate(text);
    setLocalValue(formatted);
    
    // Si l'utilisateur a entré une date complète (JJ/MM/AAAA), on la convertit en ISO
    if (formatted.length === 10) {
      const isoDate = validateAndConvert(formatted);
      if (isoDate) {
        onChange(id, isoDate);
      }
    }
  };
  
  // Pour afficher la date déjà sélectionnée au format JJ/MM/AAAA
  useEffect(() => {
    if (value) {
      try {
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
          const day = String(date.getDate()).padStart(2, '0');
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const year = date.getFullYear();
          setLocalValue(`${day}/${month}/${year}`);
        }
      } catch (e) {
        console.error('Erreur lors du formatage de la date:', e);
      }
    } else {
      setLocalValue('');
    }
  }, [value]);
  
  return (
    <TextInput
      value={localValue}
      onChangeText={handleInputChange}
      placeholder={placeholder || 'JJ/MM/AAAA'}
      keyboardType="numeric"
      maxLength={10}
    />
  );
};

export default WebDatePicker;