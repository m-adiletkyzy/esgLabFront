import { useState, useEffect, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import filterIcon from "../../img/filtericonnews.svg";
import searchIcon from "../../img/search.svg";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Article from "../../components/Article/Article";
import api from "../../api";
import overlayBlur from "../../img/overlayblur.svg";
import emailIcon from "../../img/email.svg";
import "./newsPage.scss";



const MOCK_NEWS = [
  { id: 1, title: "КБТУ запустил программу углеродной нейтральности кампуса", digest: "Университет поставил цель достичь углеродной нейтральности к 2030 году через внедрение солнечных панелей и энергоэффективных систем.", ar_date: "2025-03-28", category: "environmental", image_url: "" },
  { id: 2, title: "Новая стипендиальная программа для студентов из малообеспеченных семей", digest: "КБТУ расширяет доступ к образованию через ESG-ориентированные гранты и социальные стипендии.", ar_date: "2025-03-26", category: "social", image_url: "" },
  { id: 3, title: "Совет директоров утвердил ESG-стратегию на 2025–2028 годы", digest: "Документ включает 42 ключевых показателя эффективности в области экологии, социальной ответственности и управления.", ar_date: "2025-03-24", category: "governance", image_url: "" },
  { id: 4, title: "Партнёрство с UNDP по устойчивому развитию в Центральной Азии", digest: "КБТУ и Программа развития ООН подписали меморандум о сотрудничестве в области ESG-образования.", ar_date: "2025-03-22", category: "environmental", image_url: "" },
  { id: 5, title: "Хакатон ESG Solutions собрал 200 участников", digest: "Студенты из 15 университетов разработали прототипы решений для мониторинга углеродного следа.", ar_date: "2025-03-20", category: "social", image_url: "" },
  { id: 6, title: "Внедрение системы раздельного сбора отходов в кампусе", digest: "На территории университета установлены 50 контейнеров для раздельного сбора пластика, бумаги и органических отходов.", ar_date: "2025-03-18", category: "environmental", image_url: "" },
  { id: 7, title: "ESG-рейтинг КБТУ вошёл в топ-5 среди вузов Казахстана", digest: "Независимая оценка подтвердила лидерство университета в области корпоративной ответственности.", ar_date: "2025-03-16", category: "governance", image_url: "" },
  { id: 8, title: "Запущен курс «Зелёные финансы» совместно с AIFC", digest: "Программа обучает студентов принципам устойчивого инвестирования и зелёного финансирования.", ar_date: "2025-03-14", category: "governance", image_url: "" },
  { id: 9, title: "Волонтёрская акция по озеленению района Медеу", digest: "Более 300 студентов и преподавателей КБТУ высадили 500 деревьев в рамках экологической инициативы.", ar_date: "2025-03-12", category: "environmental", image_url: "" },
  { id: 10, title: "Конференция «Женщины в ESG» прошла в КБТУ", digest: "Спикеры из 8 стран обсудили роль женского лидерства в устойчивом развитии и корпоративном управлении.", ar_date: "2025-03-10", category: "social", image_url: "" },
  { id: 11, title: "Энергоаудит кампуса выявил потенциал экономии 30%", digest: "Результаты аудита показали возможности сокращения энергопотребления через модернизацию систем отопления и освещения.", ar_date: "2025-03-08", category: "environmental", image_url: "" },
  { id: 12, title: "Создан студенческий ESG-комитет", digest: "Комитет будет координировать студенческие инициативы в области устойчивого развития и представлять интересы студентов.", ar_date: "2025-03-06", category: "governance", image_url: "" },
  { id: 13, title: "КБТУ перешёл на 100% переработанную бумагу", digest: "Все подразделения университета полностью перешли на использование бумаги из вторичного сырья.", ar_date: "2025-03-04", category: "environmental", image_url: "" },
  { id: 14, title: "Программа менторства для студентов первого поколения", digest: "Инициатива помогает студентам, первыми в семье получающим высшее образование, адаптироваться к университетской среде.", ar_date: "2025-03-02", category: "social", image_url: "" },
  { id: 15, title: "Публикация первого ESG-отчёта КБТУ", digest: "Отчёт охватывает экологические, социальные и управленческие показатели за 2024 год по международным стандартам GRI.", ar_date: "2025-02-28", category: "governance", image_url: "" },
  { id: 16, title: "Солнечные панели на крыше главного корпуса", digest: "Установка 200 панелей позволит генерировать до 15% электроэнергии, потребляемой зданием.", ar_date: "2025-02-26", category: "environmental", image_url: "" },
  { id: 17, title: "Открытие инклюзивного учебного пространства", digest: "Новый хаб адаптирован для студентов с ограниченными возможностями и оснащён современными ассистивными технологиями.", ar_date: "2025-02-24", category: "social", image_url: "" },
  { id: 18, title: "Антикоррупционная политика обновлена в соответствии с ISO 37001", digest: "КБТУ привёл внутренние регламенты в соответствие с международным стандартом антикоррупционного менеджмента.", ar_date: "2025-02-22", category: "governance", image_url: "" },
  { id: 19, title: "Запуск мониторинга качества воздуха на кампусе", digest: "Датчики IoT в режиме реального времени отслеживают уровень PM2.5, CO2 и других загрязнителей.", ar_date: "2025-02-20", category: "environmental", image_url: "" },
  { id: 20, title: "Студенческий проект по переработке электронных отходов", digest: "Команда собрала и безопасно утилизировала 2 тонны устаревшей электроники из кампуса.", ar_date: "2025-02-18", category: "environmental", image_url: "" },
  { id: 21, title: "Грантовая программа для ESG-исследований", digest: "Университет выделил 50 млн тенге на поддержку научных проектов в области устойчивого развития.", ar_date: "2025-02-16", category: "governance", image_url: "" },
  { id: 22, title: "Мастер-класс по ESG-отчётности от PwC", digest: "Эксперты PwC провели практический семинар по подготовке нефинансовой отчётности для студентов MBA.", ar_date: "2025-02-14", category: "governance", image_url: "" },
  { id: 23, title: "Кампания по сокращению пластика в столовых", digest: "Университет заменил одноразовую посуду на биоразлагаемые альтернативы во всех точках питания.", ar_date: "2025-02-12", category: "environmental", image_url: "" },
  { id: 24, title: "Открытие центра психологической поддержки студентов", digest: "Бесплатные консультации психологов доступны для всех студентов и сотрудников КБТУ.", ar_date: "2025-02-10", category: "social", image_url: "" },
  { id: 25, title: "КБТУ присоединился к UN Global Compact", digest: "Университет взял на себя обязательства по соблюдению 10 принципов Глобального договора ООН.", ar_date: "2025-02-08", category: "governance", image_url: "" },
  { id: 26, title: "Зелёный марафон «Eco Run KBTU 2025»", digest: "Более 1000 участников пробежали 5 км в поддержку экологических инициатив университета.", ar_date: "2025-02-06", category: "social", image_url: "" },
  { id: 27, title: "Система умного освещения сократила расход энергии на 25%", digest: "Автоматические датчики движения и освещённости установлены во всех учебных корпусах.", ar_date: "2025-02-04", category: "environmental", image_url: "" },
  { id: 28, title: "Этический кодекс КБТУ обновлён на 2025 год", digest: "Документ дополнен положениями о цифровой этике, конфликте интересов и защите информаторов.", ar_date: "2025-02-02", category: "governance", image_url: "" },
  { id: 29, title: "Семинар по климатическим рискам для бизнеса", digest: "Эксперты Всемирного банка представили методологию оценки климатических рисков для казахстанских компаний.", ar_date: "2025-01-30", category: "environmental", image_url: "" },
  { id: 30, title: "Программа трудоустройства выпускников с инвалидностью", digest: "КБТУ запустил партнёрскую программу с 20 компаниями для трудоустройства выпускников с особыми потребностями.", ar_date: "2025-01-28", category: "social", image_url: "" },
  { id: 31, title: "Водосберегающие технологии в лабораториях КБТУ", digest: "Новые системы рециркуляции воды позволяют экономить до 40% водных ресурсов в химических лабораториях.", ar_date: "2025-01-26", category: "environmental", image_url: "" },
  { id: 32, title: "ESG-форум «Зелёный Казахстан 2030»", digest: "КБТУ выступил организатором национального форума по интеграции ESG-принципов в государственную политику.", ar_date: "2025-01-24", category: "governance", image_url: "" },
  { id: 33, title: "Благотворительная ярмарка студенческих проектов", digest: "Собранные средства направлены на поддержку детских домов и экологических проектов в регионах.", ar_date: "2025-01-22", category: "social", image_url: "" },
  { id: 34, title: "Переход автопарка КБТУ на электромобили", digest: "Университет приобрёл 5 электромобилей для служебных поездок и установил зарядные станции.", ar_date: "2025-01-20", category: "environmental", image_url: "" },
  { id: 35, title: "Разработка ESG-индекса для МСБ Казахстана", digest: "Исследователи КБТУ создали адаптированную методологию ESG-оценки для малого и среднего бизнеса.", ar_date: "2025-01-18", category: "governance", image_url: "" },
  { id: 36, title: "День здоровья и благополучия сотрудников КБТУ", digest: "Программа включала бесплатные медосмотры, занятия йогой и консультации по питанию для всех сотрудников.", ar_date: "2025-01-16", category: "social", image_url: "" },
  { id: 37, title: "Зелёная сертификация зданий КБТУ по стандарту BREEAM", digest: "Главный учебный корпус получил сертификат BREEAM Very Good за энергоэффективность и экологичность.", ar_date: "2025-01-14", category: "environmental", image_url: "" },
  { id: 38, title: "Партнёрство с Chevron по программе экологического мониторинга", digest: "Совместный проект направлен на мониторинг состояния окружающей среды в Атырауской области.", ar_date: "2025-01-12", category: "environmental", image_url: "" },
  { id: 39, title: "Вебинар «ESG для начинающих» собрал 500 участников", digest: "Онлайн-мероприятие познакомило участников с основами ESG и их значением для карьеры.", ar_date: "2025-01-10", category: "social", image_url: "" },
  { id: 40, title: "Совет по устойчивому развитию КБТУ провёл первое заседание", digest: "Совет определил приоритетные направления ESG-работы на 2025 год и утвердил KPI.", ar_date: "2025-01-08", category: "governance", image_url: "" },
  { id: 41, title: "Проект по восстановлению экосистемы реки Есентай", digest: "Студенты-экологи КБТУ провели анализ состояния реки и предложили план её восстановления.", ar_date: "2025-01-06", category: "environmental", image_url: "" },
  { id: 42, title: "Культурный фестиваль «Многообразие КБТУ»", digest: "Студенты из 30 стран представили свои культуры через кухню, музыку и традиции.", ar_date: "2025-01-04", category: "social", image_url: "" },
  { id: 43, title: "Аудит корпоративного управления по стандартам ОЭСР", digest: "Внешние аудиторы оценили практики корпоративного управления КБТУ и дали рекомендации по улучшению.", ar_date: "2025-01-02", category: "governance", image_url: "" },
  { id: 44, title: "Установка станций для зарядки электросамокатов", digest: "В кампусе появились 10 зарядных станций для поощрения экологичного транспорта среди студентов.", ar_date: "2024-12-30", category: "environmental", image_url: "" },
  { id: 45, title: "Программа финансовой грамотности для студентов", digest: "Серия воркшопов по бюджетированию, инвестированию и управлению долгами для студентов всех курсов.", ar_date: "2024-12-28", category: "social", image_url: "" },
  { id: 46, title: "КБТУ внедрил цифровой документооборот без бумаги", digest: "Полный переход на электронные документы позволит сэкономить 10 тонн бумаги ежегодно.", ar_date: "2024-12-26", category: "governance", image_url: "" },
  { id: 47, title: "Исследование: влияние загрязнения воздуха Алматы на здоровье", digest: "Учёные КБТУ опубликовали данные о корреляции между PM2.5 и респираторными заболеваниями.", ar_date: "2024-12-24", category: "environmental", image_url: "" },
  { id: 48, title: "Открытие коворкинга для социальных предпринимателей", digest: "Бесплатное рабочее пространство для стартапов, решающих социальные и экологические проблемы.", ar_date: "2024-12-22", category: "social", image_url: "" },
  { id: 49, title: "Прозрачность бюджета: КБТУ публикует финансовую отчётность", digest: "Впервые университет опубликовал полную финансовую отчётность в открытом доступе.", ar_date: "2024-12-20", category: "governance", image_url: "" },
  { id: 50, title: "Лаборатория возобновляемой энергии открыта в КБТУ", digest: "Новая лаборатория оснащена оборудованием для исследований в области солнечной и ветровой энергетики.", ar_date: "2024-12-18", category: "environmental", image_url: "" },
  { id: 51, title: "КБТУ стал партнёром Глобальной сети университетов по климату", digest: "Университет вошёл в международную сеть из 150 вузов, объединённых целями борьбы с изменением климата.", ar_date: "2024-12-16", category: "environmental", image_url: "" },
  { id: 52, title: "Стажировки в ESG-отделах крупных компаний для студентов", digest: "Партнёрские программы с Самрук-Казына, КазМунайГаз и Kaspi позволяют студентам пройти практику.", ar_date: "2024-12-14", category: "social", image_url: "" },
  { id: 53, title: "Обновление политики закупок с учётом ESG-критериев", digest: "Университет будет отдавать предпочтение поставщикам с подтверждёнными ESG-практиками.", ar_date: "2024-12-12", category: "governance", image_url: "" },
  { id: 54, title: "Проект «Зелёная крыша» для улучшения микроклимата кампуса", digest: "На крышах трёх корпусов высажены растения, снижающие температуру и улучшающие качество воздуха.", ar_date: "2024-12-10", category: "environmental", image_url: "" },
  { id: 55, title: "Форум молодых ESG-лидеров Центральной Азии", digest: "100 студентов из 5 стран обсудили вызовы и возможности устойчивого развития в регионе.", ar_date: "2024-12-08", category: "social", image_url: "" },
  { id: 56, title: "Введение ESG-модуля во все магистерские программы", digest: "Обязательный модуль по устойчивому развитию интегрирован в учебные планы всех направлений магистратуры.", ar_date: "2024-12-06", category: "governance", image_url: "" },
  { id: 57, title: "Компостирование органических отходов из столовых", digest: "Пилотный проект по компостированию перерабатывает 500 кг пищевых отходов еженедельно.", ar_date: "2024-12-04", category: "environmental", image_url: "" },
  { id: 58, title: "Спортивная программа «Здоровый кампус» для сотрудников", digest: "Бесплатный доступ к спортзалу и групповые занятия фитнесом для всех работников университета.", ar_date: "2024-12-02", category: "social", image_url: "" },
  { id: 59, title: "Цифровая платформа для ESG-отчётности запущена", digest: "Собственная разработка КБТУ автоматизирует сбор и визуализацию ESG-данных университета.", ar_date: "2024-11-30", category: "governance", image_url: "" },
  { id: 60, title: "Исследование биоразнообразия территории кампуса", digest: "Биологи КБТУ каталогизировали 45 видов птиц и 120 видов растений на территории университета.", ar_date: "2024-11-28", category: "environmental", image_url: "" },
  { id: 61, title: "Менторская программа «ESG Buddy» для первокурсников", digest: "Старшекурсники помогают новым студентам адаптироваться и вовлекаться в ESG-проекты.", ar_date: "2024-11-26", category: "social", image_url: "" },
  { id: 62, title: "Независимая оценка рисков кибербезопасности КБТУ", digest: "Аудит выявил и устранил уязвимости в информационных системах университета.", ar_date: "2024-11-24", category: "governance", image_url: "" },
  { id: 63, title: "Акция «Час Земли» в КБТУ: кампус погасил свет", digest: "Университет поддержал глобальную акцию WWF, отключив освещение на час и проведя экологическую лекцию.", ar_date: "2024-11-22", category: "environmental", image_url: "" },
  { id: 64, title: "Социальный проект «Доступное образование» расширяется", digest: "КБТУ увеличил число бесплатных онлайн-курсов до 50, доступных для всех желающих.", ar_date: "2024-11-20", category: "social", image_url: "" },
  { id: 65, title: "Совершенствование системы оценки преподавателей", digest: "Новая система включает ESG-компоненты: вклад в сообщество, наставничество и этика преподавания.", ar_date: "2024-11-18", category: "governance", image_url: "" },
  { id: 66, title: "Тепловые насосы установлены для отопления нового корпуса", digest: "Геотермальная система обеспечивает отопление с нулевыми прямыми выбросами CO2.", ar_date: "2024-11-16", category: "environmental", image_url: "" },
  { id: 67, title: "Запуск ESG-подкаста КБТУ", digest: "Еженедельный подкаст с интервью экспертов, студентов и бизнес-лидеров о тематике устойчивого развития.", ar_date: "2024-11-14", category: "social", image_url: "" },
  { id: 68, title: "Benchmark-анализ ESG-практик топ-10 вузов мира", digest: "Исследование сравнивает подходы ведущих университетов к устойчивому развитию для адаптации лучших практик.", ar_date: "2024-11-12", category: "governance", image_url: "" },
  { id: 69, title: "Студенческий проект по очистке озера Сайран", digest: "50 волонтёров собрали 300 кг мусора и установили информационные стенды об экологии водоёма.", ar_date: "2024-11-10", category: "environmental", image_url: "" },
  { id: 70, title: "КБТУ запустил горячую линию по вопросам этики", digest: "Анонимная линия позволяет сотрудникам и студентам сообщать о нарушениях этических стандартов.", ar_date: "2024-11-08", category: "governance", image_url: "" },
  { id: 71, title: "Инклюзивная программа обучения для людей старшего возраста", digest: "Университет открыл бесплатные IT-курсы для пенсионеров в рамках социальной ответственности.", ar_date: "2024-11-06", category: "social", image_url: "" },
  { id: 72, title: "КБТУ сократил потребление воды на 20% за год", digest: "Установка водосберегающей арматуры и систем сбора дождевой воды дала ощутимый результат.", ar_date: "2024-11-04", category: "environmental", image_url: "" },
];

const categoryFilters = [
  { key: "all", labelKey: "news_page.all_categories" },
  { key: "environmental", labelKey: "news_page.environmental", color: "rgba(5, 150, 105, 0.2)", textColor: "#059669" },
  { key: "social", labelKey: "news_page.social_filter", color: "rgba(255, 221, 85, 0.3)", textColor: "#B8860B" },
  { key: "governance", labelKey: "news_page.governance", color: "rgba(55, 113, 200, 0.2)", textColor: "#3771C8" },
];

export default function NewsPage() {
  const { t, i18n } = useTranslation();
  const [news, setNews] = useState(MOCK_NEWS);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [email, setEmail] = useState("");
  const [subMessage, setSubMessage] = useState("");
  const [subError, setSubError] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [monthDropdownOpen, setMonthDropdownOpen] = useState(false);
  const monthRef = useRef(null);
  const newsPerPage = 6;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await api.get(`api/v1/News/?lang=${i18n.language}`);
        const data = res.data?.results || res.data;
        if (Array.isArray(data) && data.length > 0) {
          setNews(data);
        }
      } catch (error) {
        // Keep mock data if API fails
      }
    };

    fetchNews();
    i18n.on("languageChanged", fetchNews);
    return () => i18n.off("languageChanged", fetchNews);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Close month dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (monthRef.current && !monthRef.current.contains(e.target)) {
        setMonthDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get unique months from news data
  const availableMonths = useMemo(() => {
    const monthsMap = new Map();
    news.forEach((article) => {
      if (article.ar_date) {
        const [year, month] = article.ar_date.split("-");
        const key = `${year}-${month}`;
        if (!monthsMap.has(key)) {
          const date = new Date(Number(year), Number(month) - 1);
          const formatter = new Intl.DateTimeFormat(i18n.language, { month: "long", year: "numeric" });
          let label = formatter.format(date);
          label = label.charAt(0).toUpperCase() + label.slice(1);
          monthsMap.set(key, label);
        }
      }
    });
    return Array.from(monthsMap.entries())
      .sort((a, b) => b[0].localeCompare(a[0]));
  }, [news, i18n.language]);

  const selectedMonthLabel = useMemo(() => {
    if (selectedMonth === "all") return t("news_page.by_month");
    const found = availableMonths.find(([key]) => key === selectedMonth);
    return found ? found[1] : t("news_page.by_month");
  }, [selectedMonth, availableMonths, t]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const handleCategoryFilter = (key) => {
    setActiveCategory(key);
    setCurrentPage(1);
  };

  const filteredNews = news.filter((article) => {
    const matchesSearch = article.title?.toLowerCase().includes(searchTerm);
    const matchesCategory = activeCategory === "all" || article.category === activeCategory;
    const matchesMonth = selectedMonth === "all" || (article.ar_date && article.ar_date.startsWith(selectedMonth));
    return matchesSearch && matchesCategory && matchesMonth;
  });

  const totalPages = Math.ceil(filteredNews.length / newsPerPage);
  const indexOfLast = currentPage * newsPerPage;
  const indexOfFirst = indexOfLast - newsPerPage;
  const currentNews = filteredNews.slice(indexOfFirst, indexOfLast);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setSubMessage("");
    setSubError("");
    try {
      await api.post("/api/v1/subscribe/", { email });
      setSubMessage(t("news_page.subscribe_success"));
      setEmail("");
    } catch (err) {
      setSubError(t("news_page.subscribe_error"));
    }
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;
    const pages = [];

    // Always show page 1
    pages.push(1);

    // Dots before current range
    if (currentPage > 3) {
      pages.push("dots-start");
    }

    // Pages around current
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }

    // Dots after current range
    if (currentPage < totalPages - 2) {
      pages.push("dots-end");
    }

    // Always show last page
    if (totalPages > 1 && !pages.includes(totalPages)) {
      pages.push(totalPages);
    }

    return (
      <div className="np-pagination">
        <button
          className="np-pagination__btn np-pagination__btn--arrow"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={18} />
        </button>
        {pages.map((page, idx) =>
          typeof page === "string" ? (
            <span key={page} className="np-pagination__dots">...</span>
          ) : (
            <button
              key={page}
              className={`np-pagination__btn ${currentPage === page ? "np-pagination__btn--active" : ""}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          )
        )}
        <button
          className="np-pagination__btn np-pagination__btn--arrow"
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    );
  };

  return (
    <>
      <Header />

      <div className="np-wrapper">
        <div className="np">
        <section className="np-hero">
          <h1 className="np-hero__title">{t("news_page.title")}</h1>
          <p className="np-hero__subtitle">{t("news_page.subtitle")}</p>
        </section>

        <section className="np-filters">
          <div className="np-filters__search">
            <img src={searchIcon} alt="" width={18} height={18} className="np-filters__search-icon" />
            <input
              type="text"
              placeholder={t("news_page.search_placeholder")}
              onChange={handleSearch}
              value={searchTerm}
              className="np-filters__search-input"
            />
          </div>

          <div className="np-filters__categories">
            {categoryFilters.map((cat) => (
              <button
                key={cat.key}
                className={`np-filters__cat-btn ${activeCategory === cat.key ? "np-filters__cat-btn--active" : ""}`}
                onClick={() => handleCategoryFilter(cat.key)}
                style={
                  activeCategory === cat.key && cat.color
                    ? { backgroundColor: cat.color, color: cat.textColor, borderColor: cat.textColor }
                    : cat.color && activeCategory !== cat.key
                    ? { borderColor: "transparent", backgroundColor: `${cat.color}` }
                    : {}
                }
              >
                {cat.key === "all" && <img src={filterIcon} alt="" width={11} height={7} />}
                {t(cat.labelKey)}
              </button>
            ))}
          </div>

          <div className="np-filters__date-wrapper" ref={monthRef}>
            <button
              className={`np-filters__date-btn ${selectedMonth !== "all" ? "np-filters__date-btn--active" : ""}`}
              onClick={() => setMonthDropdownOpen((prev) => !prev)}
            >
              <Calendar size={14} />
              {selectedMonthLabel}
            </button>
            {monthDropdownOpen && (
              <div className="np-filters__date-dropdown">
                <div
                  className={`np-filters__date-option ${selectedMonth === "all" ? "np-filters__date-option--active" : ""}`}
                  onClick={() => { setSelectedMonth("all"); setMonthDropdownOpen(false); setCurrentPage(1); }}
                >
                  {t("news_page.all_time")}
                </div>
                {availableMonths.map(([key, label]) => (
                  <div
                    key={key}
                    className={`np-filters__date-option ${selectedMonth === key ? "np-filters__date-option--active" : ""}`}
                    onClick={() => { setSelectedMonth(key); setMonthDropdownOpen(false); setCurrentPage(1); }}
                  >
                    {label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* News Grid */}
        <section className="np-grid">
          {currentNews.length > 0 ? (
            currentNews.map((article) => (
              <Article article={article} key={`art-${article.id}`} />
            ))
          ) : (
            <p className="np-grid__empty">{t("news_page.nothing_found")}</p>
          )}
        </section>

        {/* Pagination */}
        {renderPagination()}

        {/* Newsletter Subscription */}
        <section className="np-newsletter">
          <div className="np-newsletter__inner">
            <img src={overlayBlur} alt="" aria-hidden="true" className="np-newsletter__overlay" />
            <div className="np-newsletter__text">
              <h2>{t("news_page.newsletter_title")}</h2>
              <p>{t("news_page.newsletter_description")}</p>
            </div>
            <div className="np-newsletter__form-wrapper">
              <form className="np-newsletter__form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="np-newsletter__input"
                />
                <button type="submit" className="np-newsletter__btn">
                  {t("news_page.subscribe_btn")}
                </button>
              </form>
              <p className="np-newsletter__privacy">
                {t("news_page.privacy_note")}
              </p>
              {subMessage && <p className="np-newsletter__success">{subMessage}</p>}
              {subError && <p className="np-newsletter__error">{subError}</p>}
            </div>
            <img src={emailIcon} alt="" aria-hidden="true" className="np-newsletter__email-art" />
          </div>
        </section>
      </div>
      </div>

      <Footer />
    </>
  );
}
