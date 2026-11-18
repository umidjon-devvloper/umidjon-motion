/** Production process timeline — "FROM IDEA TO MOTION". Edit here. */

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "DISCOVER",
    description:
      "Biznesingiz, mahsulotingiz va g‘oyangiz bilan tanishamiz.",
  },
  {
    number: "02",
    title: "CONCEPT",
    description:
      "Kreativ konsepsiya va vizual yo‘nalish ishlab chiqamiz.",
  },
  {
    number: "03",
    title: "CREATE",
    description:
      "Motion video tayyorlanadi va kerakli vizual effektlar qo‘shiladi.",
  },
  {
    number: "04",
    title: "DELIVER",
    description: "Tayyor video sizga topshiriladi.",
  },
];

/** Values shown in the "CREATIVITY MEETS TECHNOLOGY" section. */
export interface ValueItem {
  number: string;
  title: string;
  description: string;
}

export const values: ValueItem[] = [
  {
    number: "01",
    title: "Creative Thinking",
    description: "Har bir loyiha alohida g‘oya bilan boshlanadi.",
  },
  {
    number: "02",
    title: "Modern AI Technology",
    description:
      "Zamonaviy AI texnologiyalari va kreativ ishlab chiqarish jarayoni.",
  },
  {
    number: "03",
    title: "Unique Visuals",
    description: "Har bir biznes uchun o‘ziga xos vizual yondashuv.",
  },
  {
    number: "04",
    title: "Business Focus",
    description:
      "Videolar biznesingizning marketing maqsadlariga xizmat qiladi.",
  },
];
