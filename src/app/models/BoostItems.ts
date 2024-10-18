import mongoose from "mongoose";

export interface IBoostItem {
  id: string;
  title: string;
  description: string;
  cost: number;
  expires?: Date;
  duration: number;
  image: string;
  multiplier: number;
}
export const boostItemSchema = new mongoose.Schema(
  {
    id: String,
    title: String,
    description: String,
    cost: Number,
    expires: Date,
    image: String,
    multiplier: Number,
  },
  { _id: true }
);
export const BoostItems: IBoostItem[] = [
  {
    id: "boostItem01",
    title: "2x Click",
    description: "Double clicking power for one hour",
    cost: 10,
    image: "/icons/coin.png",
    multiplier: 2,
    duration: 3600,
  },
  {
    id: "boostItem02",
    title: "3x Click",
    description: "Triple clicking power for one hour",
    cost: 20,
    image: "/icons/coin.png",
    multiplier: 3,
    duration: 3600,
  },
  {
    id: "boostItem03",
    title: "4x Click",
    description: "Quadruple clicking power for one hour",
    cost: 30,
    image: "/icons/coin.png",
    multiplier: 4,
    duration: 3600,
  },
  {
    id: "boostItem04",
    title: "5x Click",
    description: "Five times clicking power for one hour",
    cost: 40,
    image: "/icons/coin.png",
    multiplier: 5,
    duration: 3600,
  },
  {
    id: "boostItem05",
    title: "6x Click",
    description: "Six times clicking power for one hour",
    cost: 50,
    image: "/icons/coin.png",
    multiplier: 6,
    duration: 3600,
  },
  {
    id: "boostItem06",
    title: "7x Click",
    description: "Seven times clicking power for one hour",
    cost: 60,
    image: "/icons/coin.png",
    multiplier: 7,
    duration: 3600,
  },
  {
    id: "boostItem07",
    title: "8x Click",
    description: "Eight times clicking power for one hour",
    cost: 70,
    image: "/icons/coin.png",
    multiplier: 8,
    duration: 3600,
  },
  {
    id: "boostItem08",
    title: "9x Click",
    description: "Nine times clicking power for one hour",
    cost: 80,
    image: "/icons/coin.png",
    multiplier: 9,
    duration: 3600,
  },
  {
    id: "boostItem09",
    title: "10x Click",
    description: "Ten times clicking power for one hour",
    cost: 90,
    image: "/icons/coin.png",
    multiplier: 10,
    duration: 3600,
  },
  {
    id: "boostItem10",
    title: "11x Click",
    description: "Eleven times clicking power for one hour",
    cost: 100,
    image: "/icons/coin.png",
    multiplier: 11,
    duration: 3600,
  }
];
