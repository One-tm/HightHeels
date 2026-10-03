export type BrandId = "pleaser" | "hella" | "demonia";
export const filterNames = ["brand", "type", "height", "size", "color", "material", "fit", "toe"] as const;
export type FilterName = typeof filterNames[number];
export type FilterState = Record<FilterName, string>;
export const heightCategories: Record<string, string> = { "8": "Тройки", "9": "Четвёрки", "10": "Пятёрки" };
export function heightLabel(value: string, brand = "") {
  if (value === "help") return "Помогите выбрать";
  const cm = Math.round(Number(value) * 2.54);
  const category = brand !== "demonia" ? heightCategories[value] : undefined;
  return `${category ? `${category} — ` : ""}${value}″ / ≈${cm} см`;
}
export const options: Record<FilterName, Record<string, string>> = {
  brand: { pleaser: "Pleaser", hella: "Hella Heels", demonia: "Demonia" },
  type: { sandals: "Босоножки", "ankle-boots": "Ботильоны", boots: "Сапоги", "thigh-high": "Ботфорты", platforms: "Lifestyle-платформы" },
  height: { ...Object.fromEntries([4, 5, 6, 7, 8, 9, 10].map(value => [String(value), heightLabel(String(value))])), help: "Помогите выбрать" },
  size: { ...Object.fromEntries(Array.from({ length: 13 }, (_, i) => [String(i + 4), `US ${i + 4}`])), help: "Не знаю размер" },
  color: { black: "Чёрный", beige: "Бежевый", white: "Белый", red: "Красный / бордовый", pink: "Розовый", clear: "Прозрачный", other: "Другой — уточню в комментарии" },
  material: { patent: "Лак", matte: "Матовый", pvc: "Прозрачный PVC", glitter: "Глиттер / стразы", "faux-leather": "Искусственная кожа" },
  fit: { standard: "Стандартная", wide: "Wide Fit" },
  toe: { open: "Открытый", closed: "Закрытый" },
};
export const fieldTitles: Record<FilterName, string> = { brand: "Бренд", type: "Тип", height: "Высота каблука", size: "Размер", color: "Цвет", material: "Материал", fit: "Посадка", toe: "Нос" };
export const catalogBrands = [
  { id: "pleaser" as const, name: "Pleaser", description: "Танцевальные босоножки, ботильоны и ботфорты.", officialUrl: "https://pleasershoes.com/collections/pleaser", sizeGuideUrl: "https://pleasershoes.com/pages/size-chart" },
  { id: "hella" as const, name: "Hella Heels", description: "Танцевальная обувь 6–9 дюймов и коллекции Wide Fit.", officialUrl: "https://us.hellaheels.com/collections/all-heels", sizeGuideUrl: "https://us.hellaheels.com/pages/size-guide" },
  { id: "demonia" as const, name: "Demonia", description: "Альтернативные ботинки, сапоги и lifestyle-платформы.", officialUrl: "https://demoniacult.com/collections/all", sizeGuideUrl: "https://demoniacult.com/pages/size-chart" },
];
export function emptyState(): FilterState { return Object.fromEntries(filterNames.map(key => [key, ""])) as FilterState; }
export function restoreFilters(params: URLSearchParams): FilterState {
  const state = emptyState();
  for (const key of filterNames) { const value = params.get(key); if (value && Object.hasOwn(options[key], value)) state[key] = value; }
  return state;
}
export function valueLabel(key: FilterName, state: FilterState) { return key === "height" ? heightLabel(state.height, state.brand) : options[key][state[key]]; }

// Routes and Pleaser filter names checked against official catalogs, 2026-10-03.
// Size, fit and ambiguous material/color groups remain wishes for the manager.
export function catalogRoute(brand: BrandId, state: FilterState) {
  const applied: FilterName[] = [];
  const base = catalogBrands.find(item => item.id === brand)!.officialUrl;
  let url = new URL(base);
  if (brand === "pleaser") {
    if (/^(4|5|6|7|8|9|10)$/.test(state.height)) { url = new URL(`https://pleasershoes.com/collections/${state.height}-inch-collection`); applied.push("height"); }
    const styles: Record<string, string> = { sandals: "Sandals", "ankle-boots": "Boots - Ankle", boots: "Boots - Knee High", "thigh-high": "Boots - Thigh High" };
    if (styles[state.type]) { url.searchParams.set("filter.p.m.pleasershoes.style", styles[state.type]); applied.push("type"); }
    const colors: Record<string, string> = { black: "Black", beige: "Beige", white: "White", pink: "Pink", clear: "Clear" };
    if (colors[state.color]) { url.searchParams.set("filter.p.m.pleasershoes.color_filter", colors[state.color]); applied.push("color"); }
    const materials: Record<string, string> = { patent: "Patent", pvc: "Clear PVC", "faux-leather": "Faux Leather" };
    if (materials[state.material]) { url.searchParams.set("filter.p.m.pleasershoes.material", materials[state.material]); applied.push("material"); }
  } else if (brand === "hella") {
    const collections: Record<string, string> = { sandals: "stilettos", "thigh-high": "thigh-highs" };
    // Boots mixes ankle and higher boots; do not claim to apply an exact type.
    if (collections[state.type]) { url = new URL(`https://us.hellaheels.com/collections/${collections[state.type]}`); applied.push("type"); }
    else if (["boots", "ankle-boots"].includes(state.type)) url = new URL("https://us.hellaheels.com/collections/boots");
    if (/^[6-9]$/.test(state.height)) {
      if (applied.includes("type") || ["boots", "ankle-boots"].includes(state.type)) url.searchParams.set("filter.p.tag", `${state.height}inch`);
      else url = new URL(`https://us.hellaheels.com/collections/${state.height}-inch`);
      applied.push("height");
    }
  } else {
    const collections: Record<string, string> = { sandals: "sandals", "ankle-boots": "ankle-high-boots", boots: "knee-high-boots", "thigh-high": "over-the-knee-boots", platforms: "platforms" };
    if (collections[state.type]) { url = new URL(`https://demoniacult.com/collections/${collections[state.type]}`); applied.push("type"); }
  }
  const pending = filterNames.filter(key => key !== "brand" && state[key] && !applied.includes(key));
  return { url: url.toString(), applied, pending };
}
export type RequestDetails = { foot: string; city: string; model: string; comment: string };
export function buildRequest(state: FilterState, details: RequestDetails) {
  const lines = ["Здравствуйте! Хочу подобрать обувь:"];
  for (const key of filterNames) if (state[key]) lines.push(`• ${fieldTitles[key]}: ${valueLabel(key, state)}`);
  if (!state.size) lines.push("• Размер: нужна помощь с подбором");
  lines.push(`• Длина стопы в сантиметрах: ${details.foot.trim() || "пока не измерена"}`);
  lines.push(`• Город: ${details.city.trim() || "уточню"}`);
  if (details.model.trim()) lines.push(`• Модель или ссылка: ${details.model.trim()}`);
  if (details.comment.trim()) lines.push(`• Пожелания: ${details.comment.trim()}`);
  lines.push("Подскажите подходящие модели, итоговую стоимость и срок доставки.");
  return lines.join("\n");
}
