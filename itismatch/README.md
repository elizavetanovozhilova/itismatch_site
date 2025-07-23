# ItIs Match

Платформа для поиска друзей, партнёров по интересам, отношений или тиммейтов.



## Технологии

* **Frontend**: React + Vite
* **Backend / API**: [n8n](https://n8n.io/) (Webhook + Supabase actions)
* **База данных**: Supabase (PostgreSQL)
* **Хранилище фото**: Supabase Storage
* **Хэширование пароля**: `crypto-js` (SHA256)

## Установка

1. Клонируй проект:

```bash
git clone https://github.com/elizavetanovozhilova/itismatch_site.git
cd itismatch
```

2. Установи зависимости:

```bash
npm install
```

3. Запусти фронтенд:

```bash
npm run dev
```

4. Перейди в браузере на адрес:

```
http://localhost:5173/
```

> Убедись, что Webhook-и в n8n и Supabase настроены и запущены.

##  Страницы

| URL         | Описание                       |
| ----------- | ------------------------------ |
| `/`         | Главная страница               |
| `/register` | Регистрация                    |
| `/login`    | Вход                           |
| `/profile`  | Личный кабинет                 |
| `/explore`  | Поиск подходящих пользователей |
