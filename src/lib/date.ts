export function formatHour(date: Date) {
  return date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatFullDate(date: Date) {
  return date.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });
}

export function parseDateParam(date?: string) {
  if (!date) return new Date();

  const parsed = new Date(date);

  if (isNaN(parsed.getTime())) {
    return new Date();
  }

  return parsed;
}

export function formatDateParam(date: Date) {
  return date.toISOString().split("T")[0];
}

export function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}
