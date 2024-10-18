import { MiningItems } from "./MiningItems";

export interface ICombo {
  id: string;
  description: string;
  condition: ICondition;
  reward: number;
}

export interface ICondition {
  clicks?: number;
  isMinig?: boolean;
  level?: number;
  purchasedBoost?: boolean;
  purchasedMiningItem?: string;
}

export const combos: ICombo[] = [
  {
    id: "combo01",
    description: "Click 100 times & do mining",
    condition: { clicks: 5, isMinig: true },
    reward: 100,
  },
  {
    id: "combo02",
    description: "Reach level 2 & purchased Mining Item 4",
    condition: { level: 2, purchasedMiningItem: MiningItems[3].id },
    reward: 200,
  },
];
