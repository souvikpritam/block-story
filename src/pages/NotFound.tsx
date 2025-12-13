import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useLanguage } from '../contexts/LanguageContext';

const NotFound: React.FC = () => {
  const { language } = useLanguage();

  return (
    <Layout>
      <section className="about-hero" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 className="about-hero__title" style={{ fontSize: 'var(--text-5xl)' }}>404</h1>
          <p className="about-hero__description" style={{ marginBottom: 'var(--space-8)' }}>
            {language === 'de' 
              ? 'Seite nicht gefunden' 
              : 'Page not found'}
          </p>
          <Link to="/" className="btn btn--primary">
            {language === 'de' ? 'Zurück zur Startseite' : 'Back to Home'}
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
