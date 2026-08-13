// Разбивка текста на слова и буквы на этапе сборки —
// чтобы анимировать буквы без сдвигов макета и без JS-разбиения на клиенте.
export function splitWords(text: string): string[][] {
  return text
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => Array.from(word));
}
