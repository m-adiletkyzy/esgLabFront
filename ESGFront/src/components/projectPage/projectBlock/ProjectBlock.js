import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Leaf, ShieldCheck, ArrowRight } from "lucide-react";
import usersRoundSvg from "../../../img/usersRound.svg";
import "./projectBlock.scss";

const categoryConfig = {
  environmental: {
    icon: Leaf,
    color: "rgba(5, 150, 105, 0.37)",
    iconColor: "#059669",
    label: "Environmental",
  },
  social: {
    icon: null,
    color: "rgba(255, 221, 85, 0.37)",
    iconColor: "#B8860B",
    label: "Social",
  },
  governance: {
    icon: ShieldCheck,
    color: "rgba(55, 113, 200, 0.37)",
    iconColor: "#3771C8",
    label: "Governance",
  },
};

const statusConfig = {
  in_progress: { labelKey: "project_page.in_progress", color: "rgba(251, 140, 0, 0.25)", textColor: "#E65100" },
  completed: { labelKey: "project_page.completed_status", color: "rgba(0, 230, 118, 0.25)", textColor: "#2E7D32" },
  planned: { labelKey: "project_page.planned", color: "rgba(142, 36, 170, 0.25)", textColor: "#8E24AA" },
};

function ProjectBlock({ projects, viewMode = "grid" }) {
  const { t } = useTranslation();

  return (
    <div className={`pb-grid ${viewMode === "list" ? "pb-grid--list" : ""}`}>
      {projects &&
        projects.map((item) => {
          const isInternal =
            item.HasOurProject && item.OurProjectId && item.lang;

          const category = (item.category || "environmental").toLowerCase();
          const catConfig = categoryConfig[category] || categoryConfig.environmental;
          const CatIcon = catConfig.icon;

          const derivedStatus = item.status || (item.isActive ? "in_progress" : "completed");
          const stConfig = statusConfig[derivedStatus] || statusConfig.in_progress;

          const getImageUrl = (project) => {
            if (!project.image_url) return null;
            if (project.HasOurProject && !project.image_url.startsWith("http")) {
              return `http://127.0.0.1:8000${project.image_url}`;
            }
            return project.image_url;
          };

          const imageUrl = getImageUrl(item);

          const card = (
            <div className="pb-card">
              <div className="pb-card__image-wrapper">
                {imageUrl ? (
                  <img src={imageUrl} alt={item.title} className="pb-card__image" />
                ) : (
                  <div className="pb-card__image-placeholder">
                    <svg width="48" height="48" viewBox="0 0 64 48" fill="none">
                      <rect width="64" height="48" rx="8" fill="#e2e8f0" />
                      <path d="M20 36L28 24L34 32L38 27L44 36H20Z" fill="#94a3b8" />
                      <circle cx="26" cy="18" r="4" fill="#94a3b8" />
                      <path d="M8 8L16 16M56 8L48 16" stroke="#cbd5e1" strokeWidth="1.5" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="pb-card__header">
                <div
                  className="pb-card__icon-circle"
                  style={{ backgroundColor: catConfig.color }}
                >
                  {CatIcon ? (
                    <CatIcon size={22} color={catConfig.iconColor} />
                  ) : (
                    <img src={usersRoundSvg} alt="social" width={22} height={22} />
                  )}
                </div>
                <span
                  className="pb-card__status-badge"
                  style={{
                    backgroundColor: stConfig.color,
                    color: stConfig.textColor,
                  }}
                >
                  {t(stConfig.labelKey)}
                </span>
              </div>

              <h3 className="pb-card__title">{item.title}</h3>

              <p className="pb-card__description">
                {item.digest || t("project_page.no_description")}
              </p>

              <div className="pb-card__footer">
                <span
                  className="pb-card__category-tag"
                  style={{
                    backgroundColor: catConfig.color,
                    color: catConfig.iconColor,
                  }}
                >
                  {catConfig.label}
                </span>
                <span className="pb-card__details-link">
                  {t("project_page.details")} <ArrowRight size={16} />
                </span>
              </div>
            </div>
          );

          return isInternal ? (
            <Link
              to={`/our-project/${item.OurProjectId}`}
              key={item.id}
              className="pb-card__link"
            >
              {card}
            </Link>
          ) : (
            <a
              href={item.pr_site_url}
              key={item.id}
              className="pb-card__link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {card}
            </a>
          );
        })}
    </div>
  );
}

export default ProjectBlock;