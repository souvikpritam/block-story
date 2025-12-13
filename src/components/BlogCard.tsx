import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext"; 

interface BlogCardProps {
  title: string;
  excerpt: string;
  image?: string;
  slug: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  excerpt,
  image,
  slug,
}) => {

  const { t } = useLanguage();
  return (
    <article className="blog-card">
      {image && (
        <img
          src={image}
          alt={title}
          className="blog-card__image"
        />
      )}

      <div className="blog-card__content">
        <h3 className="blog-card__title">{title}</h3>
        <p className="blog-card__excerpt">{excerpt}</p>

        <Link to={`/blog/${slug}`} className="blog-card__link">
          {t("blog.readMore")} → {/* ✅ translated text */}
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;
