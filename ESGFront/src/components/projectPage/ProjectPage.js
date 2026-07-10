import { useState, useEffect } from "react";
import "./projectPage.scss";
import AppHeader from "../header/Header";
import AppFooter from "../footer/Footer";
import ProjectBlock from "./projectBlock/ProjectBlock";
import { useTranslation } from "react-i18next";
import api from "../../api";
import { Lightbulb, LayoutGrid, List } from "lucide-react";



function ProjectPage() {
  const { t, i18n } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 4;
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [statusFilters, setStatusFilters] = useState(["in_progress"]);
  const [sortOrder, setSortOrder] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get(
          `api/v1/Projects/?lang=${i18n.language}`
        );
        const data = response.data?.results || response.data;
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
        }
      } catch (err) {
        console.error("Ошибка при загрузке проектов", err);
        setProjects([]);
      }
    };

    fetchProjects();
    i18n.on("languageChanged", fetchProjects);
    return () => i18n.off("languageChanged", fetchProjects);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const categories = [
    { key: "all", label: t("project_page.all_projects"), color: "#e8ecf1", activeColor: "#1a2b4a", activeText: "#fff" },
    { key: "environmental", label: "Environmental", color: "rgba(5, 150, 105, 0.15)", activeColor: "rgba(5, 150, 105, 0.37)", activeText: "#065f46" },
    { key: "social", label: "Social", color: "rgba(255, 221, 85, 0.2)", activeColor: "rgba(255, 221, 85, 0.45)", activeText: "#7c6c00" },
    { key: "governance", label: "Governance", color: "rgba(55, 113, 200, 0.15)", activeColor: "rgba(55, 113, 200, 0.37)", activeText: "#1e3a6e" },
  ];

  const getCategoryCount = (key) => {
    if (key === "all") return projects.length;
    return projects.filter(
      (p) => (p.category || "").toLowerCase() === key
    ).length;
  };

  const toggleStatus = (status) => {
    setStatusFilters((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
    setCurrentPage(1);
  };

  const filteredProjects = projects
    .filter((p) => {
      if (activeCategory !== "all") {
        return (p.category || "").toLowerCase() === activeCategory;
      }
      return true;
    })
    .filter((p) => {
      if (statusFilters.length === 0) {
        return true;
      }
      const derivedStatus = p.status || (p.isActive ? "in_progress" : "completed");
      return statusFilters.includes(derivedStatus);
    })
    .sort((a, b) => {
      const dateA = new Date(a.pars_date || a.created_at || 0);
      const dateB = new Date(b.pars_date || b.created_at || 0);
      if (sortOrder === "newest") {
        return dateB - dateA;
      }
      return dateA - dateB;
    });

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast);

  const handleCategoryChange = (key) => {
    setActiveCategory(key);
    setCurrentPage(1);
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;
    const pages = [];

    pages.push(
      <button
        key="prev"
        className="pp-pagination__btn"
        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
    );

    for (let i = 1; i <= Math.min(3, totalPages); i++) {
      pages.push(
        <button
          key={i}
          className={`pp-pagination__btn ${currentPage === i ? "pp-pagination__btn--active" : ""}`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      );
    }

    if (totalPages > 4) {
      pages.push(
        <span key="dots" className="pp-pagination__dots">
          ...
        </span>
      );
    }

    if (totalPages > 3) {
      pages.push(
        <button
          key={totalPages}
          className={`pp-pagination__btn ${currentPage === totalPages ? "pp-pagination__btn--active" : ""}`}
          onClick={() => setCurrentPage(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    pages.push(
      <button
        key="next"
        className="pp-pagination__btn"
        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    );

    return <div className="pp-pagination">{pages}</div>;
  };

  return (
    <div>
      <AppHeader />
      <div className="pp">
        <div className="pp-container">
          <div className="pp-hero">
            <h1 className="pp-hero__title">{t("project_page.portfolio_title")}</h1>
            <p className="pp-hero__subtitle">
              {t("project_page.portfolio_subtitle")}
            </p>
          </div>

          <div className="pp-layout">
            {/* Sidebar */}
            <aside className="pp-sidebar">
              <div className="pp-sidebar__section">
                <h3 className="pp-sidebar__heading">{t("project_page.categories")}</h3>
                <div className="pp-sidebar__categories">
                  {categories.map((cat) => {
                    const isActive = activeCategory === cat.key;
                    return (
                    <button
                      key={cat.key}
                      className={`pp-sidebar__cat-btn ${isActive ? "pp-sidebar__cat-btn--active" : ""}`}
                      style={{
                        backgroundColor: isActive ? cat.activeColor : cat.color,
                        color: isActive ? cat.activeText : "#1a2b4a",
                      }}
                      onClick={() => handleCategoryChange(cat.key)}
                    >
                      <span>{cat.label}</span>
                      <span className="pp-sidebar__cat-count">
                        {getCategoryCount(cat.key)}
                      </span>
                    </button>
                    );
                  })}
                </div>
              </div>

              <div className="pp-sidebar__section">
                <h3 className="pp-sidebar__heading">{t("project_page.status")}</h3>
                <div className="pp-sidebar__statuses">
                  <label className="pp-sidebar__checkbox">
                    <input
                      type="checkbox"
                      checked={statusFilters.includes("in_progress")}
                      onChange={() => toggleStatus("in_progress")}
                    />
                    <span className="pp-sidebar__checkmark"></span>
                    {t("project_page.in_progress")}
                  </label>
                  <label className="pp-sidebar__checkbox">
                    <input
                      type="checkbox"
                      checked={statusFilters.includes("completed")}
                      onChange={() => toggleStatus("completed")}
                    />
                    <span className="pp-sidebar__checkmark"></span>
                    {t("project_page.completed_status")}
                  </label>
                  <label className="pp-sidebar__checkbox">
                    <input
                      type="checkbox"
                      checked={statusFilters.includes("planned")}
                      onChange={() => toggleStatus("planned")}
                    />
                    <span className="pp-sidebar__checkmark"></span>
                    {t("project_page.planned")}
                  </label>
                </div>
              </div>

              <div className="pp-sidebar__idea-card">
                <Lightbulb size={28} className="pp-sidebar__idea-icon" />
                <h4 className="pp-sidebar__idea-title">{t("project_page.have_idea")}</h4>
                <p className="pp-sidebar__idea-text">
                  {t("project_page.idea_description")}
                </p>
                <button className="pp-sidebar__idea-btn">
                  {t("project_page.submit_application")}
                </button>
              </div>
            </aside>

            {/* Main Content */}
            <main className="pp-content">
              <div className="pp-content__toolbar">
                <span className="pp-content__shown">
                  {t("project_page.shown")}{" "}
                  <strong>{filteredProjects.length}</strong>{" "}
                  {t("project_page.projects_count")}
                </span>
                <div className="pp-content__toolbar-right">
                  <select
                    className="pp-content__sort"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                  >
                    <option value="newest">{t("project_page.newest_first")}</option>
                    <option value="oldest">{t("project_page.oldest_first")}</option>
                  </select>
                  <div className="pp-content__view-toggle">
                    <button
                      className={`pp-content__view-btn ${viewMode === "grid" ? "pp-content__view-btn--active" : ""}`}
                      onClick={() => setViewMode("grid")}
                      title="Grid view"
                    >
                      <LayoutGrid size={18} />
                    </button>
                    <button
                      className={`pp-content__view-btn ${viewMode === "list" ? "pp-content__view-btn--active" : ""}`}
                      onClick={() => setViewMode("list")}
                      title="List view"
                    >
                      <List size={18} />
                    </button>
                  </div>
                </div>
              </div>

              <ProjectBlock projects={currentProjects} viewMode={viewMode} />

              {renderPagination()}
            </main>
          </div>
        </div>
      </div>
      <AppFooter />
    </div>
  );
}

export default ProjectPage;