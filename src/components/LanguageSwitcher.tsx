
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
          className="flex items-center gap-2 hover:bg-white/10 transition-all duration-200 hover:scale-105"
        >
          <Globe className="h-4 w-4" />
          {showLabel && currentLang && (
            <>
              <span className="hidden sm:inline text-lg">{currentLang.flag}</span>
              <span className="hidden md:inline font-medium">{currentLang.name}</span>
            </>
          )}
          {!showLabel && currentLang && (
            <span className="text-lg">{currentLang.flag}</span>
          )}
          <ChevronDown className="h-3 w-3 opacity-70 transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-44 bg-white/98 backdrop-blur-md border border-white/30 shadow-xl rounded-xl overflow-hidden"
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-all duration-200 ${
              language === lang.code 
                ? 'bg-primary/10 text-primary font-semibold border-l-4 border-primary' 
                : 'hover:bg-neutral-50 hover:translate-x-1'
            }`}
          >
            <span className="text-xl">{lang.flag}</span>
            <span className="flex-1">{lang.name}</span>
            {language === lang.code && (
              <span className="text-primary text-lg">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
