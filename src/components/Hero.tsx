import React, { useEffect, useState } from "react";
import { getStoryblokApi } from "@storyblok/react";
import { useLanguage } from "../contexts/LanguageContext";

const Hero: React.FC = () => {
  const { language } = useLanguage();
  const [hero, setHero] = useState<any>(null);

  const storyblokLanguage = language === "de" ? "German" : "";

  useEffect(() => {
    const load = async () => {
      const sb = getStoryblokApi();
      const res = await sb.get("cdn/stories/global/home", {
        version: "draft",
        language: storyblokLanguage,
      });

      const heroBlock = res.data.story.content.body.find(
        (blok: any) => blok.component === "hero_block"
      );

      setHero(heroBlock);
    };

    load();
  }, [language]);

  if (!hero) return null;

  return (
    <section
      className="hero"
      style={{
        height: "600px",
        backgroundImage: hero.image?.filename
          ? `url(${hero.image.filename})`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container">
        <div className="hero__content">
          <h1 className="hero__title">{hero.title}</h1>
          <p className="hero__description">{hero.description}</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
