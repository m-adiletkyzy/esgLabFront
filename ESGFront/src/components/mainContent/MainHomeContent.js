import { useTranslation } from 'react-i18next';
import React from 'react'
import { NavLink } from 'react-router-dom'
import i18next from "i18next";
import { useEffect } from "react";
import video from '../../img/esg_sol.mp4'
import esgIcon from "../../img/esgIcon.png";

import newsImg1 from "../../img/news_1.jpg";
import newsImg2 from "../../img/news_2.jpg";

const MainHomeContent = () => {
    const { t } = useTranslation();
    return (
        <>
            <section className="home">
              {/* Декоративные blur-пятна */}
              <div className="home__blur home__blur--green" />
              <div className="home__blur home__blur--blue1" />
              <div className="home__blur home__blur--blue2" />
                
              {/* Белый эллипс справа */}
              <div className="home__ellipse" />
                
              <div className="container">
                
                <div className="home__content">
                  <span className="home__badge">● {t("home_badge")}</span>
                  <div className="col-md-7">
                    <h1 className="huge">{t("esg_mainPage_title").toUpperCase()}</h1>
                  </div>
                  <div className="col-md-5">
                    <p className="per">{t("esg_mainPage_parag")}</p>
                    <ul className="btn-group">
                      <li>
                        <NavLink to="/about" className="btn">
                          {t("esg_mainPage_btn")}
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
                
              {/* Иконка справа */}
              <div className="home__icon-wrap">
                <div className="home__icon-glow" />
                <img src={esgIcon} alt="ESG" className="home__icon" />
              </div>
            </section>

            <section className="news-section">
              <div className="container">

                {/* Header */}
                <div className="news-content">
                  <div className="news-header">
                    <div>
                      <h2 className="news-title">{t("latest_news_title")}</h2>
                      <p className="news-subtitle">{t("latest_news_subtitle")}</p>
                    </div>
                    <NavLink to="/news" className="news-all-link">
                      {t("view_all_news")} <span className="arrow">→</span>
                    </NavLink>
                  </div>

                  {/* News List */}
                  <div className="news-list">

                    {/* Новость 1 */}
                    <div className="news-item">
                      <div className="news-item__img">
                        <img src={newsImg1} alt={t("news1_title")} />
                      </div>
                      <div className="news-item__body">
                        <span className="news-item__date">{t("news1_date")}</span>
                        <h3 className="news-item__title">{t("news1_title")}</h3>
                        <p className="news-item__text">{t("news1_text")}</p>
                      </div>
                    </div>

                    {/* Новость 2 */}
                    <div className="news-item">
                      <div className="news-item__img">
                        <img src={newsImg2} alt={t("news2_title")} />
                      </div>
                      <div className="news-item__body">
                        <span className="news-item__date">{t("news2_date")}</span>
                        <h3 className="news-item__title">{t("news2_title")}</h3>
                        <p className="news-item__text">{t("news2_text")}</p>
                      </div>
                    </div>

                  </div>
                  
                </div>
                
                  {/* Предстоящие мероприятия */}
                <div className="upcoming-events">
                  <h3 className="upcoming-events__title">{t("upcoming_title")}</h3>

                  <div className="upcoming-events__list">

                    {/* Мероприятие 1 */}
                    <div className="upcoming-events__item">
                      <div className="upcoming-events__date">
                        <span className="upcoming-events__month">{t("event1_month")}</span>
                        <span className="upcoming-events__day">{t("event1_day")}</span>
                      </div>
                      <div className="upcoming-events__info">
                        <p className="upcoming-events__name">{t("event1_name")}</p>
                        <span className="upcoming-events__meta">{t("event1_meta")}</span>
                      </div>
                    </div>

                    {/* Мероприятие 2 */}
                    <div className="upcoming-events__item">
                      <div className="upcoming-events__date">
                        <span className="upcoming-events__month">{t("event2_month")}</span>
                        <span className="upcoming-events__day">{t("event2_day")}</span>
                      </div>
                      <div className="upcoming-events__info">
                        <p className="upcoming-events__name">{t("event2_name")}</p>
                        <span className="upcoming-events__meta">{t("event2_meta")}</span>
                      </div>
                    </div>

                    {/* Мероприятие 3 */}
                    <div className="upcoming-events__item">
                      <div className="upcoming-events__date">
                        <span className="upcoming-events__month">{t("event3_month")}</span>
                        <span className="upcoming-events__day">{t("event3_day")}</span>
                      </div>
                      <div className="upcoming-events__info">
                        <p className="upcoming-events__name">{t("event3_name")}</p>
                        <span className="upcoming-events__meta">{t("event3_meta")}</span>
                      </div>
                    </div>

                  </div>                  

                  <NavLink to="/event" className="upcoming-events__btn">
                    {t("upcoming_btn")}
                  </NavLink>
                </div>
              </div>
            </section>

        </>
    )
}

export default MainHomeContent;