import React from "react";
import { storyblokEditable } from "@storyblok/react";

type AboutUsBlockProps = {
  blok: {
    _uid: string;
    title: string;
    description: string;
    image?: {
      filename: string;
      alt?: string;
    };
  };
};

const AboutUsBlock: React.FC<AboutUsBlockProps> = ({ blok }) => {
  return (
    <div className="about-card" {...storyblokEditable(blok)}>
      {blok.image?.filename && (
        <img
          src={blok.image.filename}
          alt={blok.image.alt || blok.title}
          className="about-card__icon"
        />
      )}

      <h3 className="about-card__title">{blok.title}</h3>
      <p className="about-card__description">{blok.description}</p>
    </div>
  );
};

export default AboutUsBlock;
