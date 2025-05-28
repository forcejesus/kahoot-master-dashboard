
import { useTranslation } from '@/contexts/I18nContext';
import { useI18n } from '@/contexts/I18nContext';

export function useApiTranslation() {
  const { translateApiData } = useTranslation();
  const { language } = useI18n(); // Ajout pour forcer la re-render quand la langue change

  const translateField = (data: any, field: string): string => {
    if (!data) return '';
    return translateApiData(data, field);
  };

  const translateArray = (array: any[], field: string): any[] => {
    if (!array || !Array.isArray(array)) return [];
    return array.map(item => ({
      ...item,
      [`translated_${field}`]: translateApiData(item, field)
    }));
  };

  // Nouvelle fonction pour traduire un objet complet
  const translateObject = (data: any, fields: string[]): any => {
    if (!data) return data;
    
    const translatedData = { ...data };
    fields.forEach(field => {
      translatedData[`translated_${field}`] = translateApiData(data, field);
    });
    
    return translatedData;
  };

  return {
    translateField,
    translateArray,
    translateObject,
    translateApiData,
    language // Exposer la langue pour forcer les re-renders
  };
}
