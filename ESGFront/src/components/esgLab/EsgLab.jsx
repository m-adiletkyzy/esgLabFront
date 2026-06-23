import React from "react";
import { useTranslation } from "react-i18next";
import AppHeader from "../header/Header"
import AppFooter from "../footer/Footer"    
import "./esglab.scss";
import { NavLink } from "react-router-dom";

function EsgLab() {
  const { t } = useTranslation();

  return (
    <div className="esg">
        <AppHeader />
        <section className="lab-hero">
          <div className="container">
            <div className="lab-hero__inner">
          
              <span className="lab-hero__badge">
                🔬 {t("lab_hero_badge")}
              </span>
          
              <h1 className="lab-hero__title">ESG LAB</h1>
          
              <p className="lab-hero__desc">{t("lab_hero_desc")}</p>
          
              <NavLink to="/lab" className="lab-hero__btn">
                {t("lab_hero_btn")}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </NavLink>
          
            </div>
          </div>
        </section>
        <AppFooter />
    </div>
  );
}

export default EsgLab;