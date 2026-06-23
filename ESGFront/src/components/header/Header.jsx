import { useState, useEffect, useRef } from "react";
import "./header.scss";
import { useTranslation } from "react-i18next";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { languages, links } from "../../constants/constants";
import { useAuth } from "../../pages/AuthPage/AuthContext";
import { Globe } from "lucide-react";
import profileSvg from "../../img/profile.svg";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(i18n.language);
  const [userOpen, setUserOpen] = useState(false);
  const menuRef = useRef(null);
  const langRef = useRef(null);
  const userRef = useRef(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    setSelectedLang(code);
    setLangOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
    setLangOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
      if (langRef.current && !langRef.current.contains(event.target)) {
        setLangOpen(false);
      }
      if (userRef.current && !userRef.current.contains(event.target)) {
        setUserOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={menuOpen ? "expanded" : ""}>
      <div className="container">
        <div className="header" ref={menuRef}>
          <div className="header__logo">
            <NavLink to="/">
              <span className="header__logo-text">ESG KBTU</span>
            </NavLink>
          </div>

          <nav className={`header__nav ${menuOpen ? "show" : ""}`}>
            <ul>
              {links.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      isActive ? "active-link" : ""
                    }
                    onClick={closeMenu}
                  >
                    {t(link.label)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header__right">
            <div
              className="header__lang"
              ref={langRef}
              onClick={() => setLangOpen((prev) => !prev)}
            >
              <Globe size={20} className="header__lang-globe" />
              <span className="header__lang-code">
                {selectedLang?.toUpperCase()}
              </span>
              {langOpen && (
                <div className="header__lang-dropdown">
                  {languages.map(({ code, label }) => (
                    <div
                      key={code}
                      className={`header__lang-option ${
                        selectedLang === code ? "header__lang-option--active" : ""
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        changeLanguage(code);
                      }}
                    >
                      {label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="header__divider" />

            <div
              className="header__user"
              ref={userRef}
              onClick={() => setUserOpen((prev) => !prev)}
            >
              <img src={profileSvg} alt="" width={16} height={16} className="header__user-icon" />
              {userOpen && (
                <div className="header__user-dropdown">
                  {isAuthenticated ? (
                    <>
                      <Link to="/profile" className="header__user-link">
                        {t("profile") || "Профиль"}
                      </Link>
                      <button
                        onClick={() => navigate("/logout")}
                        className="header__user-link header__user-link--logout"
                      >
                        {t("logout") || "Выйти"}
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/auth"
                      className="header__user-link header__user-link--login"
                    >
                      {t("login") || "Войти"}
                    </Link>
                  )}
                </div>
              )}
            </div>

            <div
              className={`burger ${menuOpen ? "open" : ""}`}
              onClick={toggleMenu}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
