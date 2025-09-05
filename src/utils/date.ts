export function formatDate(isoDate: string) {
  const date = new Date(isoDate);
  if (!date) return undefined;
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
}