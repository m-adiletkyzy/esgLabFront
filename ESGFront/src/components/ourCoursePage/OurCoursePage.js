import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AppHeader from "../header/Header";
import AppFooter from "../footer/Footer";
import api from "../../api";

function OurCoursePage() {
  const { id } = useParams();
  const { i18n } = useTranslation();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().substring(11, 16);
  };

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
          `api/v1/OurCourses/${id}/`
        );
        if (!response.ok) throw new Error(`Ошибка: ${response.status}`);
        const data = await response.json();
        setCourse(data);
      } catch {
        setError("Ошибка загрузки события");
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (loading) return <div>Загрузка...</div>;
  if (error || !course) return <div>{error || "Событие не найдено"}</div>;

  const langPrefix =
    i18n.language === "ru" ? "Ru" : i18n.language === "kk" ? "Kk" : "Eng";
  const title = course[`${langPrefix}title`] || "Без названия";
  const description = course[`${langPrefix}text`] || "Нет описания";

  return (
    <div>
      <AppHeader />
      <div className="paragraphn">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="hero-b-content-title-only">
                <h1 className="h2">ESG Курсы</h1>
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
                <img src={course.image || "/placeholder.jpg"} alt={title} />
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
                      {formatDate(course.start_date)}
                    </p>
                  </li>
                  <li className="c-info-card__item">
                    <p className="c-info-card__label">Дата начала</p>
                    <p className="c-info-card__text">
                      {formatTime(course.start_date)}
                    </p>
                  </li>
                  <li className="c-info-card__item">
                    <p className="c-info-card__label">Дата окончания</p>
                    <p className="c-info-card__text">
                      {formatTime(course.end_date)}
                    </p>
                  </li>
                  <li className="c-info-card__item">
                    <p className="c-info-card__label">Instructor</p>
                    <p className="c-info-card__text">{course.instructor}</p>
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

export default OurCoursePage;
