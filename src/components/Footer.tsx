import React, { useEffect, useState } from 'react';
import { useStoryblokApi } from '@storyblok/react';
import { useLanguage } from '../contexts/LanguageContext';
import { FooterContent } from '../lib/storyblok';

const Footer: React.FC = () => {
  const { language, t } = useLanguage();
  const storyblokApi = useStoryblokApi();
  const [footerContent, setFooterContent] = useState<FooterContent | null>(null);

  // Map app language codes to Storyblok language codes
  const storyblokLanguage = language === 'de' ? 'German' : '';

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const { data } = await storyblokApi.get('cdn/stories/global/footer', {
          version: 'draft',
          language: storyblokLanguage,
        });
        setFooterContent(data.story.content);
      } catch (error) {
        console.error('Error fetching footer:', error);
      }
    };

    fetchFooter();
  }, [storyblokApi, storyblokLanguage]);

  const copyrightText = footerContent?.copyright_text || t('footer.copyright');

  return (
    <footer className="footer">
      <div className="container footer__container">
        <p className="footer__copyright">{copyrightText}</p>
      </div>
    </footer>
  );
};

export default Footer;