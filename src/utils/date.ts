export function formatDate(isoDate: string) {
  let date = new Date(isoDate);
  if (!date) return undefined;
  date = new Date(date.getTime() + date.getTimezoneOffset() * 60000); // trata como UTC
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
}