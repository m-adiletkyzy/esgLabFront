import { useState, useEffect, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Search,
  ChevronRight,
  ChevronLeft,
  User,
  Mail,
  CalendarDays,
  MonitorPlay,
  Image as ImageIcon,
  Clock,
  Eye,
  Play,
  ArrowRight,
} from "lucide-react";
import arrowCorrectSvg from "../../img/arrowcorrect.svg";
import AppHeader from "../header/Header";
import AppFooter from "../footer/Footer";
import EventBlock from "./eventBlock/EventBlock";
import api from "../../api";
import "./eventPage.scss";

const normalizeDate = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d.toISOString().split("T")[0];
};





function EventPage() {
  const { t, i18n } = useTranslation();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [archivePhotos, setArchivePhotos] = useState([]);
  const [archiveVideos, setArchiveVideos] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventDates, setEventDates] = useState(new Set());
  const eventBlockRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Registration form
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regEvent, setRegEvent] = useState("");

  const today = useMemo(() => normalizeDate(new Date()), []);

  useEffect(() => {
    const dateSet = new Set(
      events
        .filter((e) => e.event_date)
        .map((e) => normalizeDate(e.event_date))
    );
    setEventDates(dateSet);
  }, [events]);

  useEffect(() => {
    const fetchEvents = () => {
      api
        .get(`api/v1/Events/?lang=${i18n.language}`)
        .then((response) => {
          const data = response.data.results || response.data;
          if (Array.isArray(data) && data.length > 0) {
            setEvents(data);
          }
        })
        .catch(() => {
          setEvents([]);
        });
    };

    fetchEvents();
    i18n.on("languageChanged", fetchEvents);
    return () => i18n.off("languageChanged", fetchEvents);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const handleDateClick = (day) => {
    if (day !== null) {
      const selected = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day
      );
      setSelectedDate(selected);
    }
  };

  // Calendar with Monday first
  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const adjustedFirst = firstDay === 0 ? 6 : firstDay - 1; // Monday = 0
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let days = Array(adjustedFirst).fill(null);
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    const weeks = [];
    while (days.length) {
      weeks.push(days.splice(0, 7));
    }
    return weeks;
  };

  const weekDays = useMemo(() => {
    // Monday-first weekday names
    const days = [];
    for (let i = 1; i <= 7; i++) {
      const d = new Date(2024, 0, i); // Jan 1, 2024 is Monday
      days.push(
        d.toLocaleDateString(i18n.language, { weekday: "short" }).toUpperCase()
      );
    }
    return days;
  }, [i18n.language]);

  const monthYearLabel = useMemo(() => {
    const label = currentMonth.toLocaleString(i18n.language, {
      month: "long",
      year: "numeric",
    });
    return label.charAt(0).toUpperCase() + label.slice(1);
  }, [currentMonth, i18n.language]);

  // Find nearest event
  const nearestEvent = useMemo(() => {
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    const futureEvents = events
      .filter((e) => e.event_date && new Date(e.event_date) >= todayDate)
      .sort((a, b) => new Date(a.event_date) - new Date(b.event_date));
    return futureEvents[0] || null;
  }, [events]);

  const nearestDateFormatted = useMemo(() => {
    if (!nearestEvent) return "";
    const d = new Date(nearestEvent.event_date);
    d.setDate(d.getDate() + 1);
    const formatter = new Intl.DateTimeFormat(i18n.language, {
      day: "numeric",
      month: "long",
    });
    const parts = formatter.formatToParts(d);
    const day = parts.find((p) => p.type === "day")?.value;
    let month = parts.find((p) => p.type === "month")?.value;
    if (month) month = month.charAt(0).toUpperCase() + month.slice(1);
    return `${day} ${month}`;
  }, [nearestEvent, i18n.language]);

  // Filter events by search and selected date
  const selectedDateStr = normalizeDate(selectedDate);
  const eventsForDate = events.filter((e) => {
    const matchesSearch = e.title?.toLowerCase().includes(searchTerm);
    const matchesDate = e.event_date && normalizeDate(e.event_date) === selectedDateStr;
    return matchesSearch && matchesDate;
  });

  const eventsCountForDate = events.filter(
    (e) => e.event_date && normalizeDate(e.event_date) === selectedDateStr
  ).length;

  const formatSelectedDate = () => {
    const d = new Date(selectedDate);
    const formatter = new Intl.DateTimeFormat(i18n.language, {
      day: "numeric",
      month: "long",
    });
    const parts = formatter.formatToParts(d);
    const day = parts.find((p) => p.type === "day")?.value;
    let month = parts.find((p) => p.type === "month")?.value;
    if (month) month = month.charAt(0).toUpperCase() + month.slice(1);
    return `${day} ${month}`;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Registration logic would go here
    setRegName("");
    setRegEmail("");
    setRegEvent("");
  };

  return (
    <div>
      <AppHeader />

      <div className="ep-wrapper">
        <div className="ep">
        <div className="ep-search">
          <Search size={18} className="ep-search__icon" />
          <input
            type="text"
            placeholder={t("events_page.search_placeholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            className="ep-search__input"
          />
        </div>

        <div className="ep-date-heading">
          <h2 className="ep-date-heading__title">
            {t("events_page.events_on")} {formatSelectedDate()}
          </h2>
          <span className="ep-date-heading__count">
            {eventsCountForDate} {t("events_page.events_count")}
          </span>
        </div>

        <div className="ep-main">
          <div className="ep-calendar">
            <div className="ep-calendar__header">
              <span className="ep-calendar__month">{monthYearLabel}</span>
              <div className="ep-calendar__nav">
                <button onClick={prevMonth} className="ep-calendar__nav-btn">
                  <ChevronLeft size={16} />
                </button>
                <button onClick={nextMonth} className="ep-calendar__nav-btn">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            <div className="ep-calendar__weekdays">
              {weekDays.map((day, i) => (
                <div key={i} className="ep-calendar__weekday">
                  {day}
                </div>
              ))}
            </div>

            <div className="ep-calendar__grid">
              {renderCalendar().map((week, wi) =>
                week.map((day, di) => {
                  const dateObj =
                    day !== null
                      ? new Date(
                          currentMonth.getFullYear(),
                          currentMonth.getMonth(),
                          day
                        )
                      : null;
                  const dateKey = dateObj ? normalizeDate(dateObj) : null;
                  const hasEvent = eventDates.has(dateKey);
                  const isSelected =
                    selectedDate && selectedDateStr === dateKey;
                  const isToday = dateKey === today;

                  return (
                    <div
                      key={wi * 7 + di}
                      onClick={() => handleDateClick(day)}
                      className={`ep-calendar__day ${
                        day === null ? "ep-calendar__day--empty" : ""
                      } ${isSelected ? "ep-calendar__day--selected" : ""} ${
                        isToday && !isSelected ? "ep-calendar__day--today" : ""
                      } ${hasEvent && !isSelected ? "ep-calendar__day--event" : ""}`}
                    >
                      {day}
                      {hasEvent && !isSelected && (
                        <span className="ep-calendar__day-dot" />
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {nearestEvent && (
              <div className="ep-calendar__nearest">
                <span className="ep-calendar__nearest-dot" />
                {t("events_page.nearest_event")} ({nearestDateFormatted})
              </div>
            )}
          </div>

          <div className="ep-events">
            <EventBlock
              ref={eventBlockRef}
              events={eventsForDate}
              selectedDate={selectedDate}
            />
          </div>
        </div>
      </div>
    </div>

      {/* Registration Section (Full Width) */}
      <section className="ep-registration">
        <div className="ep-registration__leaf ep-registration__leaf--left" />
          <div className="ep-registration__leaf ep-registration__leaf--right" />
          <div className="ep-registration__inner">
            <div className="ep-registration__info">
              <span className="ep-registration__badge">
                <span className="ep-registration__badge-dot" />
                {t("events_page.registration")}
              </span>
              <h2 className="ep-registration__title">
                {t("events_page.join_title")}
              </h2>
              <p className="ep-registration__desc">
                {t("events_page.join_description")}
              </p>
              <ul className="ep-registration__list">
                <li>
                  <img src={arrowCorrectSvg} alt="" width={20} height={20} />
                  {t("events_page.benefit_1")}
                </li>
                <li>
                  <img src={arrowCorrectSvg} alt="" width={20} height={20} />
                  {t("events_page.benefit_2")}
                </li>
              </ul>
            </div>

            <div className="ep-registration__form-card">
              <form onSubmit={handleRegister}>
                <label className="ep-registration__label">
                  <User size={14} />
                  {t("events_page.full_name")}
                </label>
                <input
                  type="text"
                  placeholder="Jane Doe"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="ep-registration__input"
                  required
                />

                <label className="ep-registration__label">
                  <Mail size={14} />
                  {t("events_page.corp_email")}
                </label>
                <input
                  type="email"
                  placeholder="janedoe@kbtu.kz"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="ep-registration__input"
                  required
                />

                <label className="ep-registration__label">
                  <CalendarDays size={14} />
                  {t("events_page.choose_event")}
                </label>
                <select
                  value={regEvent}
                  onChange={(e) => setRegEvent(e.target.value)}
                  className="ep-registration__select"
                  required
                >
                  <option value="">
                    {t("events_page.select_event_placeholder")}
                  </option>
                  {events.map((ev) => (
                    <option key={ev.id} value={ev.id}>
                      {ev.title}
                    </option>
                  ))}
                </select>

                <button type="submit" className="ep-registration__submit">
                  {t("events_page.register_btn")}
                </button>
              </form>
              <p className="ep-registration__privacy">
                {t("events_page.privacy_note")}
              </p>
            </div>
          </div>
        </section>

      {/* Archive Section */}
      <div className="ep-archive-wrapper">
        <div className="ep">
          <section className="ep-archive">
            <div className="ep-archive__header">
            <h2 className="ep-archive__title">
              <MonitorPlay size={22} />
              {t("events_page.archive_title")}
            </h2>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#" className="ep-archive__link">
              {t("events_page.view_all")} <ArrowRight size={14} />
            </a>
          </div>

          <div className="ep-archive__grid">
            <div className="ep-archive__card">
              <h3 className="ep-archive__card-title">
                <ImageIcon size={18} />
                {t("events_page.photo_gallery")}
                <span className="ep-archive__card-date">
                  {t("events_page.updated")}: {t("events_page.january")} 2026
                </span>
              </h3>
              <div className="ep-archive__photos">
                {archivePhotos.length > 0 ? (
                  archivePhotos.map((photo, i) => (
                    <div key={i} className="ep-archive__photo">
                      <img src={photo.url} alt="" className="ep-archive__photo-image" />
                    </div>
                  ))
                ) : (
                  <p className="ep-archive__empty">{t("events_page.no_photos", "Нет фото")}</p>
                )}
              </div>
            </div>

            <div className="ep-archive__card">
              <h3 className="ep-archive__card-title">
                <MonitorPlay size={18} />
                {t("events_page.video_records")}
              </h3>
              <div className="ep-archive__videos">
                {archiveVideos.length > 0 ? (
                  archiveVideos.map((video) => (
                    <div key={video.id} className="ep-archive__video-item">
                      <div className="ep-archive__video-thumb">
                        <Play size={20} />
                      </div>
                      <div className="ep-archive__video-info">
                        <p className="ep-archive__video-title">{video.title}</p>
                        <div className="ep-archive__video-meta">
                          <span>
                            <Clock size={12} /> {video.duration}
                          </span>
                          <span>
                            <Eye size={12} /> {video.views}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="ep-archive__empty">{t("events_page.no_videos", "Нет видеозаписей")}</p>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

      <AppFooter />
    </div>
  );
}

export default EventPage;