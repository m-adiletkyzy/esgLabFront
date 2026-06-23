# 🚀 ESG Project

Веб-приложение для управления ESG-контентом (новости, проекты, события) с системой аутентификации и админ-панелью.

---

## 🧰 Технологический стек

### Backend
- Django
- Django REST Framework
- PostgreSQL
- Redis
- Celery

### Frontend
- React
- SCSS
- Axios

### Инфраструктура
- Docker
- Docker Compose

---

## ⚙️ Запуск проекта

### 1. Клонирование репозитория

```bash
git clone https://github.com/KBTU-official/esgLabFront.git
cd ESGFront
```

### 2. Скачивание модулей и запуск проекта

```bash
npm install
npm start
```

## 🌐 Доступ

| Сервис      | URL                                                        |
| ----------- | ---------------------------------------------------------- |
| Frontend    | [http://localhost:3000](http://localhost:3000)             |
| Backend API | [http://localhost:8000](http://localhost:8000)             |
| Admin panel | [http://localhost:8000/admin](http://localhost:8000/admin) |

## 🔌 Порты

| Сервис     | Порт |
| ---------- | ---- |
| Backend    | 8000 |
| Frontend   | 3000 |
| PostgreSQL | 5432 |
| Redis      | 6379 |

## 🔄 Зависимости

| Сервис     | Назначение     |
| ---------- | -------------- |
| PostgreSQL | основная БД    |
| Redis      | кэш + Celery   |
| Celery     | фоновые задачи |

## 🗄 База данных

- Используется PostgreSQL
- Каждая команда обязана использовать уникальную БД
- Миграции выполняются автоматически при запуске

## 🐳 Docker

Проект полностью изолирован через Docker:

```bash
docker-compose up
```

- Нет конфликтов с другими проектами
- Отдельные контейнеры
- Собственные порты

## 📊 Ресурсы

| Ресурс | Оценка       |
| ------ | ------------ |
| RAM    | ~512MB - 1GB |
| CPU    | 1-2 cores    |
| Disk   | ~500MB       |

## 📈 Нагрузка

| Метрика      | Значение         |
| ------------ | ---------------- |
| RPS          | ~50-100          |
| Пользователи | ~1000 concurrent |

## 📝 Логи

```bash
docker-compose logs -f
```

## 🔁 Деплой и перезапуск

Перезапуск:
```bash
docker-compose down
docker-compose up -d --build
```

Обновление:
```bash
git pull
docker-compose up -d --build
```
