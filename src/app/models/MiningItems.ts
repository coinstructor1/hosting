import mongoose from "mongoose";

 export interface IMiningItem {
  id: string;
  level: number;
  title: string;
  cost: number;
  image: string;
  profitPerHour: number;
}

export const miningItemSchema = new mongoose.Schema({
        id: { type: String, required: true },
        level: { type: Number, required: true },
      }, { _id: true });

 export const MiningItems: IMiningItem[] = [
  {
    id: "1",
    level: 1,
    title: "Mining Item 1",
    cost: 100,
    image: "/icons/MemeCoins.png",
    profitPerHour: 10,
  },
  {
    id: "2",
    level: 1,
    title: "Mining Item 2",
    cost: 200,
    image: "/icons/MemeCoins.png",
    profitPerHour: 20,
  },
  {
    id: "3",
    level: 1,
    title: "Mining Item 3",
    cost: 300,
    image: "/icons/MemeCoins.png",
    profitPerHour: 30,
  },
  {
    id: "4",
    level: 1,
    title: "Mining Item 4",
    cost: 400,
    image: "/icons/MemeCoins.png",
    profitPerHour: 40,
  },
];



