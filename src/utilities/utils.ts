import { stepToNextLevel } from "@/app/constants";
import { IBoostItem } from "@/app/models/BoostItems";
import { IMongoUser } from "@/app/models/User";
export function calcPercentageProgress(from: number, to: number): number {
  return (from / to) * 100;
}

export function levelToStatus(level: number): string {
  switch (true) {
    case level < 1:
      return "Beginner";
    case level < 3:
      return "Intermediate";
    case level < 6:
      return "Epic";
    case level < 8:
      return "Expert";
    default:
      return "Master";
  }
}

export function calcCoinsToLevelUp(level: number): number {
  return level * stepToNextLevel;
}

export function checkLevelUp(user: IMongoUser, maxLevel: number): IMongoUser {
  if (user.totalCoins >= user.coinsToLevelUp && user.level < maxLevel) {
    let newLevel = Math.floor(user.totalCoins / stepToNextLevel);

    newLevel = newLevel > maxLevel ? maxLevel : newLevel;

    user.level = newLevel;
    user.coinsToLevelUp = calcCoinsToLevelUp(user.level + 1);
  }
  return user;
}

