import React from "react";
import "./mainContent.scss";
// import video from "../../../src/img/esg_sol.mp4";
import { useState, useEffect, useRef } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/esm/Row";
import i18next from "i18next";
import api from "../../api";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import Footer from "../footer/Footer";
import Article from "../Article/Article";
import MainHomeContent from "./MainHomeContent";
import MainBanner from "./MainBanner";
const MainContent = () => {
  const [opacity, setOpacity] = useState(0);
  const [news, setNews] = useState([]);
  const { t } = useTranslation();
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
    } catch (error) {}
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
    <div className="main">
      <MainHomeContent/>
      <MainBanner sectionRef={sectionRef} opacity={opacity}/>
      <Footer/>
    </div>
  );
}

export default MainContent;;
