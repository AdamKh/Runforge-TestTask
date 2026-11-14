# Runforge

Тестовое задание: страница со списком пробежек. Есть поиск по названию, фильтры и сортировка, состояния загрузки, ошибки и пустого результата.

## Демо

Развёрнутая версия: https://your-project.vercel.app

## Стек

- React 19 + TypeScript
- Vite
- Ant Design
- CSS Modules
- MSW (Mock Service Worker) для мок-API
- ESLint + Prettier

## Требования

- Node.js `^20.19.0` или `>=22.12.0`
- npm

## Установка и запуск

```bash
git clone https://github.com/AdamKh/Runforge-TestTask.git
cd Runforge-TestTask

npm install
npm run dev
```

После запуска откройте адрес, который выведет Vite в терминале (обычно http://localhost:5173).

Отдельный бэкенд не нужен: запросы к API перехватывает MSW прямо в браузере.

## Скрипты

| Команда           | Что делает                                         |
| ----------------- | -------------------------------------------------- |
| `npm run dev`     | Запуск dev-сервера с мок-API                       |
| `npm run build`   | Проверка типов и сборка в папку `dist` (без моков) |
| `npm run preview` | Просмотр собранной версии (данные не загрузятся)   |
| `npm run lint`    | Проверка кода ESLint                               |
