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

          const card = (
            <div className="pb-card">
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