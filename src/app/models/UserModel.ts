import { IUser } from "@/app/models/User";
import { IBoostItem } from "./BoostItems";

export default class UserModel implements IUser {
  name: string;
  image: string;
  telegramId: string;
  earnPerTap: number;
  coinsToLevelUp: number;
  profitPerHour: number;
  totalCoins: number;
  level: number;
  boostScore: number;
  isMining: boolean;
  earnItems: string[];
  lastMiningTime?: Date | undefined;
  combosCompleted?: string[] | undefined;
  miningItems?: [{ id: string; level: number }] | undefined;
  boostItems?: IBoostItem[] | undefined;

  constructor(
    name: string,
    image: string,
    telegramId: string,
    earnPerTap: number,
    coinsToLevelUp: number,
    profitPerHour: number,
    totalCoins: number,
    level: number,
    boostScore: number,
    isMining: boolean,
    earnItems: string[],
    lastMiningTime?: Date | undefined,
    combosCompleted?: string[] | undefined,
    miningItems?: [{ id: string; level: number }] | undefined,
    boostItems?: IBoostItem[] | undefined
  ) {
    this.name = name;
    this.image = image;
    this.telegramId = telegramId;
    this.earnPerTap = earnPerTap;
    this.coinsToLevelUp = coinsToLevelUp;
    this.profitPerHour = profitPerHour;
    this.totalCoins = totalCoins;
    this.level = level;
    this.boostScore = boostScore;
    this.isMining = isMining;
    this.lastMiningTime = lastMiningTime;
    this.combosCompleted = combosCompleted;
    this.miningItems = miningItems;
    this.earnItems = earnItems;
    this.boostItems = boostItems;
  }
}
