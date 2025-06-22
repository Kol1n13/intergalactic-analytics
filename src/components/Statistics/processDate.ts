export function ProcessDate(dateNumber: number): string {
  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];
  const date = new Date(1, 0);
  date.setDate(dateNumber + 1);
  return `${date.getDate()} ${months[date.getMonth()]}`;
}
