import React from "react";
import { useTranslation } from "react-i18next";
import "./esg.scss";
import AppHeader from "../header/Header";
import AppFooter from "../footer/Footer";
import esg from "../../img/main.jpg";
import esg1 from "../../img/useless.jpeg"
import esg2 from "../../img/Cherepashka.jpeg"
import social from "../../img/esg3.jpeg";
import environmental from "../../img/mountain.jpg";
import governance from "../../img/esg1.jpeg";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  LabelList
} from "recharts";

function Esg() {
  const { t } = useTranslation();

  const cards = [
    {
      img: environmental,
      title: t("environmental"),
      text: t("environmental_text"),
      metrics: [
        { label: "Переработка отходов (%)", current: 65, previous: 50 },
      ],
    },
    {
      img: social,
      title: t("social"),
      text: t("social_text"),
      metrics: [
        { label: "Участие студентов", current: 300, previous: 250 },
        { label: "Женщины в науке (%)", current: 45, previous: 40 },
        { label: "Волонтёрские часы", current: 2000, previous: 1700 },
      ],
    },
    {
      img: governance,
      title: t("governance"),
      text: t("governance_text"),
      metrics: [
        { label: "Прозрачность тендеров (%)", current: 85, previous: 70 },
        { label: "Антикоррупционные тренинги", current: 60, previous: 40 },
        { label: "Цифровой документооборот", current: 90, previous: 75 },
      ],
    }
  ];

  const wasteData = [
    { label: "Оборудование", value: 145.6 },
    { label: "Металлолом", value: 25.9 },
    { label: "Макулатура", value: 13.9 },
    { label: "Стекло", value: 2.6 },
    { label: "Пластик", value: 2.1 },
    { label: "Алюминий", value: 0.2 },
  ];

  const waterData = [
    { label: 2022, value: 15.14},
    { label: 2023, value: 18.87},
  ]

  const energyData = [
    { year: "2022", value: 5508 },
    { year: "2023", value: 6249 },
  ];

  const WASTE_COLORS = [
    "#2E8B57", // Furniture
    "#009688", // Metal
    "#A5D6A7", // Paper
    "#C7925B", // Glass
    "#64B5F6", // Plastic
    "#B39DDB", // Aluminium
  ];

  return (
    <div className="esg">
      
      <AppHeader />

      <div className="app">
        <div className="content-container">

          <div className="esg-hero__left">
            <span className="esg-hero__badge">● {t("esg_badge")}</span>
            <h1 className="esg-hero__title">{t("esg_hero_title")}</h1>
          </div>

          <div className="esg-hero__right">
            <div className="esg-hero__quote-card">
              <span className="esg-hero__quote-icon">99</span>
              <p className="esg-hero__quote-text">{t("esg_hero_quote")}</p>
            </div>
          </div>

        </div>
      </div>


      {/* Секция карточек Миссия / Видение */}
      <div className="esg-cards">
        <div className="esg-cards__container">

          {/* Карточка Миссия */}
          <div className="esg-card esg-card--light">
            <div className="esg-card__icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 
                  10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 
                  0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 
                  8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" 
                  fill="currentColor"/>
              </svg>
            </div>
            <h3 className="esg-card__title">{t("mission_title")}</h3>
            <p className="esg-card__text">{t("mission_text")}</p>
          </div>

          {/* Карточка Видение */}
          <div className="esg-card esg-card--dark">
            <div className="esg-card__icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 
                  4.39 6 7.5 11 7.5s9.27-3.11 
                  11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 
                  17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 
                  2.24 5 5-2.24 5-5 5zm0-8c-1.66 
                  0-3 1.34-3 3s1.34 3 3 3 3-1.34 
                  3-3-1.34-3-3-3z" 
                  fill="currentColor"/>
              </svg>
            </div>
            <h3 className="esg-card__title">{t("vision_campus_title")}</h3>
            <p className="esg-card__text">{t("vision_campus_text")}</p>
          </div>

        </div>
      </div>


        {/* Секция GRI */}
      <div className="esg-gri">
        <div className="esg-gri__container">

          {/* Левая часть */}
          <div className="esg-gri__left">
            <span className="esg-gri__badge">{t("esg_gri_badge")}</span>
            <h2 className="esg-gri__title">{t("esg_gri_title")}</h2>
            <p className="esg-gri__text"
              dangerouslySetInnerHTML={{ __html: t("esg_gri_text1") }}
            />
            <p className="esg-gri__text"
              dangerouslySetInnerHTML={{ __html: t("esg_gri_text2") }}
            />

            <div className="esg-gri__tags">
              <div className="esg-gri__tag">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 
                    10-4.48 10-10S17.52 2 12 2zm-2 
                    14.5v-9l6 4.5-6 4.5z" 
                    fill="currentColor"/>
                </svg>
                {t("esg_gri_tag1")}
              </div>
              <div className="esg-gri__tag">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 
                    10-4.48 10-10S17.52 2 12 2zm-2 
                    14.5v-9l6 4.5-6 4.5z" 
                    fill="currentColor"/>
                </svg>
                {t("esg_gri_tag2")}
              </div>
            </div>
          </div>

          {/* Правая часть — логотип GRI */}
          <div className="esg-gri__right">
            <div className="esg-gri__logo-circle">
              <span className="esg-gri__logo-text">GRI</span>
            </div>
          </div>

          <a href="#" className="esg-gri__link">
            {t("esg_gri_more")}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 
                002 2h14a2 2 0 002-2v-7h-2v7zM14 
                3v2h3.59l-9.83 9.83 1.41 1.41L19 
                6.41V10h2V3h-7z" 
                fill="currentColor"/>
            </svg>
          </a>

        </div>
      </div>



        {/* Секция ESG-цели */}
      {/* <div className="esg-goals">
        <div className="esg-goals__container">
          <h2 className="esg-goals__title">{t("esg_goals_title")}</h2>

          <div className="esg-goals__diagram"> */}

            {/* Левые элементы */}
            {/* <div className="esg-goals__items esg-goals__items--left">
              <div className="esg-goals__item esg-goals__item--left">
                <div className="esg-goals__item-text">
                  <span className="esg-goals__item-title esg-goals__item-title--green">
                    {t("esg_goal_ecology_title")}
                  </span>
                  <p className="esg-goals__item-desc">{t("esg_goal_ecology_desc")}</p>
                </div>
                <div className="esg-goals__icon esg-goals__icon--green">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2-8 2C12 8.5 14 14 14 14c1-2 1.5-4 1.5-4C17 12 17 8 17 8z" fill="white"/>
                  </svg>
                </div>
              </div>

              <div className="esg-goals__item esg-goals__item--left">
                <div className="esg-goals__item-text">
                  <span className="esg-goals__item-title esg-goals__item-title--yellow">
                    {t("esg_goal_society_title")}
                  </span>
                  <p className="esg-goals__item-desc">{t("esg_goal_society_desc")}</p>
                </div>
                <div className="esg-goals__icon esg-goals__icon--yellow">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="white"/>
                  </svg>
                </div>
              </div>

              <div className="esg-goals__item esg-goals__item--left">
                <div className="esg-goals__item-text">
                  <span className="esg-goals__item-title esg-goals__item-title--blue">
                    {t("esg_goal_governance_title")}
                  </span>
                  <p className="esg-goals__item-desc">{t("esg_goal_governance_desc")}</p>
                </div>
                <div className="esg-goals__icon esg-goals__icon--blue">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div> */}

            {/* Центральная диаграмма */}
            {/* <div className="esg-goals__center">
              <svg className="esg-goals__svg" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg"> */}
                {/* Большой круг (внешний) */}
                {/* <circle cx="150" cy="150" r="130" fill="none" stroke="#1a4fa0" strokeWidth="2"/> */}
                {/* Малый круг (внутренний) */}
                {/* <circle cx="150" cy="150" r="85" fill="none" stroke="#2d9d78" strokeWidth="2"/> */}
                {/* Текст ESG KBTU */}
                {/* <text x="150" y="128" textAnchor="middle" fontSize="28" fontWeight="900" fill="#1a4fa0">ESG</text>
                <text x="150" y="162" textAnchor="middle" fontSize="28" fontWeight="900" fill="#2d9d78">K</text>
                <text x="150" y="191" textAnchor="middle" fontSize="28" fontWeight="900" fill="#2d9d78">B</text>
                <text x="150" y="220" textAnchor="middle" fontSize="28" fontWeight="900" fill="#2d9d78">T</text>
                <text x="150" y="249" textAnchor="middle" fontSize="28" fontWeight="900" fill="#2d9d78">U</text>
              </svg>
            </div> */}

            {/* Правые элементы */}
            {/* <div className="esg-goals__items esg-goals__items--right">
              <div className="esg-goals__item esg-goals__item--right">
                <div className="esg-goals__icon esg-goals__icon--red">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M9.5 16C5.41 16 2 12.59 2 8.5S5.41 1 9.5 1 17 4.41 17 8.5 13.59 16 9.5 16zm0-13C6.47 3 4 5.47 4 8.5S6.47 14 9.5 14 15 11.53 15 8.5 12.53 3 9.5 3zm7.5 13l4.5 4.5-1.5 1.5L15 17l2-1z" fill="white"/>
                  </svg>
                </div>
                <div className="esg-goals__item-text">
                  <span className="esg-goals__item-title esg-goals__item-title--red">
                    {t("esg_goal_education_title")}
                  </span>
                  <p className="esg-goals__item-desc">{t("esg_goal_education_desc")}</p>
                </div>
              </div>

              <div className="esg-goals__item esg-goals__item--right">
                <div className="esg-goals__icon esg-goals__icon--purple">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M9 11.24V7.5C9 6.12 10.12 5 11.5 5S14 6.12 14 7.5v3.74c1.21-.81 2-2.18 2-3.74C16 5.01 13.99 3 11.5 3S7 5.01 7 7.5c0 1.56.79 2.93 2 3.74zm9.84 4.63l-4.54-2.26c-.17-.07-.35-.11-.54-.11H13v-6c0-.83-.67-1.5-1.5-1.5S10 6.67 10 7.5v10.74l-3.43-.72c-.08-.01-.15-.03-.24-.03-.31 0-.59.13-.79.33l-.79.8 4.94 4.94c.27.27.65.44 1.06.44h6.79c.75 0 1.33-.55 1.44-1.28l.75-5.27c.01-.07.02-.14.02-.21 0-.62-.38-1.16-.91-1.41z" fill="white"/>
                  </svg>
                </div>
                <div className="esg-goals__item-text">
                  <span className="esg-goals__item-title esg-goals__item-title--purple">
                    {t("esg_goal_partnership_title")}
                  </span>
                  <p className="esg-goals__item-desc">{t("esg_goal_partnership_desc")}</p>
                </div>
              </div>

              <div className="esg-goals__item esg-goals__item--right">
                <div className="esg-goals__icon esg-goals__icon--orange">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2.5c-5.25 0-9.5 4.25-9.5 9.5s4.25 9.5 9.5 9.5 9.5-4.25 9.5-9.5-4.25-9.5-9.5-9.5zm0 17c-4.14 0-7.5-3.36-7.5-7.5S7.86 4.5 12 4.5s7.5 3.36 7.5 7.5-3.36 7.5-7.5 7.5zm3.5-10.5L13 11.5V7h-2v6l3.5 2.1 1-1.6z" fill="white"/>
                    <path d="M13 7h-2v4.5l3.5 2.1 1-1.6-2.5-1.5V7z" fill="white"/>
                  </svg>
                </div>
                <div className="esg-goals__item-text">
                  <span className="esg-goals__item-title esg-goals__item-title--orange">
                    {t("esg_goal_future_title")}
                  </span>
                  <p className="esg-goals__item-desc">{t("esg_goal_future_desc")}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>       */}


        {/* Секция Наши Услуги */}
      <div className="esg-services">
        <div className="esg-services__container">
          <h2 className="esg-services__title">{t("esg_services_title")}</h2>

          <div className="esg-services__grid">

            <div className="esg-services__card">
              <div className="esg-services__icon esg-services__icon--blue">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" fill="white"/>
                </svg>
              </div>
              <h3 className="esg-services__card-title">{t("esg_service1_title")}</h3>
              <p className="esg-services__card-desc">{t("esg_service1_desc")}</p>
            </div>

            <div className="esg-services__card">
              <div className="esg-services__icon esg-services__icon--green">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z" fill="white"/>
                </svg>
              </div>
              <h3 className="esg-services__card-title">{t("esg_service2_title")}</h3>
              <p className="esg-services__card-desc">{t("esg_service2_desc")}</p>
            </div>

            <div className="esg-services__card">
              <div className="esg-services__icon esg-services__icon--blue">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" fill="white"/>
                </svg>
              </div>
              <h3 className="esg-services__card-title">{t("esg_service3_title")}</h3>
              <p className="esg-services__card-desc">{t("esg_service3_desc")}</p>
            </div>

            <div className="esg-services__card">
              <div className="esg-services__icon esg-services__icon--green">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M22 9V7h-2V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-2h2v-2h-2v-2h2v-2h-2V9h2zm-4 10H4V5h14v14zM6 13h5v4H6zm6-6h4v3h-4zM6 7h5v5H6zm6 4h4v6h-4z" fill="white"/>
                </svg>
              </div>
              <h3 className="esg-services__card-title">{t("esg_service4_title")}</h3>
              <p className="esg-services__card-desc">{t("esg_service4_desc")}</p>
            </div>

          </div>
        </div>
      </div>




      <AppFooter />
    </div>
  );
}

export default Esg;