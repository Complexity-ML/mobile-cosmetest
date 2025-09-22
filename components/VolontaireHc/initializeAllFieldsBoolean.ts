import { FormData, FormSection } from '../../types';
import { FORM_SECTIONS } from './formConfig';

/**
 * Crée un objet FormData avec toutes les options du formulaire initialisées à false
 * @param idVol - ID du volontaire
 * @returns Un objet FormData avec toutes les options initialisées à false
 */
export const initializeAllFieldsBoolean = (idVol?: string | number): FormData => {
  const initialData: FormData = { idVol };

  // Parcourir toutes les sections et groupes pour initialiser tous les champs à false
  FORM_SECTIONS.forEach(section => {
    section.groups.forEach(group => {
      group.items.forEach(item => {
        initialData[item.id] = false;
      });
    });
  });

  return initialData;
};