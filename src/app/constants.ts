import { IUser } from "./models/User";

export const images = {
  coinIconstring: "/icons/coin.png",
  tabButton: "/lama.png",
  flash: "/icons/flash.png",
};
export const maxLevel = 10;
export const maxBoostScore = 6500;

export const clickspendingTime = 1000;

export const defaultTelegramId = "asdf";
export const stepToNextLevel = 1000;

export const newUserEnviroment: IUser = {
  name: "Jack Conev",
  image: "/hamster.svg",
  telegramId: defaultTelegramId,
  level: 0,
  boostScore: 0,
  coinsToLevelUp: stepToNextLevel,
  earnPerTap: 1,
  profitPerHour: 1,
  totalCoins: 0,
  isMining: false,
  lastMiningTime: undefined,
  earnItems: [],
};

export const miningDistributionInterval = 1000*60*60; // 1 minute in milliseconds later *60 to distribute hourly
export const backendSyncInterval = 1000*60*60;
