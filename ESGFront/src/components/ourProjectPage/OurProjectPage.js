import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AppHeader from "../header/Header";
import AppFooter from "../footer/Footer";
import api from "../../api";
function OurProjectPage() {
  const { id } = useParams();
  const { i18n } = useTranslation();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await api.get(
          `api/v1/OurProjects/${id}/`
        );
        if (!response.ok) throw new Error(`Ошибка: ${response.status}`);
        const data = await response.json();
        setProject(data);
      } catch {
        setError("Ошибка загрузки события");
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (loading) return <div>Загрузка...</div>;
  if (error || !project) return <div>{error || "Событие не найдено"}</div>;

  const langPrefix =
    i18n.language === "ru" ? "Ru" : i18n.language === "kk" ? "Kk" : "Eng";
  const title = project[`${langPrefix}title`] || "Без названия";
  const description = project[`${langPrefix}text`] || "Нет описания";

  return (
    <div>
      <AppHeader />
      <div className="paragraphn">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="hero-b-content-title-only">
                <h1 className="h2">ESG Проекты</h1>
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
                <img src={project.image || "/placeholder.jpg"} alt={title} />
              </picture>
              <div className="is-quarantine is-quarantine--narrow">
                <p>{description}</p>
              </div>
            </div>
            <div className="o-duo__item o-duo__item--sticky">
              <div className="c-info-card c-info-card--news">
                <ul className="c-info-card__list">
                  <li className="c-info-card__item">
                    <p className="c-info-card__label">Дата</p>
                    <p className="c-info-card__text">
                      {formatDate(project.created_at)}
                    </p>
                  </li>
                  <li className="c-info-card__item">
                    <p className="c-info-card__label">Дата начала</p>
                    <p className="c-info-card__text">
                      {formatDate(project.updated_at)}
                    </p>
                  </li>
                  <li className="c-info-card__item">
                    <p className="c-info-card__label">Cтатус</p>
                    <p className="c-info-card__text">{project.status}</p>
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

export default OurProjectPage;
