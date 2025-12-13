import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type Language = 'en' | 'de';

interface Translations {
  [key: string]: {
    en: string;
    de: string;
  };
}

const translations: Translations = {
  // Header
  'nav.about': {
    en: 'About Us',
    de: 'Über Uns',
  },
  'nav.blog': {
    en: 'Blog',
    de: 'Blog',
  },
  'nav.home': {
    en: 'Home',
    de: 'Startseite',
  },
  
  // Hero
  'hero.badge': {
    en: 'Powered by Storyblok',
    de: 'Unterstützt von Storyblok',
  },
  'hero.title': {
    en: 'Build Amazing Digital Experiences',
    de: 'Erstellen Sie Erstaunliche Digitale Erlebnisse',
  },
  'hero.description': {
    en: 'Create powerful, multilingual websites with our headless CMS integration. Manage content seamlessly across multiple languages.',
    de: 'Erstellen Sie leistungsstarke, mehrsprachige Websites mit unserer Headless-CMS-Integration. Verwalten Sie Inhalte nahtlos in mehreren Sprachen.',
  },
  'hero.cta.primary': {
    en: 'Get Started',
    de: 'Jetzt Starten',
  },
  'hero.cta.secondary': {
    en: 'Learn More',
    de: 'Mehr Erfahren',
  },
  
  // Blog
  'blog.title': {
    en: 'Latest Articles',
    de: 'Neueste Artikel',
  },
  'blog.description': {
    en: 'Discover insights, tutorials, and updates from our team',
    de: 'Entdecken Sie Einblicke, Tutorials und Updates von unserem Team',
  },
  'blog.readMore': {
    en: 'Read More',
    de: 'Weiterlesen',
  },
  'blog.backToList': {
    en: '← Back to Blog',
    de: '← Zurück zum Blog',
  },
  
  // About
  'about.title': {
    en: 'About Us',
    de: 'Über Uns',
  },
  'about.description': {
    en: 'We are passionate about creating innovative digital solutions that help businesses grow and succeed in the modern world.',
    de: 'Wir sind leidenschaftlich daran interessiert, innovative digitale Lösungen zu entwickeln, die Unternehmen helfen, in der modernen Welt zu wachsen und erfolgreich zu sein.',
  },
  'about.mission.title': {
    en: 'Our Mission',
    de: 'Unsere Mission',
  },
  'about.mission.description': {
    en: 'To empower businesses with cutting-edge technology solutions that drive growth and innovation.',
    de: 'Unternehmen mit modernsten Technologielösungen zu befähigen, die Wachstum und Innovation vorantreiben.',
  },
  'about.vision.title': {
    en: 'Our Vision',
    de: 'Unsere Vision',
  },
  'about.vision.description': {
    en: 'To be the leading provider of digital transformation services globally.',
    de: 'Der weltweit führende Anbieter von Dienstleistungen für die digitale Transformation zu sein.',
  },
  'about.values.title': {
    en: 'Our Values',
    de: 'Unsere Werte',
  },
  'about.values.description': {
    en: 'Innovation, integrity, and excellence guide everything we do.',
    de: 'Innovation, Integrität und Exzellenz leiten alles, was wir tun.',
  },
  
  // Footer
  'footer.copyright': {
    en: '© 2025 SELISE Group AG. All Rights Reserved.',
    de: '© 2025 SELISE Group AG. Alle Rechte vorbehalten.',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = useCallback((key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translation[language];
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
