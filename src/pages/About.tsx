import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import StoryblokRenderer from "../components/StoryblokRenderer";
import { getStoryblokApi } from "@storyblok/react";
import { useLanguage } from "../contexts/LanguageContext";

const About: React.FC = () => {
  const { language } = useLanguage();
  const [body, setBody] = useState<any[]>([]);
  const [aboutItems, setAboutItems] = useState<any[]>([]);

  const storyblokLanguage = language === "de" ? "German" : "";

  useEffect(() => {
    const load = async () => {
      const sb = getStoryblokApi();
      const res = await sb.get("cdn/stories/global/about", {
        version: "draft",
        language: storyblokLanguage,
      });

      const content = res.data.story?.content;
      setBody(content?.body || []);
      setAboutItems(content?.about_items || []);
    };

    load();
  }, [language]);

  return (
    <Layout>
      {/* Section blocks */}
      <StoryblokRenderer body={body} />

      {/* About repeater */}
      <section className="about-content">
        <div className="container">
          <div className="about-grid">
            {aboutItems.map((blok) => (
              <StoryblokRenderer key={blok._uid} body={[blok]} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
