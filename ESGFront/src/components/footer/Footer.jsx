<<<<<<< HEAD
import { useTranslation } from "react-i18next";
import { Globe, Instagram, Send, MapPin, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import "./footer.scss";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__main">
          {/* Column 1 - Brand */}
          <div className="footer__col footer__col--brand">
            <h3 className="footer__logo">ESG KBTU</h3>
            <p className="footer__brand-text">
              {t("footer.platform_description")}
            </p>
            <div className="footer__socials">
              <a href="#" className="footer__social-link" aria-label="Website">
                <Globe size={20} />
              </a>
              <a href="#" className="footer__social-link" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="footer__social-link" aria-label="Telegram">
                <Send size={20} />
              </a>
            </div>
          </div>

          {/* Column 2 - Navigation */}
          <div className="footer__col">
            <h4 className="footer__heading">{t("footer.navigation")}</h4>
            <ul className="footer__links">
              <li><Link to="/about">{t("about")}</Link></li>
              <li><Link to="/news">{t("news")}</Link></li>
              <li><Link to="/course">{t("courses")}</Link></li>
              <li><Link to="/project">{t("projects")}</Link></li>
              <li><Link to="/event">{t("events")}</Link></li>
            </ul>
          </div>

          {/* Column 3 - Directions */}
          <div className="footer__col">
            <h4 className="footer__heading">{t("footer.directions")}</h4>
            <ul className="footer__links">
              <li><Link to="/esg-campus">ESG Campus</Link></li>
              <li><Link to="/esg-lab">ESG Lab</Link></li>
              <li><Link to="/news">{t("footer.subscribe")}</Link></li>
              <li><Link to="/news">{t("footer.news_archive")}</Link></li>
            </ul>
          </div>

          {/* Column 4 - Contacts */}
          <div className="footer__col">
            <h4 className="footer__heading">{t("contacts")}</h4>
            <ul className="footer__contacts">
              <li>
                <MapPin size={16} />
                <span>{t("footer.address")}</span>
              </li>
              <li>
                <Mail size={16} />
                <a href="mailto:esg@kbtu.kz">esg@kbtu.kz</a>
              </li>
              <li>
                <Phone size={16} />
                <a href="tel:+77273574242">+7 (727) 357-42-42</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>&copy; 2026 ESG KBTU. {t("all_rights_res")}.</span>
          <div className="footer__bottom-links">
            <a href="#">{t("footer.privacy_policy")}</a>
            <a href="#">{t("footer.terms_of_use")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
=======
import { useTranslation } from "react-i18next";
import { Globe, Instagram, Send, MapPin, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import "./footer.scss";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__main">
          {/* Column 1 - Brand */}
          <div className="footer__col footer__col--brand">
            <h3 className="footer__logo">ESG KBTU</h3>
            <p className="footer__brand-text">
              {t("footer.platform_description")}
            </p>
            <div className="footer__socials">
              <a href="#" className="footer__social-link" aria-label="Website">
                <Globe size={20} />
              </a>
              <a href="#" className="footer__social-link" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="footer__social-link" aria-label="Telegram">
                <Send size={20} />
              </a>
            </div>
          </div>

          {/* Column 2 - Navigation */}
          <div className="footer__col">
            <h4 className="footer__heading">{t("footer.navigation")}</h4>
            <ul className="footer__links">
              <li><Link to="/about">{t("about")}</Link></li>
              <li><Link to="/news">{t("news")}</Link></li>
              <li><Link to="/course">{t("courses")}</Link></li>
              <li><Link to="/project">{t("projects")}</Link></li>
              <li><Link to="/event">{t("events")}</Link></li>
            </ul>
          </div>

          {/* Column 3 - Directions */}
          <div className="footer__col">
            <h4 className="footer__heading">{t("footer.directions")}</h4>
            <ul className="footer__links">
              <li><Link to="/esg">ESG Campus</Link></li>
              <li><Link to="/esg-lab">ESG Lab</Link></li>
              <li><Link to="/news">{t("footer.subscribe")}</Link></li>
              <li><Link to="/news">{t("footer.news_archive")}</Link></li>
            </ul>
          </div>

          {/* Column 4 - Contacts */}
          <div className="footer__col">
            <h4 className="footer__heading">{t("contacts")}</h4>
            <ul className="footer__contacts">
              <li>
                <MapPin size={16} />
                <span>{t("footer.address")}</span>
              </li>
              <li>
                <Mail size={16} />
                <a href="mailto:esg@kbtu.kz">esg@kbtu.kz</a>
              </li>
              <li>
                <Phone size={16} />
                <a href="tel:+77273574242">+7 (727) 357-42-42</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>&copy; 2026 ESG KBTU. {t("all_rights_res")}.</span>
          <div className="footer__bottom-links">
            <a href="#">{t("footer.privacy_policy")}</a>
            <a href="#">{t("footer.terms_of_use")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
>>>>>>> origin/fix/page-background-layouts
