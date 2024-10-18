import { IBoostItem } from "../models/BoostItems";

export function calculateCoins(
  earnPerTap: number,
  boostItems?: IBoostItem[],
  clicks: number = 1
): number {
  if (!boostItems || boostItems.length === 0) {
    return clicks * earnPerTap;
  }

  return boostItems.reduce(
    (acc, item) => acc + item.multiplier * (clicks * earnPerTap),
    0
  );
}

// check ob boost items noch aktiv sind wenn nicht dann aus dem array entfernen
export function checkBoostItems(
  boostItems: IBoostItem[] | undefined,
  dateAsString?: boolean
): IBoostItem[] | undefined {
  const now = new Date();
  if (dateAsString) {
    return boostItems?.filter(
      (item) => item.expires !== undefined && new Date(item.expires) > now
    );
  }
  return boostItems?.filter(
    (item) => item.expires !== undefined && item.expires > now
  );
}
