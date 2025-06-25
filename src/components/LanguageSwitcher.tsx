
import React from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useI18n } from '@/contexts/I18nContext';
import { Language } from '@/types/i18n';

const languages: Array<{ code: Language; name: string; flag: string }> = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
];

interface LanguageSwitcherProps {
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'sm' | 'default' | 'lg';
  showLabel?: boolean;
}

export function LanguageSwitcher({ 
  variant = 'ghost', 
  size = 'sm', 
  showLabel = false 
}: LanguageSwitcherProps) {
  const { language, setLanguage } = useI18n();
  const currentLang = languages.find(lang => lang.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant={variant} 
          size={size}
          className="flex items-center gap-2 hover:bg-white/10 transition-colors"
        >
          <Globe className="h-4 w-4" />
          {showLabel && currentLang && (
            <>
              <span className="hidden sm:inline">{currentLang.flag}</span>
              <span className="hidden md:inline">{currentLang.name}</span>
            </>
          )}
          {!showLabel && currentLang && (
            <span>{currentLang.flag}</span>
          )}
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-40 bg-white/95 backdrop-blur-sm border border-white/20 shadow-xl"
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`flex items-center gap-3 px-3 py-2 cursor-pointer transition-colors ${
              language === lang.code 
                ? 'bg-primary/10 text-primary font-medium' 
                : 'hover:bg-gray-50'
            }`}
          >
            <span className="text-lg">{lang.flag}</span>
            <span>{lang.name}</span>
            {language === lang.code && (
              <span className="ml-auto text-primary">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
