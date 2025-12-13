import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import SectionBlock from "./storyblok/SectionBlock";
import { getStoryblokApi } from "@storyblok/react";
import { useLanguage } from "../contexts/LanguageContext"; // ✅ import

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  slug: string;
}

const BlogList: React.FC = () => {
  const { language } = useLanguage(); // ✅ use context
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [section, setSection] = useState<any>(null);

  const storyblokLanguage = language === "de" ? "German" : "";

  useEffect(() => {
    const loadData = async () => {
      const sb = getStoryblokApi();

      /** 1️⃣ Fetch blog posts */
      const blogRes = await sb.get("cdn/stories", {
        starts_with: "global/blog",
        version: "draft",
        language: storyblokLanguage,
        is_startpage: false,
      });

      const posts = blogRes.data.stories.map((story: any) => ({
        id: story.id,
        title: story.content?.Title || "",
        excerpt: story.content?.Excerpt || "",
        image: story.content?.image?.filename || "",
        slug: story.slug,
      }));

      setBlogs(posts);

      /** 2️⃣ Fetch section block */
      const sectionRes = await sb.get("cdn/stories/global/home", {
        version: "draft",
        language: storyblokLanguage,
      });

      const sectionBlock =
        sectionRes.data.story?.content?.body.find(
          (blok: any) => blok.component === "section_block"
        );

      setSection(sectionBlock || null);
    };

    loadData();
  }, [language]); // ✅ re-run when language changes

  return (
    <section className="blog-section">
      <div className="container">
        {/* ✅ DO NOT SKIP */}
        {section && <SectionBlock blok={section} />}

        <div className="blog-grid">
          {blogs.map((post) => (
            <BlogCard
              key={post.id}
              title={post.title}
              excerpt={post.excerpt}
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
