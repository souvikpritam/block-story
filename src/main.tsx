// main.tsx
import { createRoot } from "react-dom/client";
import { storyblokInit, apiPlugin } from '@storyblok/react';
import App from "./App.tsx";
import "./index.css";

import SectionBlock from "./components/storyblok/SectionBlock"; // 👈 Register components here
import AboutUsBlock from "./components/storyblok/AboutUsBlock.tsx";
import HeroBlock from "./components/storyblok/HeroBlock";

const STORYBLOK_ACCESS_TOKEN =
  import.meta.env.VITE_STORYBLOK_ACCESS_TOKEN || 'QCSwgFodErIluvTtTtfKBgtt';

storyblokInit({
  accessToken: STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  apiOptions: { region: "eu" },
  components: {
    section_block: SectionBlock,
    about_us_block: AboutUsBlock,
    hero_block: HeroBlock
    //blog_post: BlogPost
  }
});

createRoot(document.getElementById("root")!).render(<App />);
