import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../components/Layout";
import { getStoryblokApi } from "@storyblok/react";
import { useLanguage } from "../contexts/LanguageContext";

// Helper to get ordinal suffix (English only)
function getOrdinal(n: number) {
  if (n > 3 && n < 21) return "th";
  switch (n % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

// Format date depending on language
function formatDate(dateStr: string, lang: string) {
  if (!dateStr) return null;

  const date = new Date(dateStr.split(" ")[0]); // ignore time
  const day = date.getDate();
  const month = date.toLocaleString(lang === "de" ? "de-DE" : "en-US", {
    month: "long",
  });
  const year = date.getFullYear();

  if (lang === "en") {
    const ordinal = getOrdinal(day);
    return (
      <>
        {day}
        <sup>{ordinal}</sup> {month}, {year}
      </>
    );
  }

  // German format: 12. Dezember 2025
  if (lang === "de") {
    return (
      <>
        {day}. {month} {year}
      </>
    );
  }

  // fallback to ISO
  return date.toDateString();
}

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language, t } = useLanguage(); // get current language and translation function
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    const loadPost = async () => {
      const sb = getStoryblokApi();
      try {
        const res = await sb.get(`cdn/stories/global/blog/${slug}`, {
          version: "draft",
          language: language === "de" ? "German" : "",
        });
        setPost(res.data.story);
      } catch (err) {
        console.error("Failed to load blog post:", err);
      }
    };
    loadPost();
  }, [slug, language]);

  const Title = post?.content?.Title || "";
  const image = post?.content?.image;
  const rawDate = post?.content?.date;
  const content = post?.content?.content || "";

  return (
    <Layout>
      <article className="blog-detail">
        <div className="container">
          

          <header className="blog-detail__header">
            {Title && <h1 className="blog-detail__title">{Title}</h1>}

            {rawDate && (
              <div className="blog-detail__meta">
                <span>{formatDate(rawDate, language)}</span>
              </div>
            )}
          </header>

          {image?.filename && (
            <figure className="blog-detail__image">
              <img src={image.filename} alt={Title} />
            </figure>
          )}

          {content && (
            <div className="blog-detail__content">
              {content}
            </div>
          )}
        </div>
      </article>
    </Layout>
  );
};

export default BlogPost;
