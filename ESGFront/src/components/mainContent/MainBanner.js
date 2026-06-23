import React from 'react'
import mountain from "../../img/mountain.jpg"
import innovate from "../../img/esg3.jpeg"
import inspire from "../../img/esg1.jpeg"
import impact from "../../img/esg2.jpeg"
import renewble from "../../img/renewble.jpg";
import heatmap from "../../img/heatmap.webp";
import heatmap2 from "../../img/heatmap2.webp";
import group from "../../img/group.jpg";
import esg_plane from "../../img/esg_plane.jpg";
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import video from '../../img/esg_sol.mp4'
const MainBanner = () => {
    const { t } = useTranslation();
    return (
        <>
            {/* Key Directions Section */}
            <section className="directions-section">
              <div className="container">
                <h2 className="directions-title">{t("directions_title")}</h2>

                <div className="directions-grid-1">

                  {/* Новости */}
                  <NavLink to="/news" className="card-dir card-dir--news">
                    <div className="card-dir__icon card-dir__icon--news">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2"/>
                        <line x1="3" y1="9" x2="21" y2="9"/>
                        <line x1="9" y1="21" x2="9" y2="9"/>
                      </svg>
                    </div>
                    <h3 className="card-dir__title card-dir__title--news">{t("dir_news_title")}</h3>
                    <p className="card-dir__text card-dir__text--news">{t("dir_news_text")}</p>
                    <span className="card-dir__link card-dir__link--news">{t("dir_more")} →</span>
                  </NavLink>

                  {/* Обучение */}
                  <NavLink to="/course" className="card-dir card-dir--edu">
                    <div className="card-dir__icon card-dir__icon--edu">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                      </svg>
                    </div>
                    <h3 className="card-dir__title card-dir__title--edu">{t("dir_edu_title")}</h3>
                    <p className="card-dir__text card-dir__text--edu">{t("dir_edu_text")}</p>
                    <span className="card-dir__arrow card-dir__arrow--edu">→</span>
                  </NavLink>

                  {/* ESG Lab */}
                  <NavLink to="/esg-lab" className="card-dir card-dir--lab">
                    <div className="card-dir__icon card-dir__icon--lab">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 3h6v11l3 7H6l3-7V3z"/>
                        <line x1="9" y1="9" x2="15" y2="9"/>
                      </svg>
                    </div>
                    <h3 className="card-dir__title card-dir__title--lab">ESG Lab</h3>
                    <p className="card-dir__text card-dir__text--lab">{t("dir_lab_text")}</p>
                    <span className="card-dir__arrow card-dir__arrow--lab">→</span>
                  </NavLink>

                </div>

                <div className="directions-grid-2">

                  {/* ESG Campus */}
                  <NavLink to="/esg-campus" className="card-dir card-dir--campus">
                    <div className="card-dir__icon card-dir__icon--campus">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="7" width="20" height="14" rx="2"/>
                        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
                        <line x1="12" y1="12" x2="12" y2="16"/>
                        <line x1="10" y1="14" x2="14" y2="14"/>
                      </svg>
                    </div>
                    <h3 className="card-dir__title card-dir__title--campus">ESG Campus</h3>
                    <p className="card-dir__text card-dir__text--campus">{t("dir_campus_text")}</p>
                    <span className="card-dir__arrow card-dir__arrow--campus">→</span>
                  </NavLink>

                  {/* Мероприятия */}
                  <NavLink to="/event" className="card-dir card-dir--events">
                    <div className="card-dir__icon card-dir__icon--events">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                    </div>
                    <h3 className="card-dir__title card-dir__title--events">{t("dir_events_title")}</h3>
                    <p className="card-dir__text card-dir__text--events">{t("dir_events_text")}</p>
                    <span className="card-dir__arrow card-dir__arrow--events">→</span>
                  </NavLink>

                  {/* Проекты */}
                  <NavLink to="/project" className="card-dir card-dir--projects">
                    <div className="card-dir__icon card-dir__icon--projects">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                      </svg>
                    </div>
                    <h3 className="card-dir__title card-dir__title--projects">{t("dir_projects_title")}</h3>
                    <p className="card-dir__text card-dir__text--projects">{t("dir_projects_text")}</p>
                    <span className="card-dir__link card-dir__link--projects">{t("dir_all_projects")} →</span>
                  </NavLink>

                </div>
              </div>
            </section>

{/* ------------------------------------------------------------------------------------------------------------- */}

            {/* Image Cards Section */}
            <section className="image-cards-section">
              <div className="container">
                <div className="image-cards-grid">

                  {/* ESG Campus */}
                  <NavLink to="/esg-campus" className="image-card image-card--campus">
                    <div className="image-card__overlay" />
                    <div className="image-card__content">
                      <h3>ESG Campus</h3>
                      <p>{t("img_card_campus_text")}</p>
                      <span className="image-card__link">{t("dir_more")} →</span>
                    </div>
                  </NavLink>

                  {/* ESG Lab */}
                  <NavLink to="/esg-lab" className="image-card image-card--lab">
                    <div className="image-card__overlay" />
                    <div className="image-card__content">
                      <h3>ESG Lab</h3>
                      <p>{t("img_card_lab_text")}</p>
                      <span className="image-card__link">{t("dir_more")} →</span>
                    </div>
                  </NavLink>

                </div>
              </div>
            </section>

                {/* Subscribe Section */}
            <section className="subscribe-section">
              <div className="container">
                <div className="subscribe-box">

                  {/* Декоративная иконка */}
                  <div className="subscribe-box__decor">✉</div>

                  {/* Левая часть — текст */}
                  <div className="subscribe-box__text">
                    <h3>{t("subscribe_title")}</h3>
                    <p>{t("subscribe_text")}</p>
                  </div>

                  {/* Правая часть — форма */}
                  <div className="subscribe-box__form">
                    <div className="subscribe-box__inputs">
                      <input
                        type="email"
                        placeholder={t("subscribe_placeholder")}
                        className="subscribe-box__input"
                      />
                      <button className="subscribe-box__btn">
                        {t("subscribe_btn")}
                      </button>
                    </div>
                    <p className="subscribe-box__hint">{t("subscribe_hint")}</p>
                  </div>

                </div>
              </div>
            </section>
        </>
    )
}

export default MainBanner