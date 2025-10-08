// app/components/TranslationComponent.tsx
import React from 'react';
import { useTranslations } from '../hooks/useTranslations';

type TranslationComponentProps = {
  children?: React.ReactNode;
  keyName: string;
  fallback?: string;
  components?: Record<string, React.ReactNode>;
};

export const TranslationComponent: React.FC<TranslationComponentProps> = ({ 
  keyName, 
  fallback,
  components = {}
}) => {
  const { t } = useTranslations();
  const translation = t(keyName, fallback);

  // Process components in translation if needed
  if (Object.keys(components).length > 0 && typeof translation === 'string') {
    let result: React.ReactNode[] = [];
    let text = translation;
    let index = 0;
    
    Object.entries(components).forEach(([compKey, compValue]) => {
      const placeholder = `{${compKey}}`;
      const parts = text.split(placeholder);
      
      if (parts.length > 1) {
        result = [];
        
        for (let i = 0; i < parts.length; i++) {
          if (i > 0) {
            result.push(React.cloneElement(compValue as React.ReactElement, { key: `${compKey}-${i}` }));
          }
          if (parts[i]) {
            result.push(<span key={`text-${index++}`}>{parts[i]}</span>);
          }
        }
      }
    });
    
    return <>{result.length > 0 ? result : translation}</>;
  }

  return <>{translation}</>;
};