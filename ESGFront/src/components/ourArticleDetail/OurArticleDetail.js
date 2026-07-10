import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AppHeader from "../header/Header";
import AppFooter from "../footer/Footer";
import { useTranslation } from "react-i18next";
import "./ourArticleDetail.scss";
import api from "../../api";

function OurArticleDetail() {
  const { i18n } = useTranslation();
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await api.get(
          `api/v1/OurArticles/${id}/`
        );
        setArticle(response.data);
        setError(null);
      } catch {
        setError("Ошибка загрузки статьи");
        setArticle(null);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat(i18n.language, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const parts = formatter.formatToParts(date);
    const day = parts.find((p) => p.type === "day")?.value || "";
    let month = parts.find((p) => p.type === "month")?.value || "";
    const year = parts.find((p) => p.type === "year")?.value || "";
    if (month) month = month.charAt(0).toUpperCase() + month.slice(1);
    return `${day} ${month} ${year}`;
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  // Выбираем заголовок и текст в зависимости от текущего языка
  let title = article.Rutitle;
  let text = article.Rutext;
  if (i18n.language.startsWith("en")) {
    title = article.Engtitle || article.Rutitle;
    text = article.Engtext || article.Rutext;
  } else if (i18n.language.startsWith("kk")) {
    title = article.Kktitle || article.Rutitle;
    text = article.Kktext || article.Rutext;
  }

  return (
    <div>
      <AppHeader />
      <div className="paragraphn">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="hero-b-content-title-only">
                <h1 className="h2">ESG Новости</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="c-section c-section--splashes c-section--bottom-alt">
        <div className="container">
          <h2>{title}</h2>
          <div className="o-duo o-duo--detail">
            <div className="o-duo__item">
              <picture className="c-detail-banner__image">
                <img src={article.image} alt={title || "article"} />
              </picture>
              <div className="is-quarantine is-quarantine--narrow">
                <p style={{ whiteSpace: "pre-line" }}>{text}</p>
              </div>
            </div>
            <div className="o-duo__item o-duo__item--sticky">
              <div className="c-info-card c-info-card--news">
                <ul className="c-info-card__list">
                  <li className="c-info-card__item">
                    <p className="c-info-card__label">Date Posted</p>
                    <p className="c-info-card__text">
                      {formatDate(article.date)}
                    </p>
                  </li>
                  <li className="c-info-card__item">
                    <p className="c-info-card__label">Last Edited</p>
                    <p className="c-info-card__text">
                      {formatDate(article.updated_at)}
                    </p>
                  </li>
                  <li className="c-info-card__item">
                    <p className="c-info-card__label">Categories</p>
                    <p className="c-info-card__text">ESG NEWS</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AppFooter />
    </div>
  );
}

export default OurArticleDetail;
