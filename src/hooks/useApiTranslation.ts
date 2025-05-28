
import { useTranslation } from '@/contexts/I18nContext';

export function useApiTranslation() {
  const { translateApiData } = useTranslation();

  const translateField = (data: any, field: string): string => {
    return translateApiData(data, field);
  };

  const translateArray = (array: any[], field: string): any[] => {
    return array.map(item => ({
      ...item,
      [`translated_${field}`]: translateApiData(item, field)
    }));
  };

  return {
    translateField,
    translateArray,
    translateApiData
  };
}
