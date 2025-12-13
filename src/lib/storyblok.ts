// storyblok.ts (clean version)
export interface StoryblokLink {
  id: string;
  url: string;
  linktype: string;
  fieldtype: string;
  cached_url: string;
}

export interface StoryblokImage {
  id: number;
  alt: string;
  name: string;
  focus: string;
  title: string;
  filename: string;
  copyright: string;
  fieldtype: string;
}

export interface HeaderContent {
  logo: StoryblokImage;
  logo_text: string;
  navigation: Array<{
    _uid: string;
    link: StoryblokLink;
    label: string;
    component: string;
  }>;
}

export interface FooterContent {
  copyright_text: string;
}

export interface PageContent {
  body: any[];
}
