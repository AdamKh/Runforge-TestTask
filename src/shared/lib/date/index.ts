/**
 * Форматирует дату создания в читаемый английский формат.
 *
 * @param input - дата в формате ISO 8601 или объект Date
 * @returns дата вида "Nov 12, 2026, 9:15 AM"
 */
export function formatCreatedAt(input: string | Date): string {
  const date = input instanceof Date ? input : new Date(input);

  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date: ${String(input)}`);
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

/**
 * Форматирует продолжительность выполнения в зависимости от количества секунд.
 *
 * @param seconds - продолжительность в секундах
 * @returns строка вида "30 sec", "3 min 24 sec", "2 hr 15 min"
 */
export function formatDuration(seconds?: number): string {
  if (seconds === undefined) return "—";

  if (!Number.isFinite(seconds) || seconds < 0) {
    throw new Error(`Invalid duration: ${seconds}`);
  }

  const totalSeconds = Math.floor(seconds);

  if (totalSeconds < 60) {
    return `${totalSeconds} sec`;
  }

  const totalMinutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;

  if (totalMinutes < 60) {
    return remainingSeconds
      ? `${totalMinutes} min ${remainingSeconds} sec`
      : `${totalMinutes} min`;
  }

  const hours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;

  return remainingMinutes
    ? `${hours} hr ${remainingMinutes} min`
    : `${hours} hr`;
}
