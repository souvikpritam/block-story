import React from 'react';
import BlogCard from './BlogCard';
import { useLanguage } from '../contexts/LanguageContext';

interface BlogPost {
  id: string;
  title: {
    en: string;
    de: string;
  };
  excerpt: {
    en: string;
    de: string;
  };
  category: {
    en: string;
    de: string;
  };
  date: string;
  image: string;
  slug: string;
}

// Sample blog data - In production, this would come from Storyblok
const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: {
      en: 'Getting Started with Headless CMS',
      de: 'Erste Schritte mit Headless CMS',
    },
    excerpt: {
      en: 'Learn how to leverage headless CMS architecture to build modern, scalable web applications with unprecedented flexibility.',
      de: 'Erfahren Sie, wie Sie die Headless-CMS-Architektur nutzen können, um moderne, skalierbare Webanwendungen mit beispielloser Flexibilität zu erstellen.',
    },
    category: {
      en: 'Technology',
      de: 'Technologie',
    },
    date: '2025-01-10',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop',
    slug: 'getting-started-headless-cms',
  },
  {
    id: '2',
    title: {
      en: 'Multilingual Website Best Practices',
      de: 'Best Practices für Mehrsprachige Websites',
    },
    excerpt: {
      en: 'Discover the essential strategies for building truly global websites that resonate with audiences across different cultures.',
      de: 'Entdecken Sie die wesentlichen Strategien für den Aufbau wirklich globaler Websites, die bei Zielgruppen verschiedener Kulturen Anklang finden.',
    },
    category: {
      en: 'Design',
      de: 'Design',
    },
    date: '2025-01-08',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop',
    slug: 'multilingual-website-best-practices',
  },
  {
    id: '3',
    title: {
      en: 'The Future of Content Management',
      de: 'Die Zukunft des Content Managements',
    },
    excerpt: {
      en: 'Explore emerging trends in content management and how they will shape the digital landscape in the coming years.',
      de: 'Erkunden Sie aufkommende Trends im Content Management und wie sie die digitale Landschaft in den kommenden Jahren prägen werden.',
    },
    category: {
      en: 'Insights',
      de: 'Einblicke',
    },
    date: '2025-01-05',
    image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&h=400&fit=crop',
    slug: 'future-of-content-management',
  },
];

const BlogList: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <section className="blog-section">
      <div className="container">
        <div className="section__header">
          <h2 className="section__title">{t('blog.title')}</h2>
          <p className="section__description">{t('blog.description')}</p>
        </div>
        
        <div className="blog-grid">
          {blogPosts.map((post) => (
            <BlogCard
              key={post.id}
              id={post.id}
              title={post.title[language]}
              excerpt={post.excerpt[language]}
              category={post.category[language]}
              date={new Date(post.date).toLocaleDateString(language === 'de' ? 'de-DE' : 'en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
              image={post.image}
              slug={post.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogList;
