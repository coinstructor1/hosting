import { combos, ICondition } from "../models/Combo";
import { IMongoUser } from "../models/User";

export function checkCombosForUser(
  user: IMongoUser,
  bulkOfClicks?: number
): IMongoUser {
  if (user.combosCompleted) {
    for (const combo of combos) {
      if (user.combosCompleted.includes(combo.id)) {
        continue;
      }
      if (checkComboConditions(combo.condition, user, bulkOfClicks)) {
        user.totalCoins += combo.reward;
        user.combosCompleted.push(combo.id);
      }
    }
  }
  return user;
}
function checkComboConditions(
  condition: ICondition,
  user: IMongoUser,
  bulkOfClicks?: number
): boolean {
  let isComboCompleted = true;

  if (condition.clicks && bulkOfClicks) {
    isComboCompleted = isComboCompleted && bulkOfClicks >= condition.clicks;
  }
  if (condition.isMinig) {
    isComboCompleted = isComboCompleted && user.isMining;
  }
  if (condition.level) {
    isComboCompleted = isComboCompleted && user.level >= condition.level;
  }
  if (user.miningItems) {
    if (condition.purchasedMiningItem) {
      isComboCompleted =
        isComboCompleted &&
        user.miningItems.some(
          (item) => item.id === condition.purchasedMiningItem
        );
    }
  }
  if (condition.purchasedBoost) {
    isComboCompleted = isComboCompleted && user.boostScore > 0;
  }
  console.log("isComboCompleted: ", isComboCompleted);
  return isComboCompleted;
}
