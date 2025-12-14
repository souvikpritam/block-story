import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStoryblokApi } from '@storyblok/react';
import { useLanguage, Language } from '../contexts/LanguageContext';
import { HeaderContent } from '../lib/storyblok';

const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const storyblokApi = useStoryblokApi();

  const [headerData, setHeaderData] = useState<HeaderContent | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  // Storyblok's language mapping
  const storyblokLanguage = language === 'de' ? 'German' : '';

  // ------------------------
  // Fetch Header from Storyblok
  // ------------------------
  useEffect(() => {
    const fetchHeader = async () => {
      try {
        const { data } = await storyblokApi.get('cdn/stories/global/header', {
          version: 'draft',
          language: storyblokLanguage,
        });

        setHeaderData(data.story.content as HeaderContent);
      } catch (error) {
        console.error('Error fetching header:', error);
      }
    };

    fetchHeader();
  }, [storyblokApi, storyblokLanguage]);

  const logoUrl = headerData?.logo?.filename;
  const navItems = headerData?.navigation || [];

  return (
    <header className="header">
      <div className="container header__container">

        <div className="header__left">
          {/* LOGO */}
          <Link to="/" className="header__logo">
            {logoUrl ? (
              <img src={logoUrl} alt={headerData?.logo_text || 'Logo'} className="header__logo-img" />
            ) : (
              <div>{headerData?.logo_text || 'SELISE'}</div>
            )}
          </Link>

          {/* DYNAMIC NAVIGATION */}
          <nav className="header__nav">
            {navItems.map((item) => {
              const url = item.link?.cached_url || '#';

              return (
                <Link
                  key={item._uid}
                  to={`${url}`}
                  className={`header__nav-link ${isActive(`${url}`) ? 'active' : ''}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* RIGHT SIDE */}
        <div className="header__right">
          
          {/* LANGUAGE SWITCHER */}
          <div className="lang-switcher">
            <button
              className={`lang-switcher__btn ${language === 'en' ? 'active' : ''}`}
              onClick={() => handleLanguageChange('en')}
            >
              EN
            </button>
            <button
              className={`lang-switcher__btn ${language === 'de' ? 'active' : ''}`}
              onClick={() => handleLanguageChange('de')}
            >
              DE
            </button>
          </div>

          <button 
            className={`mobile-menu-btn ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="mobile-menu">
          <Link 
            to="/" 
            className={`mobile-menu__link ${isActive('/') ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            {t('nav.home')}
          </Link>
          <Link 
            to="/about" 
            className={`mobile-menu__link ${isActive('/about') ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            {t('nav.about')}
          </Link>
          
        </nav>
      )}
    </header>

  );
};

export default Header;
