import { BadRequestError, NotFoundError } from "../lib/errors/apiErrors";
import { MiningItems } from "../models/MiningItems";
import { IMongoUser } from "../models/User";

export const checkMiningForUser = (user: IMongoUser, miningItemId: string) => {
  if (user.miningItems) {
    //find item by id in global collection
    const item = MiningItems.find((item) => item.id === miningItemId);
    if (!item) {
      throw new NotFoundError(
        `Mining-Item mit der ID ${miningItemId} nicht gefunden.`
      );
    }

    // check if user has enough coins
    if (user.totalCoins < item.cost) {
      throw new BadRequestError("not enough coins to spend.");
    }

    // increase mining item level or add new item by first activation
    const userItem = user.miningItems.find((item) => item.id === miningItemId);
    if (!userItem) {
      user.miningItems.push({
        id: item.id,
        level: 1,
      });
      user.isMining = true;
      user.lastMiningTime = new Date();
      user.totalCoins -= item.cost;
      user.profitPerHour += item.profitPerHour;
    } else {
      user.totalCoins -= item.cost;
      user.profitPerHour += item.profitPerHour;
      userItem.level++;
    }
  }

  return user;
};
