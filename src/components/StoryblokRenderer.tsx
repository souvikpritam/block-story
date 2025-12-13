// src/components/StoryblokRenderer.tsx
import React from "react";
import { StoryblokComponent } from "@storyblok/react";

type Props = {
  body?: any[];
};

const StoryblokRenderer: React.FC<Props> = ({ body }) => {
  if (!Array.isArray(body)) return null;
  return (
    <>
      {body.map((blok) => (
        <StoryblokComponent blok={blok} key={blok._uid} />
      ))}
    </>
  );
};

export default StoryblokRenderer;
