import { useRef, useEffect, useState, forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Clock, MapPin, ArrowRight } from "lucide-react";
import "./eventBlock.scss";

const categoryConfig = {
  conference: { labelKey: "events_page.tag_conference", color: "rgba(55, 113, 200, 0.15)", textColor: "#3771C8" },
  seminar: { labelKey: "events_page.tag_seminar", color: "rgba(5, 150, 105, 0.15)", textColor: "#059669" },
  workshop: { labelKey: "events_page.tag_workshop", color: "rgba(251, 140, 0, 0.2)", textColor: "#E65100" },
  hackathon: { labelKey: "events_page.tag_hackathon", color: "rgba(142, 36, 170, 0.2)", textColor: "#8E24AA" },
};

const normalizeDate = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d.toISOString().split("T")[0];
};

const EventBlock = forwardRef(({ events, selectedDate }, ref) => {
  const eventRefs = useRef({});
  const [highlightedEvent, setHighlightedEvent] = useState(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (selectedDate) {
      const dateKey = normalizeDate(selectedDate);
      const eventToScroll = Object.values(eventRefs.current).find(
        (el) => el?.dataset.date === dateKey
      );
      if (eventToScroll) {
        eventToScroll.scrollIntoView({ behavior: "smooth", block: "center" });
        setHighlightedEvent(eventToScroll.dataset.date);
        setTimeout(() => setHighlightedEvent(null), 1500);
      }
    }
  }, [selectedDate, events]);

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    d.setDate(d.getDate() + 1);
    const formatter = new Intl.DateTimeFormat(i18n.language, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const parts = formatter.formatToParts(d);
    const day = parts.find((p) => p.type === "day")?.value;
    let month = parts.find((p) => p.type === "month")?.value;
    const year = parts.find((p) => p.type === "year")?.value;
    if (month) month = month.charAt(0).toUpperCase() + month.slice(1);
    return `${day} ${month}, ${year}`;
  };

  const getImageUrl = (event) => {
    if (!event.image_url) return null;
    if (event.HasOurEvent && !event.image_url.startsWith("http")) {
      return `http://127.0.0.1:8000${event.image_url}`;
    }
    return event.image_url;
  };

  return (
    <div className="eb-container" ref={ref}>
      {events.length > 0 ? (
        events.map((event) => {
          const eventDate = event.event_date
            ? normalizeDate(event.event_date)
            : null;
          const isInternal = event.HasOurEvent || event.OurEventId;
          const eventId = event.OurEventId || event.id;
          const category = (event.category || "conference").toLowerCase();
          const tag = categoryConfig[category] || categoryConfig.conference;
          const imageUrl = getImageUrl(event);

          const content = (
            <div className="eb-card">
              <div className="eb-card__image-wrapper">
                {imageUrl ? (
                  <img src={imageUrl} alt={event.title} className="eb-card__image" />
                ) : (
                  <div className="eb-card__image-placeholder">
                    <svg width="64" height="48" viewBox="0 0 64 48" fill="none">
                      <rect width="64" height="48" rx="8" fill="#e2e8f0" />
                      <path d="M20 36L28 24L34 32L38 27L44 36H20Z" fill="#94a3b8" />
                      <circle cx="26" cy="18" r="4" fill="#94a3b8" />
                    </svg>
                  </div>
                )}
              </div>

              <div className="eb-card__content">
                <div className="eb-card__meta">
                  <span
                    className="eb-card__tag"
                    style={{ backgroundColor: tag.color, color: tag.textColor }}
                  >
                    {t(tag.labelKey)}
                  </span>
                  <span className="eb-card__dot">•</span>
                  <span className="eb-card__date">
                    {formatDate(eventDate)}
                  </span>
                </div>

                <h3 className="eb-card__title">{event.title}</h3>

                <p className="eb-card__description">
                  {event.digest || event.title}
                </p>

                <div className="eb-card__footer">
                  <div className="eb-card__info">
                    {event.event_time_start && (
                      <span className="eb-card__info-item">
                        <Clock size={14} />
                        {event.event_time_start}
                        {event.event_time_end && ` - ${event.event_time_end}`}
                      </span>
                    )}
                    {event.location && (
                      <span className="eb-card__info-item">
                        <MapPin size={14} />
                        {event.location}
                      </span>
                    )}
                  </div>
                  <span className="eb-card__details">
                    {t("events_page.details")} <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          );

          const className = `eb-card__link ${
            highlightedEvent === eventDate ? "eb-card__link--highlighted" : ""
          }`;

          return isInternal ? (
            <Link
              to={`/our-event/${eventId}`}
              key={event.id}
              className={className}
              ref={(el) => {
                eventRefs.current[event.id] = el;
              }}
              data-date={eventDate}
            >
              {content}
            </Link>
          ) : (
            <a
              href={event.ev_site_url}
              target="_blank"
              rel="noopener noreferrer"
              key={event.id}
              className={className}
              ref={(el) => {
                eventRefs.current[event.id] = el;
              }}
              data-date={eventDate}
            >
              {content}
            </a>
          );
        })
      ) : (
        <p className="eb-container__empty">{t("events_page.no_events")}</p>
      )}
    </div>
  );
});

export default EventBlock;