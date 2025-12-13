// src/components/storyblok/SectionBlock.tsx
import React from "react";
import { storyblokEditable, renderRichText } from "@storyblok/react";

type SectionBlockProps = {
  blok: {
    _uid: string;
    title?: string;
    description?: any; // should be RichText object
  };
};

const SectionBlock: React.FC<SectionBlockProps> = ({ blok }) => {
  return (
    <section className="about-hero" {...storyblokEditable(blok)}>
     
        {blok.title && <h1 className="section__title">{blok.title}</h1>}

        {blok.description && 
          <p className="section__description">
           {blok.description}
          </p>
        }
      
    </section>
  );
};

export default SectionBlock;
