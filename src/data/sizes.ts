// Transcribed from photo_2025-01-21_14-20-12.jpg supplied by the site owner.
// null means the source image has no measurement for that size.
export const usSizes = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

export const pleaserSizeRows = [
  { line: "Adore", type: "Двойки", lengths: [22.6, 23.4, 24.4, 25.1, 25.9, 26.6, 27.4, 27.9, 28.6, 29.2] },
  { line: "Flamingo", type: "Тройки", lengths: [23.0, 23.8, 24.6, 25.4, 26.2, 27.0, 27.8, 28.5, 29.2, 29.9] },
  { line: "Xtreme", type: "Тройки", lengths: [22.5, 23.3, 24.1, 24.8, 25.8, 26.6, 27.2, 28.1, 28.8, 29.8] },
  { line: "Infinity", type: "Четвёрки, кроме босоножек", lengths: [23.1, 23.7, 24.4, 25.0, 25.8, 26.6, 27.4, 28.2, null, null] },
  { line: "Infinity", type: "Четвёрки, босоножки", lengths: [23.3, 24.0, 24.7, 25.3, 26.1, 26.9, 27.7, 28.5, null, null] },
  { line: "Beyond", type: "Пятёрки", lengths: [23.3, 24.0, 24.7, 25.3, 26.1, 26.9, 27.7, 28.5, null, null] },
];

export const heelcatsSizeRows = [
  { line: "Хилкаты", type: "Без каблука", lengths: [null, 23.75, 24.45, 25.15, 25.85, 26.55, 27.25, 27.95, 28.65, 29.35] },
];

export const sizeTips = [
  { title: "Закрытый носок", text: "Для моделей из лака и матовой кожи округляй размер в большую сторону, из замши — в меньшую: замша заметно растягивается." },
  { title: "Ширина стопы", text: "Если стопа широкая, округляй размер в большую сторону; если узкая — в меньшую." },
  { title: "Босоножки", text: "Округляй размер в меньшую сторону. Когда стопа натянута, а пальцы собраны, её длина уменьшается. Учитывай это особенно, если уже есть опыт в танцах." },
  { title: "Материал для узкой стопы", text: "Для босоножек выбирай силикон, для закрытой обуви — лак." },
  { title: "Материал для широкой стопы", text: "Отдай предпочтение лаковым или матовым босоножкам и замшевой закрытой обуви." },
];

export function formatLength(value: number) {
  return value.toLocaleString("ru-RU", { minimumFractionDigits: 1, maximumFractionDigits: 2 });
}
