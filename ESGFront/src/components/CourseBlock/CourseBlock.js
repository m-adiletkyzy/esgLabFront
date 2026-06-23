import React, { useState, useEffect } from "react";
import "./courseBlock.scss";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Pagination from "../Pagination/BasicPagination";
import api from "../../api";

function CourseBlock() {
  const { t, i18n } = useTranslation();
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 9;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get(
          `api/v1/Courses/`,
        );
        setCourses(res.data);
      } catch (err) {
        console.error("Ошибка при загрузке курсов:", err);
      }
    };
    fetchCourses();
    i18next.on("languageChanged", fetchCourses);
    return () => i18next.off("languageChanged", fetchCourses);
  }, []);

  const getImageUrl = (course) => {
    if (!course.image_url) return "/placeholder.jpg";

    if (course.HasOurCourse && !course.image_url.startsWith("http")) {
      return `http://127.0.0.1:8000/${course.image_url}`;
    }
    return course.image_url;
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const filteredCourses = courses.filter((article) =>
    article.title?.toLowerCase().includes(searchTerm)
  );

  const indexOfLast = currentPage * coursesPerPage;
  const indexOfFirst = indexOfLast - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  const paginate = (pageNum) => setCurrentPage(pageNum);

  return (
    <>
      <Container>
        <div className="news-search-wrapper" style={{ margin: "20px 0" }}>
          <input
            type="text"
            placeholder={t("Поиск...")}
            onChange={handleSearch}
            className="form-control"
          />
        </div>
        <div className="course-content">
          {currentCourses.map((item) => {
            const isInternal = item.HasOurCourse && item.OurCourseId && item.lang;
            const courseUrl = isInternal
              ? `/our-course/${item.OurCourseId}`
              : item.cr_site_url;

            if (isInternal) {
              return (
                <Link to={courseUrl} className="cardd" key={item.id}>
                  <img
                    src={getImageUrl(item)}
                    className="cardd-image"
                    alt={item.title}
                  />
                  <div className="cardd-content">
                    <h3 className="cardd-title">{item.title}</h3>
                    <p className="cardd-description">{item.digest}</p>
                  </div>
                  <button className="cardd-button">{t("more_details")}</button>
                </Link>
              );
            } else {
              return (
                <a
                  href={courseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cardd"
                  key={item.id}
                >
                  <img
                    src={getImageUrl(item)}
                    className="cardd-image"
                    alt={item.title}
                  />
                  <div className="cardd-content">
                    <h3 className="cardd-title">{item.title}</h3>
                    <p className="cardd-description">{item.digest}</p>
                  </div>
                  <button className="cardd-button">{t("more_details")}</button>
                </a>
              );
            }
          })}
        </div>
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onChange={paginate}
          />
        )}
      </Container>
    </>
  );
}

export default CourseBlock;
