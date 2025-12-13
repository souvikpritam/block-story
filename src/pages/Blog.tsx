import React from 'react';
import Layout from '../components/Layout';
import BlogList from '../components/BlogList';
import { useLanguage } from '../contexts/LanguageContext';

const Blog: React.FC = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      <section className="about-hero">
        <div className="container">
          <h1 className="about-hero__title">{t('blog.title')}</h1>
          <p className="about-hero__description">{t('blog.description')}</p>
        </div>
      </section>
      <BlogList />
    </Layout>
  );
};

export default Blog;
