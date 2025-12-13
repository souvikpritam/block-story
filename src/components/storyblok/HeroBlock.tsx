import React from "react";
import { storyblokEditable } from "@storyblok/react";

const HeroBlock = ({ blok }: any) => {
  const backgroundImage = blok.image?.filename
    ? `url(${blok.image.filename})`
    : undefined;

  return (
    <section
      className="hero"
      {...storyblokEditable(blok)}
      style={{
        height: "600px",
        backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container">
        <div className="hero__content">
          <h1 className="hero__title">{blok.title}</h1>
          <p className="hero__description">{blok.description}</p>
        </div>
      </div>
    </section>
  );
};

export default HeroBlock;
