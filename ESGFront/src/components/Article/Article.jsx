import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import "./article.scss";

const tagConfig = {
  environmental: { labelKey: "news_page.environmental", color: "rgba(5, 150, 105, 0.2)", textColor: "#059669" },
  social: { labelKey: "news_page.social_filter", color: "rgba(255, 221, 85, 0.3)", textColor: "#B8860B" },
  governance: { labelKey: "news_page.governance", color: "rgba(55, 113, 200, 0.2)", textColor: "#3771C8" },
  events: { labelKey: "news_page.events_tag", color: "rgba(251, 140, 0, 0.25)", textColor: "#E65100" },
  innovation: { labelKey: "news_page.innovation_tag", color: "rgba(220, 53, 69, 0.2)", textColor: "#C62828" },
  partnership: { labelKey: "news_page.partnership_tag", color: "rgba(142, 36, 170, 0.2)", textColor: "#8E24AA" },
};

const Article = ({ article }) => {
  const { t, i18n } = useTranslation();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat(i18n.language, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const parts = formatter.formatToParts(date);
    const day = parts.find((p) => p.type === "day")?.value;
    let month = parts.find((p) => p.type === "month")?.value;
    const year = parts.find((p) => p.type === "year")?.value;
    if (month) {
      month = month.charAt(0).toUpperCase() + month.slice(1);
    }
    return `${day} ${month} ${year}`;
  };

  const category = (article.category || "environmental").toLowerCase();
  const tag = tagConfig[category] || tagConfig.environmental;

  const isInternal = article.HasOurArticle || article.OurArticleId;

  const getImageUrl = (article) => {
    if (!article.image_url) return null;
    if (article.HasOurArticle && !article.image_url.startsWith("http")) {
      return `http://127.0.0.1:8000${article.image_url}`;
    }
    return article.image_url;
  };

  const imageUrl = getImageUrl(article);

  const cardContent = (
    <div className="nc-card">
      <div className="nc-card__image-wrapper">
        {imageUrl ? (
          <img src={imageUrl} alt={article.title} className="nc-card__image" />
        ) : (
          <div className="nc-card__image-placeholder">
            <svg width="64" height="48" viewBox="0 0 64 48" fill="none">
              <rect width="64" height="48" rx="8" fill="#e2e8f0" />
              <path d="M20 36L28 24L34 32L38 27L44 36H20Z" fill="#94a3b8" />
              <circle cx="26" cy="18" r="4" fill="#94a3b8" />
              <path d="M8 8L16 16M56 8L48 16" stroke="#cbd5e1" strokeWidth="1.5" />
            </svg>
          </div>
        )}
      </div>

      <div className="nc-card__meta">
        <span
          className="nc-card__tag"
          style={{ backgroundColor: tag.color, color: tag.textColor }}
        >
          {t(tag.labelKey)}
        </span>
        <span className="nc-card__date">{formatDate(article.ar_date)}</span>
      </div>

      <h3 className="nc-card__title">{article.title}</h3>

      <p className="nc-card__description">
        {article.digest || article.title}
      </p>

      <span className="nc-card__read-more">
        {t("news_page.read_more")} <ArrowRight size={14} />
      </span>
    </div>
  );

  return isInternal ? (
    <Link
      to={`/our-article/${article.OurArticleId || article.id}`}
      className="nc-card__link"
    >
      {cardContent}
    </Link>
  ) : (
    <a
      href={article.ar_site_url}
      className="nc-card__link"
      target="_blank"
      rel="noopener noreferrer"
    >
      {cardContent}
    </a>
  );
};

export default Article;
