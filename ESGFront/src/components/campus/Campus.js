import React from "react";
import { useState, useRef, useEffect } from "react";
import AppHeader from "../header/Header"
import AppFooter from "../footer/Footer"
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import "./campus.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/esm/Row";
import Article from "../Article/Article";
import api from "../../api";
import city from "../../img/city.jpg";
import esg from "../../img/esg.jpg";
import { NavLink } from "react-router-dom";
import heatmap from "../../img/heatmap.webp";
import heatmap2 from "../../img/heatmap2.webp";
import mission from "../../img/mission.jpeg";
function Campus() {
  const { t } = useTranslation();
  const [news, setNews] = useState([]);
  const [opacity, setOpacity] = useState(0);
  const sectionRef = useRef(null);
  useEffect(() => {
    const loadData = () => getNews(i18next.language);
    i18next.on("languageChanged", loadData);
    loadData();
    return () => {
      i18next.off("languageChanged", loadData);
    };
  }, []);

  const getNews = async (lang) => {
    try {
      const response = await api.get(
        `api/v1/Articles/?lang=${lang}`
      );
      setNews(response.data.results.slice(0, 3));
    } catch (error) {
    }
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        const rect = entry.boundingClientRect;
        const windowHeight = window.innerHeight;

        // Настройки анимации
        const visibleStart = windowHeight * 0.1;
        const visibleEnd = windowHeight * 0.9;
        const centerY = rect.top + rect.height / 2;

        // Рассчитываем прогресс
        let progress =
          1 - (centerY - visibleStart) / (visibleEnd - visibleStart);
        progress = Math.max(0, Math.min(1, progress));
        progress = Math.pow(progress, 1.5); // Сглаживание

        setOpacity(progress);
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: "0px",
      threshold: buildThresholdList(), // Создаем массив порогов
    });

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  // Функция для создания массива порогов
  function buildThresholdList() {
    let thresholds = [];
    const numSteps = 100; // Количество шагов для плавности

    for (let i = 1.0; i <= numSteps; i++) {
      thresholds.push(i / numSteps);
    }

    return thresholds;
  }

  return (
    <div className="main3">
      <AppHeader />

      {/* Featured Guide */}
      <section className="featured-guide">
        <div className="inner">
          <picture className="img">
            <img
              src={city}
              className="attachment-large-1600"
              alt={t("city_alt")}
              loading="lazy"
            />
          </picture>
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-md-10 col-lg-8">
                <div className="txt">
                  <span className="label">{t("esg_campus")}</span>
                  <h2>{t("esg_slogan")}</h2>
                  <p>{t("esg_intro")}</p>
                  <NavLink to="/event" className="btnss">
                    {t("esg_campus")}
                  </NavLink>
                  <div className="link-wrap">
                    <a href="#">{t("esg_ready")}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


        {/* Mission & Vision Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-grid">

            {/* Наша Миссия */}
            <div className="mission-card mission-card--light">
              <div className="mission-card__icon">⚙️</div>
              <h3>{t("mission_title")}</h3>
              <p>{t("mission_text")}</p>
            </div>

            {/* Наше Видение */}
            <div className="mission-card mission-card--dark">
              <div className="mission-card__icon">👁️</div>
              <h3>{t("vision_campus_title")}</h3>
              <p>{t("vision_campus_text")}</p>
            </div>

          </div>
        </div>
      </section>





            {/* Directions Section */}
      <section className="campus-directions">
        <div className="container">

          {/* Заголовок */}
          <div className="campus-directions__header">
            <div className="campus-directions__header-left">
              <h2>{t("campus_dir_title")}</h2>
              <h2 className="campus-directions__header-green">ESG Campus</h2>
            </div>
            <p className="campus-directions__header-desc">{t("campus_dir_desc")}</p>
          </div>

          {/* Карточки */}
          <div className="campus-directions__grid">

            {/* ESG-инициативы — маленькая иконка */}
            <NavLink to="/course" className="campus-dir-card campus-dir-card--initiatives">
              <div className="campus-dir-card__icon campus-dir-card__icon--outline">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
              </div>
              <h3>{t("campus_dir_init_title")}</h3>
              <p>{t("campus_dir_init_text")}</p>
              <span className="campus-dir-card__link">{t("dir_more")} →</span>
            </NavLink>

            {/* Обучение — зелёная иконка */}
            <NavLink to="/education" className="campus-dir-card campus-dir-card--edu">
              <div className="campus-dir-card__icon campus-dir-card__icon--filled">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                </svg>
              </div>
              <h3>{t("dir_edu_title")}</h3>
              <p>{t("campus_dir_edu_text")}</p>
              <span className="campus-dir-card__link">{t("dir_more")} →</span>
            </NavLink>

            {/* Проекты — маленькая иконка */}
            <NavLink to="/project" className="campus-dir-card campus-dir-card--projects">
              <div className="campus-dir-card__icon campus-dir-card__icon--outline">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
                </svg>
              </div>
              <h3>{t("dir_projects_title")}</h3>
              <p>{t("campus_dir_proj_text")}</p>
              <span className="campus-dir-card__link">{t("dir_more")} →</span>
            </NavLink>

            {/* Мероприятия — зелёная иконка */}
            <NavLink to="/event" className="campus-dir-card campus-dir-card--events">
              <div className="campus-dir-card__icon campus-dir-card__icon--filled">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </div>
              <h3>{t("dir_events_title")}</h3>
              <p>{t("campus_dir_events_text")}</p>
              <span className="campus-dir-card__link">{t("dir_more")} →</span>
            </NavLink>

          </div>
        </div>
      </section>






      {/* Join Section */}
      <section className="campus-join">
        <div className="container">

          <div className="campus-join__header">
            <h2>{t("join_title")}</h2>
            <p>{t("join_desc")}</p>
          </div>

          <div className="campus-join__form-wrap">
            <div className="campus-join__row">

              {/* ФИО */}
              <div className="campus-join__field">
                <label>{t("join_name")}</label>
                <input type="text" placeholder="Jane Doe" />
              </div>

              {/* Email */}
              <div className="campus-join__field">
                <label>Email</label>
                <input type="email" placeholder="janedoe@kbtu.kz" />
              </div>

            </div>

            <div className="campus-join__row">

              {/* Специальность */}
              <div className="campus-join__field">
                <label>{t("join_specialty")}</label>
                <div className="campus-join__select-wrap">
                  <select>
                    <option>{t("join_specialty_opt1")}</option>
                    <option>{t("join_specialty_opt2")}</option>
                    <option>{t("join_specialty_opt3")}</option>
                  </select>
                </div>
              </div>

              {/* Область интереса */}
              <div className="campus-join__field">
                <label>{t("join_interest")}</label>
                <div className="campus-join__select-wrap">
                  <select>
                    <option>{t("join_interest_opt1")}</option>
                    <option>{t("join_interest_opt2")}</option>
                    <option>{t("join_interest_opt3")}</option>
                  </select>
                </div>
              </div>

            </div>

            {/* Сообщение */}
            <div className="campus-join__field">
              <label>{t("join_message")}</label>
              <textarea rows={5} placeholder={t("join_message_placeholder")} />
            </div>

            {/* Кнопка */}
            <button className="campus-join__btn">{t("join_btn")}</button>

          </div>
        </div>
      </section>






      <AppFooter />
    </div>

  );
}

export default Campus;
