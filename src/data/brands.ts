import type { ImageMetadata } from "astro";
import pleaserImage from "../assets/pleaser.jpg";
import hellaImage from "../assets/hella.jpg";
import demoniaImage from "../assets/demonia.jpg";

export interface Brand {
  slug: string;
  name: string;
  index: string;
  officialUrl: string;
  sizeGuideUrl: string;
  summary: string;
  image: ImageMetadata;
  imageAlt: string;
  highlights: string[];
}

export const brands: Brand[] = [
  {
    slug: "pleaser",
    name: "Pleaser",
    index: "01",
    officialUrl: "https://pleasershoes.com/",
    sizeGuideUrl: "https://pleasershoes.com/pages/size-chart",
    summary:
      "Классические танцевальные платформы: от лаконичных босоножек до высоких ботфортов и моделей с декоративными эффектами.",
    image: pleaserImage,
    imageAlt: "Чёрные ботильоны Pleaser Adore-1016 на платформе и высоком каблуке",
    highlights: ["Босоножки", "Ботильоны", "Высокие сапоги"],
  },
  {
    slug: "hella-heels",
    name: "Hella Heels",
    index: "02",
    officialUrl: "https://us.hellaheels.com/",
    sizeGuideUrl: "https://us.hellaheels.com/pages/size-guide",
    summary:
      "Выразительные модели, созданные с фокусом на танцевальное движение: насыщенные цвета, необычные фактуры и варианты Wide Fit.",
    image: hellaImage,
    imageAlt: "Чёрные ботильоны Hella Heels Branded Boot, 8 дюймов",
    highlights: ["Wide Fit", "Ботильоны", "Яркие коллекции"],
  },
  {
    slug: "demonia",
    name: "Demonia",
    index: "03",
    officialUrl: "https://demoniacult.com/",
    sizeGuideUrl: "https://demoniacult.com/pages/size-chart",
    summary:
      "Альтернативная обувь с массивными платформами: ботинки, сапоги, creepers и модели для тех, кому близка тёмная эстетика.",
    image: demoniaImage,
    imageAlt: "Чёрные сапоги Demonia Swing-815 на платформе с восемью пряжками",
    highlights: ["Платформы", "Сапоги", "Alternative"],
  },
];
