import mongoose from "mongoose";

export interface IEarnItem {
  id: string;
  name: string;
  description: string;
  value: number;
  image: string;
  dailyTask?: boolean;
  link?: string;
}

export const EarnItems: IEarnItem[] = [
  {
    id: "earnItem01",
    name: "earnItem01",
    description: "earnItem",
    value: 10,
    image: "/icons/youtubeLogo.png",
    link: "https://www.youtube.com"
  },
  {
    id: "earnItem02",
    name: "earnItem02",
    description: "earnItem",
    value: 20,
    image: "/icons/youtubeLogo.png",
    link: "https://www.youtube.com"
  },
  {
    id: "earnItem03",
    name: "earnItem03",
    description: "earnItem",
    value: 30,
    image: "/icons/youtubeLogo.png",
    link: "https://www.youtube.com"
  },
  {
    id: "earnItem04",
    name: "earnItem04",
    description: "earnItem",
    value: 40,
    image: "/icons/calendar.png",
    dailyTask: true,
  },
  {
    id: "earnItem05",
    name: "earnItem05",
    description: "earnItem",
    value: 50,
    image: "/icons/calendar.png",
    dailyTask: true,
  },
];
