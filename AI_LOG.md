# AI_LOG.md - описание работы с ИИ

## Каким инструментом и моделью пользовался

- Инструмент - Claude
- Модель - Sonnet 5.5

## Запросы

1. Разработай локальный mock-сервис, который возвращает Promise с набором запусков Run[].

<b>Контекст:</b>
type RunStatus = "queued" | "running" | "succeeded" | "failed";
type Run = { id: string; name: string; repository: string; branch: string; status: RunStatus; createdAt: string; durationSeconds?: number; logs: string[]; result?: string; };

2. Напиши хук для отслеживания клика не по элементу и вызова callback-а в таком случае

<b>Контекст:</b>
Без контекста

3. Напиши хук useDebounce для react приложения

<b>Контекст:</b>
Без контекста

## Ошибка или неудачное решение AI

На запрос №1 (mock сервисом) ИИ сделал обычную функцию с `setTimeout`, которая возвращала массив из памяти. Настоящего HTTP-запроса не было, поэтому во вкладке Network в DevTools ничего не появлялось. Из-за этого нельзя было проверить URL и ответ, а также удобно смоделировать ошибку и задержку.

Я попросил переделать на MSW. Теперь запрос идёт через `fetch`, его перехватывает Service Worker, и он виден в DevTools.
