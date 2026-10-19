const arabicDigits = new Intl.NumberFormat("ar-EG", { useGrouping: false });

export function arabic(value: number): string {
  return arabicDigits.format(value);
}

export function verseCount(count: number): string {
  if (count === 1) return "آية واحدة";
  if (count === 2) return "آيتان";
  if (count >= 3 && count <= 10) return `${arabic(count)} آيات`;
  return `${arabic(count)} آية`;
}

export function reference(from: number, to: number): string {
  return from === to ? `الآية ${arabic(from)}` : `الآيات ${arabic(from)}–${arabic(to)}`;
}
